
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { FileText, Link, Video, Music, File, Plus, ExternalLink, Trash2 } from "lucide-react";
import { LiveClassMaterial } from "@/types/liveClass";
import AddMaterialDialog from "./AddMaterialDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ClassMaterialsProps {
  materials: LiveClassMaterial[];
  classId: string;
  isEditable: boolean;
}

const ClassMaterials: React.FC<ClassMaterialsProps> = ({
  materials,
  classId,
  isEditable,
}) => {
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [materialsList, setMaterialsList] = useState<LiveClassMaterial[]>(materials);

  const getMaterialIcon = (type: LiveClassMaterial["type"]) => {
    switch (type) {
      case "document":
        return <FileText size={16} className="text-blue-500" />;
      case "video":
        return <Video size={16} className="text-red-500" />;
      case "link":
        return <Link size={16} className="text-green-500" />;
      case "audio":
        return <Music size={16} className="text-purple-500" />;
      default:
        return <File size={16} className="text-gray-500" />;
    }
  };

  const handleAddMaterial = (material: Omit<LiveClassMaterial, "id" | "createdAt">) => {
    const newMaterial: LiveClassMaterial = {
      ...material,
      id: `mat-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setMaterialsList([...materialsList, newMaterial]);
    setShowAddMaterial(false);
  };

  const handleDeleteMaterial = (materialId: string) => {
    setMaterialsList(materialsList.filter(material => material.id !== materialId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {isEditable && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAddMaterial(true)}
          >
            <Plus size={16} className="mr-2" />
            Add Material
          </Button>
        </div>
      )}

      {materialsList.length === 0 ? (
        <div className="text-center py-8 bg-muted/20 rounded-md">
          <File className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium">No materials yet</h3>
          <p className="text-muted-foreground">
            {isEditable 
              ? "Add materials for students to access during and after the class."
              : "No materials have been added to this class yet."}
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Added On</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {materialsList.map((material) => (
              <TableRow key={material.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {getMaterialIcon(material.type)}
                    <span className="ml-2">{material.name}</span>
                  </div>
                </TableCell>
                <TableCell className="capitalize">{material.type}</TableCell>
                <TableCell>{formatDate(material.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      asChild
                    >
                      <a 
                        href={material.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        title="Open material"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                    
                    {isEditable && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-destructive hover:text-destructive/90"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Material</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{material.name}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => handleDeleteMaterial(material.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <AddMaterialDialog 
        open={showAddMaterial} 
        onOpenChange={setShowAddMaterial}
        onAdd={handleAddMaterial}
        classId={classId}
      />
    </div>
  );
};

export default ClassMaterials;
