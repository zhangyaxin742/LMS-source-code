
export type ResourceCategory = 
  | "PDF" 
  | "Presentation" 
  | "Document" 
  | "Video" 
  | "Link" 
  | "Other";

export type ResourceType = "classroom" | "prerecorded" | "other" | "all";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceCategory;
  uploadDate: string;
  uploadedBy?: string;
  fileSize?: string;
  fileUrl?: string;
  thumbnailUrl?: string;
  linkedClassroom?: {
    id: string;
    name: string;
  };
  linkedModule?: {
    id: string;
    name: string;
  };
  linkedTopic?: {
    id: string;
    name: string;
    moduleId: string;
  };
}
