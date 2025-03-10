import { z } from "zod";

export const hypothesisSchema = z.object({
  suggestion: z.string(),
  hypothesis: z.string(),
  control: z.string(),
  variant: z.string(),
});
