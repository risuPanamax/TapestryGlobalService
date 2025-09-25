import express from "express";
import { createConversations, getBPMN, sendMessage } from "../controllers/magicBuilderController";

const magicBuilderRoutes = express.Router();

magicBuilderRoutes.post("/conversations", createConversations);

magicBuilderRoutes.post("/send-message", sendMessage);
magicBuilderRoutes.get("/get-bpmn", getBPMN);

export { magicBuilderRoutes };
