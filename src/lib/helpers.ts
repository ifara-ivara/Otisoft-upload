import { Response } from "express";
import { ZodType } from "zod";
import Exception from "./Exception";
import * as z from "zod";

class Helper {
  // validate the payload and return the parsed payload if the payload is valid else throw an exception
  static parsePayload<T extends ZodType>(schema: T, payload: any): z.infer<T> {
    // parse the payload
    const result = schema.safeParse(payload);

    if (!result.success) {
      throw new Exception({
        message: result.error.errors[0].message,
        code: 400,
      });
    }

    return result.data;
  }

  static APIResponse(
    res: Response,
    code: number,
    params: { message: string; data: any },
  ) {
    return res.status(code).send(params);
  }

  static APIErrorHandler(error: any) {
    if (error instanceof Exception) {
      return error;
    }
    return new Exception({ message: "Internal server error", code: 500 });
  }
}

export default Helper;
