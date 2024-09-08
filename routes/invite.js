import express from "express";
import { acceptInvite, getAllInvites } from "../controllers/invite.js";
import { validateRequestBody } from "zod-express-middleware";
import { inviteAcceptSchema } from "../schemas/inviteSchemas.js";
const router = express.Router();
router.get('/', getAllInvites);
router.post('/accept', validateRequestBody(inviteAcceptSchema), acceptInvite);
export default router;
