const createConversations = async (conversationDto: any) => {
    return [{ conversationId: "conv123", ...conversationDto }];
    //  const conversationData = await prepareAdminGetReq(
    //   commonDTO,
    //   MobifinAdminApiConstant.BULK_IMPORT_HISTORY
    // );
    // return conversationData;
}
const sendMessage = async () => { }
const getBPMN = async () => { }


export const magicBuilderRepositories = {
    createConversations,
    sendMessage,
    getBPMN
}