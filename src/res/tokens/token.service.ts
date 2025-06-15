import crypto from "crypto";
import TokenModel from "./token.model";

class TokenService {
  async generateToken(
    type: "upload" | "delete",
    fileId?: string,
  ): Promise<string> {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await TokenModel.create({
      token,
      type,
      fileId,
      expiresAt,
    });

    return token;
  }

  async validateToken(
    token: string,
    type: "upload" | "delete",
    fileId?: string,
  ): Promise<boolean> {
    const tokenDoc = await TokenModel.findOne({
      token,
      type,
      expiresAt: { $gt: new Date() },
    });

    if (!tokenDoc) {
      return false;
    }

    // For delete tokens, verify the fileId matches
    if (type === "delete" && tokenDoc.fileId !== fileId) {
      return false;
    }

    // Delete the token after use
    await TokenModel.deleteOne({ _id: tokenDoc._id });

    return true;
  }
}

export default new TokenService();
