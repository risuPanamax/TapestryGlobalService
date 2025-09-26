import { BaseModels } from "../../common/models/baseModels";

class ConversationDetail extends BaseModels.BaseModelStatusVisibilityValidToFrom {
    declare ConversationId: string;
    declare Message: string;
}

export { ConversationDetail };