// replaceRequestDynamicParameter.ts
import { CommonDTO, ContextData, ReplaceRequestResult } from './types';
import { findKeysWithObjPattern, findKeysWithArrPattern } from './patternFinders';

// Assuming these utilities are imported from elsewhere:
// import {
//   getNestedProperty,
//   replacePlaceholders,
//   updateKeysFromArray,
//   removeUndefinedProperties,
//   jsonToFormData,
//   replaceFilePaths,
//   contextOps,
//   replaceContextDynamicParameter,
//   logger,
//   MobifinTapestryError,
//   CommonConstant,
//   ErrorConstant,
//   appConfig,
//   MODULE,
// } from './utils'; // Adjust the import path as needed

export async function replaceRequestDynamicParameter(
  commonDTO: CommonDTO,
  request: Record<string, any>,
  apiEndPoint: string,
  requestType = 1,
  contextData: ContextData | null = null
): Promise<ReplaceRequestResult> {

  try {
    if (request.dynamicRequest === 'true' && commonDTO.DynamicRequest) {
      request = { ...request, ...commonDTO.DynamicRequest };
      delete request.dynamicRequest;
    }

    const objValKeys = await findKeysWithObjPattern(request);
    const arrValKeys = await findKeysWithArrPattern(request);
    const str = JSON.stringify(request);



    const finalRequestApiEndPoint = await replaceAndConvertRequestParameters(
      commonDTO.requestId,
      commonDTO,
      apiEndPoint,
      str,
      objValKeys,
      requestType,
      contextData,
      arrValKeys
    );

    logger.debug(`Converted request. Request : ${JSON.stringify(finalRequestApiEndPoint.request)}`, {
      module: MODULE,
      reqId: commonDTO.requestId,
    });

    return finalRequestApiEndPoint;
  } catch (error: any) {
    logger.error(
      `Problem occurred in replaceRequestDynamicParameter. request: ${JSON.stringify(request)}, Message: ${error.message}`,
      { module: MODULE, reqId: commonDTO.requestId }
    );
    throw new MobifinTapestryError(MODULE, error, error?.httpStatusCode, ErrorConstant.TECHNICAL_ERROR);
  }
}


async function replaceAndConvertRequestParameters(
  requestId: string,
  sourceObj: any,
  apiEndPoint: string,
  str: string,
  objValKeys: string[],
  requestType: number,
  contextData: ContextData | null,
  arrValKeys: string[]
): Promise<ReplaceRequestResult> {
  const values = sourceObj;

  const regex = /#\{([\w.]+)\}|#\{~cnf\(([\w.]+)\)\}|\[#\{([\w.]+)\}\]|#\{~obj\(([\w.]+)\)\}|#\{~url\(([\w.]+)\)\}|#\{~file\(([\w.]+)\)\}|#\{~arr\(([\w.]+)\)\}|#\{~repUrl\(([\w.]+)\)\}/g;

  const matches = [...str.matchAll(regex)];

  const replacements = await Promise.all(
    matches.map(async (match) => {
      const [fullMatch, p1, p2, p3, p4, p5, p6, p7, p8] = match;

      if (p1 !== undefined) {
        let context: string | undefined;
        let others: string[] = [];
        if (p1.includes('.')) [context, ...others] = p1.split('.');

        if (
          context &&
          (context === CommonConstant.CONTEXT_TYPES.BLOCK ||
            context === CommonConstant.CONTEXT_TYPES.TAPESTRYREQUEST ||
            context === CommonConstant.CONTEXT_TYPES.RESPONSE)
        ) {
          const data = contextData?.data ?? null;
          const contextId = contextData?.contextId ?? null;
          let contextValue = await contextOps.parseContext(data, p1, contextId, requestId);

          if (
            contextValue !== undefined &&
            contextValue !== null &&
            (contextValue.includes(CommonConstant.CONTEXT_TYPES.BLOCK) ||
              contextValue.includes(CommonConstant.CONTEXT_TYPES.TAPESTRYREQUEST) ||
              contextValue.includes(CommonConstant.CONTEXT_TYPES.RESPONSE))
          ) {
            contextValue = await replaceContextDynamicParameter(contextValue, requestId, data);
          }
          return contextValue !== undefined ? contextValue : fullMatch;
        } else {
          const value = getNestedProperty(values, p1);
          return value !== undefined ? value : fullMatch;
        }
      }

      if (p2 !== undefined) {
        const value = getNestedProperty(appConfig, p2);
        return value !== undefined ? value : fullMatch;
      }

      if (p3 !== undefined) {
        const value = getNestedProperty(values, p3);
        return value;
      }

      if (p4 !== undefined) {
        return p4;
      }

      if (p5 !== undefined) {
        const value = getNestedProperty(values, p5);
        if (value) {
          apiEndPoint = `${apiEndPoint}/${value}`;
        }
        return '';
      }

      if (p6 !== undefined) {
        const value = getNestedProperty(values, p6);
        return value !== undefined ? 'file_path_' + value.replace(/\\/g, '\\\\') : 'file_path_' + fullMatch;
      }

      if (p7 !== undefined) {
        return p7;
      }

      if (p8 !== undefined) {
        const value = getNestedProperty(values, p8);

        if (value) {
          const valueKey = { [p8]: value };
          apiEndPoint = replacePlaceholders(apiEndPoint, valueKey);
        }
        return '';
      }

      return fullMatch;
    })
  );

  let replacedStr = str;
  matches.forEach((match, index) => {
    replacedStr = replacedStr.replace(match[0], replacements[index]);
  });

  let request = JSON.parse(replacedStr);

  if (objValKeys.length > 0) {
    request = await updateKeysFromArray(objValKeys, values, request);
  }
  if (arrValKeys.length > 0) {
    request = await updateKeysFromArray(arrValKeys, values, request);
  }

  request = await removeUndefinedProperties(request);

  if (requestType === CommonConstant.EXTERNAL_API_REQUESTTYPE.FORM) {
    request = await jsonToFormData(request);
  } else {
    request = await replaceFilePaths(request);
  }

  return { request, apiEndPoint };
}
