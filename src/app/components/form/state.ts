import { postDataSchema } from "@/constants/validationSchema";
import { z } from "zod";

export interface FormStateType {
  fieldErrors?: z.inferFlattenedErrors<typeof postDataSchema>["fieldErrors"] | null;
  error?: { message: string, status: number } | null;
}

export const initialFormState = (
  initialFormState?: Partial<FormStateType>
): FormStateType => ({
  error: null,
  fieldErrors: null,
  ...initialFormState,
});