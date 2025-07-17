
// Mock data for programs and courses
export const programs = [
  { id: "1", name: "UX/UI Design" },
  { id: "2", name: "Web Development" },
  { id: "3", name: "Data Science" },
];

export const coursesByProgram: Record<string, { id: string; name: string }[]> = {
  "UX/UI Design": [
    { id: "1", name: "Design Basics" },
    { id: "2", name: "Advanced Design" },
    { id: "3", name: "Design Systems" },
  ],
  "Web Development": [
    { id: "4", name: "JavaScript Essentials" },
    { id: "5", name: "React Mastery" },
    { id: "6", name: "Full Stack Development" },
  ],
  "Data Science": [
    { id: "7", name: "Python for Data Science" },
    { id: "8", name: "Machine Learning" },
    { id: "9", name: "Data Visualization" },
  ],
};
