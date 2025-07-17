
import { z } from "zod";

export const ProgramSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().min(1, { message: "Price must be greater than 0" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  branches: z.array(z.string()).optional(),
});

export type ProgramFormValues = z.infer<typeof ProgramSchema>;

export interface ProgramData extends ProgramFormValues {
  assignedStudents: string[];
  assignedTutors: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ProgramManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (programData: ProgramData) => void;
  program: any | null;
}
