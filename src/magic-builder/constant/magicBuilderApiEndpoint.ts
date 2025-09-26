const magicBuilderEndPoints = {
  CONVERSIONS: "/conversations",
  CONVERSIONS_SEND_MESSAGE: "/conversations/{{ConversionId}}/message",
  CONVERSIONS_GET_BPMN_XML: "/conversations/{{ConversionId}}/bpmn?format=xml",
};

export default magicBuilderEndPoints;