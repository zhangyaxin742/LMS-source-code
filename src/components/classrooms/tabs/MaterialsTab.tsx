import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Download, Link, Video, FileImage, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import UploadMaterialModal from "@/components/classroom/UploadMaterialModal";
import { Material, Module, Topic } from "@/components/classroom/types/material";

interface MaterialsTabProps {
  classroomId: string;
}

const MaterialsTab: React.FC<MaterialsTabProps> = ({ classroomId }) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  // Mock modules data
  const modules: Module[] = [
    {
      id: "mod1",
      name: "Introduction to UI Design",
      overview: "Learn the fundamentals of user interface design",
      topics: [
        { id: "topic1", name: "Design Principles", moduleId: "mod1" },
        { id: "topic2", name: "Color Theory", moduleId: "mod1" }
      ]
    },
    {
      id: "mod2",
      name: "Wireframing and Prototyping",
      overview: "Create wireframes and interactive prototypes",
      topics: [
        { id: "topic3", name: "Wireframing Basics", moduleId: "mod2" },
        { id: "topic4", name: "Prototyping with Figma", moduleId: "mod2" }
      ]
    }
  ];

  const handleSaveMaterial = (material: Material) => {
    setMaterials([...materials, material]);
    toast({
      title: "Material uploaded",
      description: `"${material.title}" has been successfully uploaded.`
    });
  };

  const handleDeleteMaterial = (id: string) => {
    const material = materials.find(m => m.id === id);
    setMaterials(materials.filter(m => m.id !== id));
    toast({
      title: "Material deleted",
      description: `"${material?.title}" has been removed.`
    });
  };

  const getFilteredMaterials = () => {
    if (activeTab === "all") return materials;
    return materials.filter(material => material.type.toLowerCase() === activeTab);
  };

  const getMaterialIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-8 w-8 text-red-500" />;
      case "presentation":
        return <FileImage className="h-8 w-8 text-amber-500" />;
      case "document":
        return <FileText className="h-8 w-8 text-blue-500" />;
      case "video":
        return <Video className="h-8 w-8 text-purple-500" />;
      case "link":
        return <Link className="h-8 w-8 text-green-500" />;
      default:
        return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Course Materials ({materials.length})</h2>
        <Button onClick={() => setIsUploadModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Upload Materials
        </Button>
      </div>

      {materials.length > 0 ? (
        <>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pdf">PDFs</TabsTrigger>
              <TabsTrigger value="presentation">Presentations</TabsTrigger>
              <TabsTrigger value="document">Documents</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="link">Links</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredMaterials().map((material) => (
              <Card key={material.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      {getMaterialIcon(material.type)}
                      <div>
                        <CardTitle className="text-base">{material.title}</CardTitle>
                        <CardDescription className="text-xs">{material.uploadDate}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteMaterial(material.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{material.description}</p>
                  {material.linkedTopic && (
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">
                        {modules.find(m => m.id === material.linkedTopic?.moduleId)?.name}: {material.linkedTopic.name}
                      </Badge>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="pt-3 flex justify-between">
                  <Badge variant="secondary">{material.type}</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-muted/20 rounded-md">
          <FileText className="h-8 w-8 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No materials uploaded yet</h3>
          <p className="text-muted-foreground mb-4">
            Upload course materials for your students
          </p>
          <Button onClick={() => setIsUploadModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Materials
          </Button>
        </div>
      )}

      <UploadMaterialModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSave={handleSaveMaterial}
        modules={modules}
      />
    </div>
  );
};

export default MaterialsTab;
