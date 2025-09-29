import { Request } from "express";
import { CommonRequest } from "../../common/global-interfaces-type/commonInterfaceAll";

type TypedRequest<B = any, Q = any> = Request & CommonRequest & {
  body: B;
  query: Q;
};

// Requests
export type StartConversationRequest = TypedRequest<{
  ApplicationId: number;
  CollectionId: number;
  WorkflowId: number;
}>;

export type StartSendMessageRequest = TypedRequest<{
  ApplicationId: number;
  CollectionId: number;
  WorkflowId: number;
}, {
  message: string;
  conversationId: string;
}>;

export type StartGetBPMNRequest = TypedRequest<{
  ApplicationId: number;
  CollectionId: number;
  WorkflowId: number;
}, {
  message: string;
  conversationId: string;
}>;

export type StartGetBPMNQuery = {
  ApplicationId: number;
  CollectionId: number;
  WorkflowId: number;
  message?: string;
  conversationId?: string;
};
