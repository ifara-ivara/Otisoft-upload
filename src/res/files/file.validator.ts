import { z } from "zod";

const deleteFileValidator = z.object({
  params: z.object({
    id: z.string({ required_error: "File id is required" }),
  }),
});

const findOneFileValidator = z.object({
  params: z.object({
    id: z.string({ required_error: "File id is required" }),
  }),
});

const fileValidator = {
  deleteFileValidator,
  findOneFileValidator,
};

export default fileValidator;

export type FileValidatorType = {
  DeleteOne: z.infer<typeof deleteFileValidator>;
  FindOne: z.infer<typeof findOneFileValidator>;
};
