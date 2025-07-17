
export interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  isCompleted: boolean;
  materials?: {
    id: string;
    name: string;
    url: string;
    type: 'document' | 'video' | 'link' | 'audio' | 'other';
  }[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  isCompleted: boolean;
  liveClassId?: string;
}
