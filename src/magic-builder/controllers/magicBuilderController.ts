const MODULE = "MAGIC_BUILDER_CONTROLLER";
import asyncErrorHandler from "express-async-handler";
console.log(1);
import { Request, Response } from "express";
console.log(2);
console.log(3);
import { debugLogger } from "../../common/loggers";
import TapestryGlobalError from "../../common/error/tapestryGlobalError";
import { ErrorConstants } from "../../common/constant/errorConstant";
import { magicBuilderService } from "../services/magicBuilderServices";

console.log(4);

console.log({ MODULE });

export const createConversations = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    // #swagger.tags = ['MagicBuilder']
    // #swagger.summary = 'Create Conversation'
    // #swagger.description = 'This endpoint is used to create a Conversation.'

    let { requestId, body, userAndOrgInfo } = req as any;

    userAndOrgInfo = userAndOrgInfoDummy

    debugLogger("Create Conversation Request", MODULE);

    // const conversionDto = [{ requestId, body  }];
    // const errorInstance = "Something went wrong in controller"

    // throw new TapestryGlobalError(MODULE, new Error(errorInstance), 400, ErrorConstants.TECHNICAL_ERROR, { userId: 123, action: "createUser" });

    const Data = await magicBuilderService.createConversations();

    res.status(200).json({
      status: 200,
      RequestId: requestId,
      message: "Success",
      Data,
    });
  }
);

export const sendMessage = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    // #swagger.tags = ['MagicBuilder']
    // #swagger.summary = 'Send Message'
    // #swagger.description = 'This endpoint is used to send a message.'
    let { requestId, body, userAndOrgInfo } = req as any;

    userAndOrgInfo = userAndOrgInfoDummy

    debugLogger("Send Message Request", MODULE);
    // const conversionDto = [{ requestId, body }];
    // const conversionDto = [{ requestId, body,  }];
    const sendMessageDto = {
      ConversationId: body.ConversationId,
      Message: body.Message
    }; 
    
    const Data = await magicBuilderService.sendMessage(sendMessageDto);

    res.status(200).json({
      status: 200,
      RequestId: requestId,
      message: "Success",
      Data: Data,
    });
  }
);

export const getBPMN = asyncErrorHandler(
  async (req: Request, res: Response): Promise<void> => {
    // #swagger.tags = ['MagicBuilder']
    // #swagger.summary = 'Get BPMN'
    // #swagger.description = 'This endpoint is used to get a BPMN.'
    let { requestId, query, userAndOrgInfo } = req as any;

    userAndOrgInfo = userAndOrgInfoDummy
    console.log("---------------");

    debugLogger("Get BPMN Request", MODULE);
    const conversionDto = [{ requestId, query }];

    const Data = await magicBuilderService.sendMessage(query);

    res.status(200).json({
      status: 200,
      RequestId: requestId,
      message: "Success",
      Data: [conversionDto],
    });
  }
);

const userAndOrgInfoDummy = {
  userId: 1001,
  emailAddress: "dummy.user@example.com",
  organizationId: 2001,
  organizationUID: "ORG-UID-XYZ",
  userStatus: 1, // e.g., 1 = ACTIVE, 0 = INACTIVE
  userType: 2,   // e.g., 1 = ADMIN, 2 = USER, etc.
};
