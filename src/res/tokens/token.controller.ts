import { Request, Response } from "express";
import Exception from "../../lib/Exception";
import tokenService from "./token.service";
import { Types } from "mongoose";
import Helper from "../../lib/helpers";
import logger from "../../lib/logger";

export async function generateUploadToken(req: Request, res: Response) {
  try {
    logger.info("Generating upload token");
    const token = await tokenService.generateToken("upload");

    Helper.APIResponse(res, 200, {
      message: "Token generated successfully",
      data: token,
    });
    return;
  } catch (error) {
    throw new Exception({
      message:
        error instanceof Error
          ? error.message
          : "Failed to generate upload token",
      code: 400,
    });
  }
}

export async function generateDeleteToken(req: Request, res: Response) {
  try {
    const { fileId } = req.params;

    if (!Types.ObjectId.isValid(fileId)) {
      throw new Exception({
        message: "Invalid file id",
        code: 400,
      });
    }

    if (!fileId) {
      throw new Exception({
        message: "File ID is required",
        code: 400,
      });
    }

    const token = await tokenService.generateToken("delete", fileId);

    Helper.APIResponse(res, 200, {
      message: "Token generated successfully",
      data: token,
    });
    return;
  } catch (error) {
    throw new Exception({
      message:
        error instanceof Error
          ? error.message
          : "Failed to generate delete token",
      code: 400,
    });
  }
}
