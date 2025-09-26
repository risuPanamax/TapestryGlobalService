import { debugLogger, errorLogger } from "../loggers";
import { getApplicationConfig } from "../middlewares/loadConfiguration";
// import  CommonConstant  from "../constant/commonConstant";
// import * as fs from "fs/promises";
// import * as path from "path";
// import { FormData } from "formdata-node";
// import { fileFromPath } from "formdata-node/file-from-path";

const MODULE = "REQUEST_PARAM_CONVERTER_UTIL";
const appConfig = getApplicationConfig();

interface CommonDTO {
  requestId: string;
  [key: string]: any;
}

interface ContextData {
  data?: any;
  contextId?: string;
}

export async function replaceRequestDynamicParameter(
  commonDTO: CommonDTO,
  request: any,
  apiEndPoint: string,
  requestType = 1
): Promise<{ request: any; apiEndPoint: string }> {

  debugLogger("Replace Request Dynamic Parameter - Started", MODULE);
  try {
    if (Buffer.isBuffer(request)) {
      request = JSON.parse(request.toString());
    }

    const mergedRequest =
      request?.dynamicRequest === "true" && commonDTO?.DynamicRequest
        ? { ...request, ...commonDTO.DynamicRequest }
        : request;

    delete mergedRequest?.dynamicRequest;

    const rawStr = JSON.stringify(mergedRequest);

    debugLogger(`Processing dynamic request:Original request. Request : ${rawStr}`, MODULE);

    const { updatedStr, updatedEndpoint } = await processDynamicTokens(
      rawStr,
      commonDTO,
      apiEndPoint
    );

    const parsedRequest = await removeUndefinedProperties(JSON.parse(updatedStr));

    debugLogger(`Processing dynamic request:Converted request. Request : ${JSON.stringify(parsedRequest)}`, MODULE);

    // Future enhancement (commented out):
    // if (requestType === CommonConstant.EXTERNAL_API_REQUESTTYPE.FORM) {
    //   parsedRequest = await convertJsonToFormData(parsedRequest);
    // }

    return { request: parsedRequest, apiEndPoint: updatedEndpoint };

  } catch (error: any) {
    errorLogger(`Error in replaceRequestDynamicParameter: ${error.message}`, error, MODULE);
    throw error;
  }
}

// async function processDynamicTokens(
//   input: string,
//   commonDTO: CommonDTO,
//   apiEndPoint: string
// ): Promise<{ updatedStr: string; updatedEndpoint: string }> {
//   const tokenRegex = /#\{([\w.]+)\}|#\{~cnf\(([\w.]+)\)\}|\[#\{([\w.]+)\}\]|#\{~obj\(([\w.]+)\)\}|#\{~url\(([\w.]+)\)\}|#\{~file\(([\w.]+)\)\}|#\{~arr\(([\w.]+)\)\}|#\{~repUrl\(([\w.]+)\)\}/g;

//   const matches = [...input.matchAll(tokenRegex)];
//   let updatedEndpoint = apiEndPoint;

//   debugLogger(`Found ${matches.length} dynamic token(s)`, MODULE);

//   const replacements = await Promise.all(
//     matches.map(async (match) => {
//       const [
//         fullMatch,
//         tokenSimple,    // #{property}
//         tokenConfig,    // #{~cnf(property)}
//         tokenOptional,  // [#{property}]
//         tokenObject,    // #{~obj(property)}
//         tokenUrl,       // #{~url(property)}
//         tokenFile,      // #{~file(property)}
//         tokenArray,     // #{~arr(property)}
//         tokenReplaceUrl // #{~repUrl(property)}
//       ] = match;

//       try {
//         if (tokenSimple !== undefined) {
//           const value = getNestedProperty(commonDTO, tokenSimple);
//           return value !== undefined ? value : fullMatch;
//         }

//         if (tokenConfig !== undefined) {
//           const value = getNestedProperty(appConfig, tokenConfig);
//           return value !== undefined ? value : fullMatch;
//         }

//         if (tokenOptional !== undefined) {
//           return getNestedProperty(commonDTO, tokenOptional) ?? "";
//         }

//         if (tokenObject !== undefined) {
//           return tokenObject;
//         }

//         if (tokenUrl !== undefined) {
//           const value = getNestedProperty(commonDTO, tokenUrl);
//           if (value) {
//             updatedEndpoint = `${updatedEndpoint}/${value}`;
//           }
//           return "";
//         }

//         if (tokenFile !== undefined) {
//           const filePath = getNestedProperty(commonDTO, tokenFile);
//           return filePath
//             ? `file_path_${filePath.replace(/\\/g, "\\\\")}`
//             : `file_path_${fullMatch}`;
//         }

//         if (tokenArray !== undefined) {
//           return tokenArray;
//         }

//         if (tokenReplaceUrl !== undefined) {
//           const value = getNestedProperty(commonDTO, tokenReplaceUrl);
//           if (value) {
//             updatedEndpoint = replacePlaceholders(updatedEndpoint, { [tokenReplaceUrl]: value });
//           }
//           return "";
//         }

//         return fullMatch;
//       } catch (error: any) {
//         errorLogger(`Error processing token [${fullMatch}]: ${error.message}`, error, MODULE);
//         return fullMatch;
//       }
//     })
//   );

//   let updatedString = input;
//   matches.forEach((match, index) => {
//     updatedString = updatedString.replace(match[0], replacements[index]);
//   });

//   debugLogger("Dynamic token replacement complete", MODULE);
//   return { updatedStr: updatedString, updatedEndpoint };
// }
export async function processDynamicTokens(
  input: string,
  commonDTO: CommonDTO,
  apiEndPoint: string
): Promise<{ updatedStr: string; updatedEndpoint: string }> {
  try {
    const tokenRegex =
      /#\{([\w.]+)\}|#\{~cnf\(([\w.]+)\)\}|\[#\{([\w.]+)\}\]|#\{~obj\(([\w.]+)\)\}|#\{~url\(([\w.]+)\)\}|#\{~file\(([\w.]+)\)\}|#\{~arr\(([\w.]+)\)\}|#\{~repUrl\(([\w.]+)\)\}/g;

    const matches = [...input.matchAll(tokenRegex)];
    let updatedEndpoint = apiEndPoint;

    if (matches.length === 0) {
      debugLogger("No dynamic tokens found in input, returning original values", MODULE);
      return { updatedStr: input, updatedEndpoint: apiEndPoint };
    }

    debugLogger(`Found ${matches.length} dynamic token(s)`, MODULE);

    const replacements = await Promise.all(
      matches.map(async (match) => {
        const [
          fullMatch,
          tokenSimple, // #{property}
          tokenConfig, // #{~cnf(property)}
          tokenOptional, // [#{property}]
          tokenObject, // #{~obj(property)}
          tokenUrl, // #{~url(property)}
          tokenFile, // #{~file(property)}
          tokenArray, // #{~arr(property)}
          tokenReplaceUrl, // #{~repUrl(property)}
        ] = match;

        if (tokenSimple !== undefined) {
          const value = getNestedProperty(commonDTO, tokenSimple);
          return value !== undefined ? value : fullMatch;
        }

        if (tokenConfig !== undefined) {
          const value = getNestedProperty(appConfig, tokenConfig);
          return value !== undefined ? value : fullMatch;
        }

        if (tokenOptional !== undefined) {
          return getNestedProperty(commonDTO, tokenOptional) ?? "";
        }

        if (tokenObject !== undefined) {
          return tokenObject;
        }

        if (tokenUrl !== undefined) {
          const value = getNestedProperty(commonDTO, tokenUrl);
          if (value) {
            updatedEndpoint = `${updatedEndpoint}/${value}`;
          }
          return "";
        }

        if (tokenFile !== undefined) {
          const filePath = getNestedProperty(commonDTO, tokenFile);
          return filePath
            ? `file_path_${filePath.replace(/\\/g, "\\\\")}`
            : `file_path_${fullMatch}`;
        }

        if (tokenArray !== undefined) {
          return tokenArray;
        }

        if (tokenReplaceUrl !== undefined) {
          const value = getNestedProperty(commonDTO, tokenReplaceUrl);
          if (value) {
            updatedEndpoint = replacePlaceholders(updatedEndpoint, { [tokenReplaceUrl]: value });
          }
          return "";
        }

        return fullMatch;
      })
    );

    let updatedString = input;
    matches.forEach((match, index) => {
      updatedString = updatedString.replace(match[0], replacements[index]);
    });

    debugLogger("Dynamic token replacement complete", MODULE);
    return { updatedStr: updatedString, updatedEndpoint };
  } catch (error: any) {
    errorLogger(`Unexpected error in processDynamicTokens: ${error.message}`, error, MODULE);
    throw error;
  }
}

function getNestedProperty(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function replacePlaceholders(str: string, values: Record<string, any>): string {
  return str.replace(/{{(\w+)}}/g, (_, key) =>
    values[key] !== undefined ? values[key] : `{{${key}}}`
  );
}

async function removeUndefinedProperties(obj: any): Promise<any> {
  if (Array.isArray(obj)) {
    return Promise.all(obj.map(removeUndefinedProperties));
  } else if (typeof obj === "object" && obj !== null) {
    const cleaned: any = {};
    for (const key of Object.keys(obj)) {
      const value = await removeUndefinedProperties(obj[key]);
      if (value !== undefined) {
        cleaned[key] = value;
      }
    }
    return cleaned;
  }
  return obj;
}

// async function convertJsonToFormData(
//   jsonObject: any,
//   formData = new FormData(),
//   parentKey = ""
// ): Promise<FormData> {
//   for (const key of Object.keys(jsonObject)) {
//     const value = jsonObject[key];
//     const fullKey = parentKey ? `${parentKey}[${key}]` : key;

//     if (typeof value === "string" && value.startsWith("file_path_")) {
//       const filePath = value.slice(10);
//       const resolvedPath = path.resolve(filePath);
//       const fileName = path.basename(resolvedPath);
//       const fileBuffer = await fileFromPath(resolvedPath);
//       formData.set(fullKey, fileBuffer);
//     } else if (Array.isArray(value)) {
//       for (let i = 0; i < value.length; i++) {
//         await convertJsonToFormData(
//           { [i]: value[i] },
//           formData,
//           `${fullKey}`
//         );
//       }
//     } else if (typeof value === "object" && value !== null) {
//       await convertJsonToFormData(value, formData, fullKey);
//     } else {
//       formData.set(fullKey, value);
//     }
//   }
//   return formData;
// }
