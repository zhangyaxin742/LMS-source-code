
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddTopicModal from "@/components/classroom/AddTopicModal";
import ModuleCard from "./modules/ModuleCard";
import EmptyModuleState from "./modules/EmptyModuleState";
import CreateModuleDialog from "./modules/CreateModuleDialog";
import { useModules } from "./modules/useModules";

interface ModulesTabProps {
  classroomId: string;
}

const ModulesTab: React.FC<ModulesTabProps> = ({ classroomId }) => {
  const {
    modules,
    isCreateModuleOpen,
    setIsCreateModuleOpen,
    isAddTopicOpen,
    setIsAddTopicOpen,
    activeModuleId,
    newModule,
    setNewModule,
    handleCreateModule,
    handleDeleteModule,
    handleTopicCompletion,
    handleModuleCompletion,
    handleAddTopic,
    handleSaveTopic,
  } = useModules(classroomId);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Modules ({modules.length})</h2>
        <Button onClick={() => setIsCreateModuleOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Module
        </Button>
      </div>

      <div className="space-y-4">
        {modules.length > 0 ? (
          modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onTopicCompletion={handleTopicCompletion}
              onModuleCompletion={handleModuleCompletion}
              onDeleteModule={handleDeleteModule}
              onAddTopic={handleAddTopic}
            />
          ))
        ) : (
          <EmptyModuleState onCreateModule={() => setIsCreateModuleOpen(true)} />
        )}
      </div>

      <CreateModuleDialog
        isOpen={isCreateModuleOpen}
        onClose={() => setIsCreateModuleOpen(false)}
        newModule={newModule}
        onModuleChange={setNewModule}
        onCreateModule={handleCreateModule}
      />

      <AddTopicModal
        isOpen={isAddTopicOpen}
        onClose={() => setIsAddTopicOpen(false)}
        onSave={handleSaveTopic}
        moduleId={activeModuleId || ""}
      />
    </div>
  );
};

export default ModulesTab;
