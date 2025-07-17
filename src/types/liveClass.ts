
export interface LiveClassMaterial {
  id: string;
  name: string;
  url: string;
  type: 'document' | 'video' | 'link' | 'audio' | 'other';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    role: 'instructor' | 'student';
    avatar?: string;
  };
  timestamp: string;
}

export interface LiveClass {
  id: string;
  title: string;
  description: string;
  classroom: string;
  classroomId: string;
  date: string;
  startTime: string;
  endTime: string;
  meetingLink?: string;
  status: 'scheduled' | 'live' | 'completed' | 'canceled';
  recordings?: string[];
  attendees?: number;
  totalStudents?: number;
  materials?: LiveClassMaterial[];
  chat?: ChatMessage[];
  moduleId?: string;
  topicId?: string;
}
