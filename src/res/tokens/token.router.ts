import { Router } from "express";
import { generateUploadToken, generateDeleteToken } from "./token.controller";

const tokenRouter = Router();

tokenRouter.post("/upload", generateUploadToken);
tokenRouter.post("/delete/:fileId", generateDeleteToken);

export default tokenRouter;
