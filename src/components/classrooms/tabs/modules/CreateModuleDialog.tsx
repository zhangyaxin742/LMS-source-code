
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CreateModuleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newModule: {
    title: string;
    description: string;
  };
  onModuleChange: (module: { title: string; description: string }) => void;
  onCreateModule: () => void;
}

const CreateModuleDialog: React.FC<CreateModuleDialogProps> = ({
  isOpen,
  onClose,
  newModule,
  onModuleChange,
  onCreateModule,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Module</DialogTitle>
          <DialogDescription>
            Add a new module to organize your course content.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Module Title
            </label>
            <Input
              id="title"
              value={newModule.title}
              onChange={(e) =>
                onModuleChange({ ...newModule, title: e.target.value })
              }
              placeholder="Enter module title"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              value={newModule.description}
              onChange={(e) =>
                onModuleChange({ ...newModule, description: e.target.value })
              }
              placeholder="Enter module description"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button onClick={onCreateModule}>Create Module</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModuleDialog;
