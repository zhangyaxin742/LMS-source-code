
import { Resource } from "./types";

export const mockResources: Resource[] = [
  {
    id: "res1",
    title: "Introduction to UI/UX Design",
    description: "A comprehensive guide to the fundamentals of UI/UX design principles and best practices.",
    type: "PDF",
    uploadDate: "Mar 15, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "2.4 MB",
    linkedClassroom: {
      id: "class1",
      name: "Web Design Fundamentals"
    },
    linkedModule: {
      id: "mod1",
      name: "Design Principles"
    },
    linkedTopic: {
      id: "topic1",
      name: "Introduction to UI",
      moduleId: "mod1"
    }
  },
  {
    id: "res2",
    title: "Color Theory for Digital Designers",
    description: "Learn how to implement effective color schemes in your digital projects.",
    type: "Presentation",
    uploadDate: "Mar 18, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "5.7 MB",
    linkedClassroom: {
      id: "class1",
      name: "Web Design Fundamentals"
    },
    linkedModule: {
      id: "mod2",
      name: "Visual Design"
    },
    linkedTopic: {
      id: "topic2",
      name: "Color Theory",
      moduleId: "mod2"
    }
  },
  {
    id: "res3",
    title: "Responsive Design Workshop",
    description: "Recorded workshop covering responsive design techniques for modern websites.",
    type: "Video",
    uploadDate: "Mar 20, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "128 MB",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: "res4",
    title: "Typography Guide",
    description: "A complete guide to typography selection and pairings for web and mobile interfaces.",
    type: "Document",
    uploadDate: "Mar 22, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "1.2 MB",
    linkedClassroom: {
      id: "class1",
      name: "Web Design Fundamentals"
    }
  },
  {
    id: "res5",
    title: "Figma Starter Templates",
    description: "A collection of starter templates for your Figma projects.",
    type: "Link",
    uploadDate: "Mar 25, 2025",
    uploadedBy: "Thomas Anderson"
  },
  {
    id: "res6",
    title: "CSS Grid Workshop",
    description: "Learn how to create complex layouts with CSS Grid.",
    type: "Video",
    uploadDate: "Mar 27, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "105 MB",
    thumbnailUrl: "/placeholder.svg"
  },
  {
    id: "res7",
    title: "Web Accessibility Checklist",
    description: "A comprehensive checklist to ensure your web projects meet accessibility standards.",
    type: "PDF",
    uploadDate: "Mar 30, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "0.8 MB"
  },
  {
    id: "res8",
    title: "User Research Methods",
    description: "An overview of effective user research methods and when to use them.",
    type: "Presentation",
    uploadDate: "Apr 2, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "4.2 MB",
    linkedClassroom: {
      id: "class2",
      name: "UX Research Methods"
    }
  },
  {
    id: "res9",
    title: "Interaction Design Principles",
    description: "Learn the key principles that guide effective interaction design.",
    type: "Video",
    uploadDate: "Apr 5, 2025",
    uploadedBy: "Thomas Anderson",
    fileSize: "156 MB",
    thumbnailUrl: "/placeholder.svg"
  }
];
