import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be atleast 128 characters" }),

  catSlug: z.enum(["coding", "travel", "style"]),
  slug: z.string(),
  content: z.object({
    time: z.number(),
    blocks: z
      .array(z.unknown())
      .min(1, { message: "Content blocks must not be empty" }),
    version: z.string(),
  }),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
