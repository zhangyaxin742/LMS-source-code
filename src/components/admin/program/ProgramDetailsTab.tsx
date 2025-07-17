
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UseFormReturn } from "react-hook-form";
import { ProgramFormValues } from "./types";

interface ProgramDetailsTabProps {
  form: UseFormReturn<ProgramFormValues>;
  branches: string[];
  setBranches: React.Dispatch<React.SetStateAction<string[]>>;
}

const ProgramDetailsTab: React.FC<ProgramDetailsTabProps> = ({
  form,
  branches,
  setBranches
}) => {
  const [newBranch, setNewBranch] = useState("");

  const handleAddBranch = () => {
    if (newBranch.trim() !== "" && !branches.includes(newBranch.trim())) {
      const updatedBranches = [...branches, newBranch.trim()];
      setBranches(updatedBranches);
      form.setValue("branches", updatedBranches);
      setNewBranch("");
    }
  };

  const handleRemoveBranch = (branch: string) => {
    const updatedBranches = branches.filter((b) => b !== branch);
    setBranches(updatedBranches);
    form.setValue("branches", updatedBranches);
  };

  return (
    <form className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Program Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter program name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter program description"
                className="resize-none min-h-[100px]"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (₦)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price in Naira"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 12 weeks"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormItem>
        <FormLabel>Program Branches</FormLabel>
        <div className="flex gap-2">
          <Input
            placeholder="Add a branch"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddBranch}
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {branches.map((branch, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-1">
              {branch}
              <button
                type="button"
                onClick={() => handleRemoveBranch(branch)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            </Badge>
          ))}
          {branches.length === 0 && (
            <span className="text-sm text-muted-foreground">
              No branches added yet
            </span>
          )}
        </div>
      </FormItem>
    </form>
  );
};

export default ProgramDetailsTab;
