
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
import { useToast } from "@/components/ui/use-toast";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileFormFields from "./ProfileFormFields";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: {
    name: string;
    email: string;
    bio: string;
    qualifications: string;
    profileImage: string;
  };
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  const { toast } = useToast();
  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [qualifications, setQualifications] = useState(profile.qualifications);
  const [profileImage, setProfileImage] = useState(profile.profileImage);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageChange = (newImage: string | null) => {
    setImagePreview(newImage);
  };
  
  const handleSave = () => {
    // Validate
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would be an API call to update the profile
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
    
    // If there's a new image preview, use it as the profile image
    if (imagePreview) {
      setProfileImage(imagePreview);
    }
    
    onClose();
  };
  
  const handleCancel = () => {
    // Reset form
    setName(profile.name);
    setBio(profile.bio);
    setQualifications(profile.qualifications);
    setImagePreview(null);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your profile information below
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Profile Picture */}
          <ProfileImageUpload 
            profileImage={profileImage} 
            onImageChange={handleImageChange}
          />
          
          {/* Form Fields */}
          <ProfileFormFields
            name={name}
            email={profile.email}
            bio={bio}
            qualifications={qualifications}
            onNameChange={setName}
            onBioChange={setBio}
            onQualificationsChange={setQualifications}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
