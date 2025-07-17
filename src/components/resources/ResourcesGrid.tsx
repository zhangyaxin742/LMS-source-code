
import React from "react";
import { motion } from "framer-motion";
import ResourceCard from "./ResourceCard";
import { Resource, ResourceType, ResourceCategory } from "./types";
import { mockResources } from "./mockData";

interface ResourcesGridProps {
  type: ResourceType;
  searchTerm: string;
  category: ResourceCategory | null;
}

const ResourcesGrid: React.FC<ResourcesGridProps> = ({ 
  type, 
  searchTerm, 
  category 
}) => {
  // In a real application, this would fetch data from an API
  const resources = mockResources;
  
  const filteredResources = resources.filter(resource => {
    // Filter by type
    if (type !== "all" && resource.linkedClassroom && type !== "classroom") {
      return false;
    }
    if (type === "prerecorded" && resource.type !== "Video") {
      return false;
    }
    if (type === "other" && (resource.linkedClassroom || resource.type === "Video")) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !resource.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by category
    if (category && resource.type !== category) {
      return false;
    }
    
    return true;
  });
  
  if (filteredResources.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-lg font-medium">No resources found</h3>
        <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {filteredResources.map((resource, index) => (
        <motion.div
          key={resource.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <ResourceCard resource={resource} />
        </motion.div>
      ))}
    </div>
  );
};

export default ResourcesGrid;
