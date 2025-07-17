
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LiveClassMaterial } from "@/types/liveClass";

interface AddMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (material: Omit<LiveClassMaterial, "id" | "createdAt">) => void;
  classId: string;
}

const AddMaterialDialog: React.FC<AddMaterialDialogProps> = ({
  open,
  onOpenChange,
  onAdd,
  classId,
}) => {
  const [materialName, setMaterialName] = useState("");
  const [materialUrl, setMaterialUrl] = useState("");
  const [materialType, setMaterialType] = useState<LiveClassMaterial["type"]>("document");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!materialName.trim() || !materialUrl.trim()) return;

    onAdd({
      name: materialName,
      url: materialUrl,
      type: materialType,
    });

    // Reset form
    setMaterialName("");
    setMaterialUrl("");
    setMaterialType("document");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Material</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="material-name">Material Name</Label>
            <Input 
              id="material-name"
              value={materialName}
              onChange={(e) => setMaterialName(e.target.value)}
              placeholder="e.g., Lecture Slides, Handout, Video Tutorial"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="material-type">Material Type</Label>
            <Select 
              value={materialType} 
              onValueChange={(value) => setMaterialType(value as LiveClassMaterial["type"])}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="link">Link</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="material-url">URL</Label>
            <Input 
              id="material-url"
              value={materialUrl}
              onChange={(e) => setMaterialUrl(e.target.value)}
              placeholder="https://..."
              type="url"
              required
            />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Add Material</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMaterialDialog;
