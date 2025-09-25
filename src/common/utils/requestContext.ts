import { AsyncLocalStorage } from "async_hooks";

interface RequestContext {
  requestId?: string;
}

export const requestContext = new AsyncLocalStorage<RequestContext>();

export const setRequestContext = (context: RequestContext) => {
  requestContext.enterWith(context);
};

export const getRequestContext = (): RequestContext => {
  return requestContext.getStore() || {};
};
