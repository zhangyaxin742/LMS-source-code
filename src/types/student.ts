
export interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  status: "active" | "inactive";
  lastActive: string;
  profileImage?: string;
}
