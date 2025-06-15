import { QueryOptions } from "mongoose";
import logger from "../../lib/logger";
import FileModel from "./file.model";
import type { File, FileDocument } from "./file.model";
import { ProjectionType } from "mongoose";
import { FilterQuery } from "mongoose";

async function init() {
  // Any file-specific initialization can go here
  logger.info("File initialization");
  FileModel.syncIndexes();
  logger.info("File initialization complete");
}

async function createFile(
  data: Pick<File, "userId" | "mimeType" | "filename" | "size" | "url">,
) {
  const file = await FileModel.create(data);
  return file;
}

async function findOne(
  filter?: FilterQuery<FileDocument>,
  projection?: ProjectionType<FileDocument>,
  options?: QueryOptions<FileDocument>,
) {
  const result = await FileModel.findOne(filter, projection, options);
  return result;
}

async function findAll(
  filter: FilterQuery<FileDocument>,
  projection?: ProjectionType<FileDocument>,
  options?: QueryOptions<FileDocument>,
) {
  const result = await FileModel.find(filter, projection, options);
  return result;
}

async function updateOne(
  filter: FilterQuery<FileDocument>,
  data: Partial<FileDocument>,
  options?: QueryOptions<FileDocument>,
) {
  const result = await FileModel.findOneAndUpdate(filter, data, options);
  return result;
}

async function count(query: FilterQuery<FileDocument>) {
  const result = await FileModel.countDocuments(query);
  return result;
}

async function deleteOne(filter: FilterQuery<FileDocument>) {
  const result = await FileModel.findOneAndDelete(filter);
  return result;
}

const fileService = {
  init,
  createFile,
  findOne,
  findAll,
  updateOne,
  count,
  deleteOne,
};

export default fileService;
