const createConversations = async (conversionDto: any) => {
    return [{ conversationId: "conv123", ...conversionDto }];
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