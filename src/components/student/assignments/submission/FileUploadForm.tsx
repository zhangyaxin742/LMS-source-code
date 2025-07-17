
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface FileUploadFormProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
}

const FileUploadForm: React.FC<FileUploadFormProps> = ({
  file,
  onFileChange,
  onFileRemove
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="file-upload">Upload File</Label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={onFileChange}
        />
        <label 
          htmlFor="file-upload" 
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {file ? file.name : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            PDF, DOC, DOCX up to 10MB
          </p>
        </label>
      </div>
      {file && (
        <div className="flex items-center justify-between mt-2 p-2 bg-gray-50 rounded">
          <span className="text-sm truncate">{file.name}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={onFileRemove}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadForm;
