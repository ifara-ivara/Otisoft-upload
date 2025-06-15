import { HydratedDocument, Types } from "mongoose";
import { InferSchemaType, Schema, model } from "mongoose";

const file = new Schema(
  {
    // who uploaded the file
    userId: { type: Types.ObjectId, required: false },
    mimeType: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },
  },
  {
    strict: true,
    timestamps: true,
  },
);

const FileModel = model("File", file);

type File = InferSchemaType<typeof file>;
type FileDocument = HydratedDocument<File>;

export type { File, FileDocument };
export default FileModel;
