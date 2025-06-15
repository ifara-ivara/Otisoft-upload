import mongoose, { Document, Schema } from "mongoose";

export interface TokenDocument extends Document {
  token: string;
  type: "upload" | "delete";
  fileId?: string; // Required for delete tokens
  expiresAt: Date;
  createdAt: Date;
}

const tokenSchema = new Schema<TokenDocument>({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["upload", "delete"],
    required: true,
  },
  fileId: {
    type: String,
    required: function () {
      return this.type === "delete";
    },
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: 0, // TTL index
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create TTL index for automatic expiration
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model<TokenDocument>("Token", tokenSchema);
