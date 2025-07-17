
export interface Module {
  id: string;
  name: string;
  overview: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  moduleId: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  type: string;
  uploadDate: string;
  linkedTopic?: { id: string; name: string; moduleId: string };
}
