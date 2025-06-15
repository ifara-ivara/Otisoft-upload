import { Request, Response } from "express";
import Exception from "../../lib/Exception";
import Helper from "../../lib/helpers";
import fileService from "./file.service";
import { Types } from "mongoose";
import path from "path";
import fs from "fs";
import FileModel from "./file.model";
import config from "../../lib/config";
import tokenService from "../tokens/token.service";

export async function uploadOne(req: Request, res: Response) {
  try {
    const file = req.files?.file;
    const token = req.headers["x-token"] as string;

    if (!token) {
      throw new Exception({
        message: "Token is required",
        code: 401,
      });
    }

    const isValidToken = await tokenService.validateToken(token, "upload");
    if (!isValidToken) {
      throw new Exception({
        message: "Invalid or expired token",
        code: 401,
      });
    }

    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }

    if (file && !Array.isArray(file)) {
      const id = new Types.ObjectId();
      const uploadPath = `./uploads/${id.toString()}${path.extname(file.name)}`;
      await file.mv(uploadPath);

      const fileDoc = await FileModel.create({
        _id: id,
        filename: file.name,
        size: file.size,
        mimeType: file.mimetype,
        url: `${config.BASE_URL}/f/${id}`,
      }).catch((err) => {
        fs.unlinkSync(uploadPath);
        throw new Exception({
          message: err.message,
          code: 400,
        });
      });

      if (!fileDoc) {
        fs.unlinkSync(uploadPath);
        throw new Exception({
          message: "Failed to upload file",
          code: 400,
        });
      }

      Helper.APIResponse(res, 201, {
        message: "File uploaded successfully",
        data: fileDoc.toJSON(),
      });
      return;
    }

    return res.status(400).json({
      message: "File is required",
    });
  } catch (error) {
    if (error instanceof Exception) {
      throw error;
    }
    throw new Exception({
      message: error instanceof Error ? error.message : "Failed to upload file",
      code: 400,
    });
  }
}

export async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // Get file info from database to determine mime type
    const fileDoc = await FileModel.findById(id);
    if (!fileDoc) {
      throw new Exception({
        message: "File not found",
        code: 404,
      });
    }

    // check if file exists
    if (!fs.existsSync(`./uploads/${id}${path.extname(fileDoc.filename)}`)) {
      throw new Exception({
        message: "File not found",
        code: 404,
      });
    }

    const fileStream = fs.createReadStream(
      `./uploads/${id}${path.extname(fileDoc.filename)}`,
    );

    // Set appropriate headers
    res.setHeader("Content-Type", fileDoc.mimeType);
    res.setHeader("Content-Disposition", "inline");

    fileStream.on("error", (err) => {
      throw new Exception({
        message: err.message,
        code: 400,
      });
    });

    fileStream.pipe(res);
  } catch (error) {
    if (error instanceof Exception) {
      throw error;
    }
    throw new Exception({
      message: error instanceof Error ? error.message : "Failed to find file",
      code: 400,
    });
  }
}

export async function deleteFile(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const token = req.headers["x-token"] as string;

    if (!token) {
      throw new Exception({
        message: "Token is required",
        code: 401,
      });
    }

    const isValidToken = await tokenService.validateToken(token, "delete", id);
    if (!isValidToken) {
      throw new Exception({
        message: "Invalid or expired token",
        code: 401,
      });
    }

    const fileDoc = await fileService.findOne({ _id: id });

    if (!fileDoc) {
      throw new Exception({
        message: "File not found",
        code: 404,
      });
    }

    // check if file exists
    if (!fs.existsSync(`./uploads/${id}${path.extname(fileDoc.filename)}`)) {
      throw new Exception({
        message: "File not found",
        code: 404,
      });
    }

    fs.unlinkSync(`./uploads/${id}${path.extname(fileDoc.filename)}`);
    await fileService.deleteOne({ _id: id });

    Helper.APIResponse(res, 200, {
      message: "File deleted successfully",
      data: true,
    });
  } catch (error) {
    if (error instanceof Exception) {
      throw error;
    }
    throw new Exception({
      message: error instanceof Error ? error.message : "Failed to delete file",
      code: 400,
    });
  }
}

export async function findOneFile(req: Request, res: Response) {
  try {
    const id = req.params.id;

    // check if id is valid
    if (!Types.ObjectId.isValid(id)) {
      throw new Exception({
        message: "Invalid file id",
        code: 400,
      });
    }

    const file = await fileService.findOne({ _id: id });

    if (!file) {
      throw new Exception({
        message: "File not found",
        code: 404,
      });
    }

    Helper.APIResponse(res, 200, {
      message: "File found",
      data: file,
    });
  } catch (error) {
    if (error instanceof Exception) {
      throw error;
    }
    throw new Exception({
      message: error instanceof Error ? error.message : "Failed to find file",
      code: 400,
    });
  }
}
