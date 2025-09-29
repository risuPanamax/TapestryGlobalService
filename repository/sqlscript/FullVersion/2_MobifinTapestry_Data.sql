INSERT INTO TBLMStandardMaster (Name, UID, Status, Visibility, ValidFromDate, ValidToDate) VALUES('Protocol', 'PROTOCOL', 0, 1, NOW(), '2035-12-31 23:59:59');
SET @protocolId = (SELECT MasterTypeId from TBLMStandardMaster where UID = 'PROTOCOL');
INSERT INTO TBLMStandardMasterDetail (Name, DisplayName, DisplayNameML, UID, Value, MasterTypeId, Status, Visibility, ValidFromDate, ValidToDate) VALUES('HTTP', 'HTTP', '{"en-US": "HTTP", "es-ES": "HTTP"}', 'HTTP_PROTOCOL', '1', @protocolId, 0, 1, NOW(), '2035-12-31 23:59:59'),
('HTTPS', 'HTTPS', '{"en-US": "HTTPS", "es-ES": "HTTPS"}', 'HTTPS_PROTOCOL', '2', @protocolId, 0, 1, NOW(), '2035-12-31 23:59:59');

INSERT INTO TBLMStandardMaster (Name, UID, Status, Visibility, ValidFromDate, ValidToDate) VALUES('Request Type', 'REQUEST_TYPE', 0, 1, NOW(), '2035-12-31 23:59:59');
SET @requestTypeId = (SELECT MasterTypeId from TBLMStandardMaster where UID = 'REQUEST_TYPE');
INSERT INTO TBLMStandardMasterDetail (Name, DisplayName, DisplayNameML, UID, Value, MasterTypeId, Status, Visibility, ValidFromDate, ValidToDate) VALUES('JSON', 'JSON', '{"en-US": "JSON", "es-ES": "JSON"}', 'JSON_REQUEST_TYPE', '1', @requestTypeId, 0, 1, NOW(), '2035-12-31 23:59:59'),
('XML', 'XML', '{"en-US": "XML", "es-ES": "XML"}', 'XML_REQUEST_TYPE', '2', @requestTypeId, 0, 1, NOW(), '2035-12-31 23:59:59'),
('FORM', 'FORM', '{"en-US": "FORM", "es-ES": "FORM"}', 'FORM_REQUEST_TYPE', '3', @requestTypeId, 0, 1, NOW(), '2035-12-31 23:59:59');

INSERT INTO TBLMStandardMaster (Name, UID, Status, Visibility, ValidFromDate, ValidToDate) VALUES('HTTP Request Type', 'HTTP_REQUEST_TYPE', 0, 1, NOW(), '2035-12-31 23:59:59');
SET @httpRequestTypeId = (SELECT MasterTypeId from TBLMStandardMaster where UID = 'HTTP_REQUEST_TYPE');
INSERT INTO TBLMStandardMasterDetail (Name, DisplayName, DisplayNameML, UID, Value, MasterTypeId, Status, Visibility, ValidFromDate, ValidToDate) VALUES('GET', 'GET', '{"en-US": "GET", "es-ES": "GET"}', 'GET_HTTP_REQUEST_TYPE', '1', @httpRequestTypeId, 0, 1, NOW(), '2035-12-31 23:59:59'),
('POST', 'POST', '{"en-US": "POST", "es-ES": "POST"}', 'POST_HTTP_REQUEST_TYPE', '2', @httpRequestTypeId, 0, 1, NOW(), '2035-12-31 23:59:59'),
('PUT', 'PUT', '{"en-US": "PUT", "es-ES": "PUT"}', 'PUT_HTTP_REQUEST_TYPE', '3', @httpRequestTypeId, 0, 1, NOW(), '2035-12-31 23:59:59'),
('DELETE', 'DELETE', '{"en-US": "DELETE", "es-ES": "DELETE"}', 'DELETE_HTTP_REQUEST_TYPE', '4', @httpRequestTypeId, 0, 1, NOW(), '2035-12-31 23:59:59');

INSERT INTO TBLMStandardMaster (Name, UID, Status, Visibility, ValidFromDate, ValidToDate) VALUES('API Provider', 'API_PROVIDER', 0, 1, NOW(), '2035-12-31 23:59:59');
SET @apiProviderId = (SELECT MasterTypeId from TBLMStandardMaster where UID = 'API_PROVIDER');
INSERT INTO TBLMStandardMasterDetail (Name, DisplayName, DisplayNameML, UID, Value, MasterTypeId, Status, Visibility, ValidFromDate, ValidToDate) VALUES('OpenTurf', 'OpenTurf', '{"en-US": "OpenTurf", "es-ES": "OpenTurf"}', 'OPENTURF_API_PROVIDER', '1', @apiProviderId, 0, 1, NOW(), '2035-12-31 23:59:59');


INSERT INTO TBLMExternalApiDetail (ApiEndPoint, Name, Description, ApiProvider, Protocol, CertFileName, RequestType, HTTPRequestType, Request, ValidFromDate, ValidToDate, Visibility, Status) VALUES
('/conversations', 'Create Conversation', 'Create a new conversation with AI', 'OpenTurf', 2, 'open-turf.pem', 1, 2, 0x7B7D, NOW(), '2035-12-31 23:59:59', 1, 0),
('/conversations/{{ConversationId}}/message', 'Send Message', 'Send initial message describing to creation of workflow', 'OpenTurf', 2, 'open-turf.pem', 1, 2, 0x7B0D0A226D65737361676522203A2022237B4D6573736167657D222C0D0A22436F6E766572736174696F6E496422203A2022237B7E72657055726C28436F6E766572736174696F6E4964297D220D0A7D, '2025-09-24 08:20:51', '2035-12-31 23:59:59', 1, 0),
('/conversations/{{ConversationId}}/bpmn?format=xml', 'Get BPMN (XML)', 'Get generated BPMN in XML format for download', 'OpenTurf', 2, 'open-turf.pem', 1, 1, 0x7B0D0A22436F6E766572736174696F6E496422203A2022237B7E72657055726C28436F6E766572736174696F6E4964297D220D0A7D, '2025-09-24 08:20:51', '2035-12-31 23:59:59', 1, 0);