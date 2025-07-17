
import { Module } from "@/components/assignments/types";

export const useModulesData = () => {
  // Enhanced data with more topics
  const modules: Module[] = [
    {
      id: "m1",
      name: "Introduction to React",
      overview: "Basic concepts of React",
      topics: [
        { id: "t1", name: "JSX and Components", moduleId: "m1" },
        { id: "t2", name: "State and Props", moduleId: "m1" },
        { id: "t3", name: "Component Lifecycle", moduleId: "m1" },
        { id: "t4", name: "Event Handling", moduleId: "m1" },
      ],
    },
    {
      id: "m2",
      name: "Advanced React",
      overview: "Advanced React concepts",
      topics: [
        { id: "t5", name: "Hooks", moduleId: "m2" },
        { id: "t6", name: "Context API", moduleId: "m2" },
        { id: "t7", name: "Performance Optimization", moduleId: "m2" },
        { id: "t8", name: "Custom Hooks", moduleId: "m2" },
      ],
    },
    {
      id: "m3",
      name: "React Ecosystem",
      overview: "Tools and libraries in the React ecosystem",
      topics: [
        { id: "t9", name: "React Router", moduleId: "m3" },
        { id: "t10", name: "State Management", moduleId: "m3" },
        { id: "t11", name: "Testing in React", moduleId: "m3" },
        { id: "t12", name: "Server Components", moduleId: "m3" },
      ],
    },
  ];
  
  return { modules };
};
