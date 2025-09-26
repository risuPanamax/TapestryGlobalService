const magicBuilderEndPoints = {
  CONVERSATION: "/conversations",
  CONVERSATION_SEND_MESSAGE: "/conversations/{{ConversationId}}/message",
  CONVERSATION_GET_BPMN_XML: "/conversations/{{ConversationId}}/bpmn?format=xml",
};

export default magicBuilderEndPoints;