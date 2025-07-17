
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen } from "lucide-react";

interface TemplateItem {
  title: string;
  description: string;
  usage: string;
}

interface AssignmentTemplatesProps {
  templates: TemplateItem[];
}

const AssignmentTemplates: React.FC<AssignmentTemplatesProps> = ({ templates }) => {
  return (
    <div className="glass-panel p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Assignment Templates</h2>
        <Button variant="secondary" className="gap-2">
          <CheckCircle size={16} className="mr-2" />
          Create Template
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template, index) => (
          <motion.div
            key={template.title}
            className="glass-card p-5 rounded-lg border bg-white/90 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + 0.1 * index }}
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-secondary/70 rounded-lg">
                <BookOpen size={20} />
              </div>
              
              <div className="flex-1">
                <h3 className="text-base font-medium">{template.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {template.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                    {template.usage}
                  </span>
                  
                  <div className="flex items-center space-x-3">
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Use
                    </button>
                    <button className="text-primary hover:text-primary/80 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentTemplates;
