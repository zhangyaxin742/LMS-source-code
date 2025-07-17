
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProfileFormFieldsProps {
  name: string;
  email: string;
  bio: string;
  qualifications: string;
  onNameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onQualificationsChange: (value: string) => void;
}

const ProfileFormFields: React.FC<ProfileFormFieldsProps> = ({
  name,
  email,
  bio,
  qualifications,
  onNameChange,
  onBioChange,
  onQualificationsChange,
}) => {
  return (
    <>
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your name"
        />
      </div>
      
      {/* Email (non-editable) */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          disabled
          className="bg-muted"
        />
        <p className="text-xs text-muted-foreground">
          Email cannot be changed. Contact admin for assistance.
        </p>
      </div>
      
      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">Professional Bio</Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Professional bio"
          className="h-24"
        />
      </div>
      
      {/* Qualifications */}
      <div className="space-y-2">
        <Label htmlFor="qualifications">Qualifications</Label>
        <Textarea
          id="qualifications"
          value={qualifications}
          onChange={(e) => onQualificationsChange(e.target.value)}
          placeholder="Your qualifications"
          className="h-20"
        />
      </div>
    </>
  );
};

export default ProfileFormFields;
