
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Material, Module } from "./types/material";
import MaterialFileUpload from "./MaterialFileUpload";
import MaterialTopicSelector from "./MaterialTopicSelector";
import ExistingResourceSelector from "./ExistingResourceSelector";

interface UploadMaterialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (material: Material) => void;
  modules: Module[];
}

const UploadMaterialModal: React.FC<UploadMaterialModalProps> = ({
  isOpen,
  onClose,
  onSave,
  modules,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fileType, setFileType] = useState("PDF");
  const [moduleId, setModuleId] = useState("");
  const [topicId, setTopicId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<"new" | "existing">("new");
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setFileType("PDF");
    setModuleId("");
    setTopicId("");
    setFile(null);
    setSelectedResourceId(null);
    setUploadMethod("new");
  };
  
  const handleSave = () => {
    const selectedModule = modules.find(m => m.id === moduleId);
    const selectedTopic = selectedModule?.topics.find(t => t.id === topicId);
    
    const getFormattedDate = () => {
      const date = new Date();
      const month = date.toLocaleString('default', { month: 'short' });
      return `${month} ${date.getDate()}, ${date.getFullYear()}`;
    };
    
    const newMaterial: Material = {
      id: `mat${Date.now()}`,
      title,
      description,
      type: fileType,
      uploadDate: getFormattedDate(),
      linkedTopic: selectedTopic ? 
        { id: selectedTopic.id, name: selectedTopic.name, moduleId: selectedTopic.moduleId } : 
        undefined
    };
    
    onSave(newMaterial);
    resetForm();
    onClose();
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Auto-detect file type
      const fileName = selectedFile.name.toLowerCase();
      if (fileName.endsWith('.pdf')) {
        setFileType('PDF');
      } else if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) {
        setFileType('Presentation');
      } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        setFileType('Document');
      } else if (fileName.endsWith('.mp4') || fileName.endsWith('.mov')) {
        setFileType('Video');
      } else {
        setFileType('Other');
      }
    }
  };

  const handleResourceSelect = (resourceId: string, resourceTitle: string, resourceType: string) => {
    setSelectedResourceId(resourceId);
    setTitle(resourceTitle);
    setFileType(resourceType);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Material</DialogTitle>
          <DialogDescription>
            Upload learning materials for your classroom.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="new" onValueChange={(value) => setUploadMethod(value as "new" | "existing")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">Upload New File</TabsTrigger>
            <TabsTrigger value="existing">Use Existing Resource</TabsTrigger>
          </TabsList>
          
          <TabsContent value="new" className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Material Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Lecture Slides – UI Principles"
                className="w-full"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this material covers"
                className="h-24"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="file">Upload File (Max 100MB)</Label>
              <MaterialFileUpload 
                file={file}
                onFileChange={handleFileChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="file-type">File Type</Label>
              <Select value={fileType} onValueChange={setFileType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select file type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF</SelectItem>
                  <SelectItem value="Presentation">Presentation</SelectItem>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Link">Link</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
          
          <TabsContent value="existing" className="space-y-4 pt-4">
            <ExistingResourceSelector onResourceSelect={handleResourceSelect} />
            
            {selectedResourceId && (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="title">Material Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add or modify the description"
                    className="h-24"
                  />
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
        
        <MaterialTopicSelector
          modules={modules}
          moduleId={moduleId}
          topicId={topicId}
          setModuleId={setModuleId}
          setTopicId={setTopicId}
        />
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={(uploadMethod === "new" && !title) || 
                     (uploadMethod === "new" && !file) || 
                     (uploadMethod === "existing" && !selectedResourceId)}
          >
            Upload Material
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadMaterialModal;
