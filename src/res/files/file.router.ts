import { Router } from "express";
import { deleteFile, findOne, findOneFile, uploadOne } from "./file.controller";

const fileRouter = Router();

fileRouter.post("/upload", uploadOne);
fileRouter.get("/:id", findOne);
fileRouter.get("/:id/metadata", findOneFile);
fileRouter.delete("/:id", deleteFile);

export default fileRouter;
