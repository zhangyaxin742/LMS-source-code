
import React from "react";
import { Upload } from "lucide-react";

interface MaterialFileUploadProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaterialFileUpload: React.FC<MaterialFileUploadProps> = ({ file, onFileChange }) => {
  return (
    <div className="border border-input rounded-md p-4">
      <label 
        htmlFor="file-upload" 
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">
          {file ? file.name : "Click to upload or drag and drop"}
        </span>
        <span className="text-xs text-muted-foreground mt-1">
          PDF, PPT, DOC, Video (Max 100MB)
        </span>
      </label>
      <input
        id="file-upload"
        type="file"
        className="hidden"
        onChange={onFileChange}
        accept=".pdf,.ppt,.pptx,.doc,.docx,.mp4,.mov"
      />
    </div>
  );
};

export default MaterialFileUpload;
