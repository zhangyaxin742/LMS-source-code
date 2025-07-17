
import React, { useState } from "react";
import { Camera, X } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileImageUploadProps {
  profileImage: string;
  onImageChange: (newImage: string | null) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  onImageChange,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setUploadError("Please select a JPEG or PNG image");
      return;
    }
    
    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit");
      return;
    }
    
    setUploadError(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewImage(event.target.result as string);
        onImageChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleRemovePreview = () => {
    setPreviewImage(null);
    onImageChange(null);
  };
  
  return (
    <div className="flex flex-col items-center space-y-3">
      <Avatar className="h-24 w-24 border-2 border-primary/20">
        <img src={previewImage || profileImage} alt="Profile" />
      </Avatar>
      
      <div className="flex flex-col items-center">
        <Label htmlFor="picture" className="cursor-pointer">
          <div className="flex items-center space-x-2 text-sm text-primary">
            <Camera size={16} />
            <span>Change Picture</span>
          </div>
          <Input 
            id="picture" 
            type="file" 
            className="hidden" 
            accept="image/jpeg, image/png"
            onChange={handleImageChange} 
          />
        </Label>
        
        {uploadError && (
          <div className="text-sm text-destructive mt-1">{uploadError}</div>
        )}
        
        {previewImage && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-destructive hover:text-destructive mt-2"
            onClick={handleRemovePreview}
          >
            <X size={14} className="mr-1" />
            Remove Preview
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUpload;
