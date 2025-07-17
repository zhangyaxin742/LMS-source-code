
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Classroom } from "@/types/classroom";
import { DialogFooter } from "@/components/ui/dialog";
import { programs } from "@/data/classroom-programs";

export const formSchema = z.object({
  name: z.string().min(3, "Classroom name must be at least 3 characters"),
  program: z.string().min(1, "Please select a program"),
  status: z.enum(["active", "completed", "upcoming"]),
});

export type ClassroomFormValues = z.infer<typeof formSchema>;

interface ClassroomFormProps {
  onSubmit: (data: Omit<Classroom, "id" | "studentCount" | "moduleCount" | "course">) => void;
  onCancel: () => void;
}

const ClassroomForm: React.FC<ClassroomFormProps> = ({ onSubmit, onCancel }) => {
  const defaultProgram = "UX/UI Design";
  
  const form = useForm<ClassroomFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      program: defaultProgram,
      status: "active",
    },
  });

  const handleSubmit = (values: ClassroomFormValues) => {
    // Ensure all required fields are present before passing to onSubmit
    const classroomData: Omit<Classroom, "id" | "studentCount" | "moduleCount" | "course"> = {
      name: values.name,
      program: values.program,
      status: values.status,
    };
    
    onSubmit(classroomData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classroom Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter classroom name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="program"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a program" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.name}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">Create Classroom</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ClassroomForm;
