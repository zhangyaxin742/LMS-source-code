import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Plus, X, Edit, Trash2, FileVideo, Clock, Eye, Video, Check, Link, FileUp, BookOpen, BookmarkPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

interface Module {
  id: string;
  title: string;
  description: string;
  videos: Video[];
  assignments: string[];
}

interface Video {
  id: string;
  title: string;
  duration: string;
  moduleId: string;
  url: string;
  description: string;
  views: number;
  completions: number;
  resources?: Resource[];
  assignedAssignments?: string[];
}

interface Resource {
  id: string;
  title: string;
  type: "pdf" | "link" | "other";
  url: string;
}

interface ModuleManagementProps {
  courseId: string;
  modules: Module[];
  onModuleAdd: (module: Omit<Module, 'id'>) => void;
  onModuleEdit: (module: Module) => void;
  onModuleDelete: (moduleId: string) => void;
  onVideoAdd: (video: Omit<Video, 'id'>, moduleId: string) => void;
}

const CourseModuleManagement: React.FC<ModuleManagementProps> = ({
  courseId,
  modules,
  onModuleAdd,
  onModuleEdit,
  onModuleDelete,
  onVideoAdd
}) => {
  const { toast } = useToast();
  const [newModule, setNewModule] = useState({ title: "", description: "" });
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [newVideo, setNewVideo] = useState<Omit<Video, 'id'>>({
    title: "",
    duration: "",
    moduleId: "",
    url: "",
    description: "",
    views: 0,
    completions: 0,
    resources: [],
    assignedAssignments: []
  });
  const [moduleForVideo, setModuleForVideo] = useState<string>("");
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [isEditingModule, setIsEditingModule] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  
  const [newResource, setNewResource] = useState<{ title: string; type: "pdf" | "link" | "other"; url: string }>({ title: "", type: "pdf", url: "" });
  const [newAssignment, setNewAssignment] = useState("");
  const [videoAddTab, setVideoAddTab] = useState("details");
  
  const availableAssignments = [
    { id: "assign1", title: "UI/UX Design Principles Quiz" },
    { id: "assign2", title: "Wireframing Assignment" },
    { id: "assign3", title: "User Research Methods" },
    { id: "assign4", title: "Prototyping Basics" },
  ];

  const handleAddModule = () => {
    if (!newModule.title.trim()) {
      toast({
        title: "Error",
        description: "Module title is required",
        variant: "destructive"
      });
      return;
    }
    
    onModuleAdd({
      ...newModule,
      videos: [],
      assignments: []
    });
    
    setNewModule({ title: "", description: "" });
    setIsAddingModule(false);
    
    toast({
      title: "Success",
      description: "Module added successfully",
    });
  };

  const handleEditModule = () => {
    if (!editingModule) return;
    
    if (!editingModule.title.trim()) {
      toast({
        title: "Error",
        description: "Module title is required",
        variant: "destructive"
      });
      return;
    }
    
    onModuleEdit(editingModule);
    setEditingModule(null);
    setIsEditingModule(false);
    
    toast({
      title: "Success",
      description: "Module updated successfully",
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    onModuleDelete(moduleId);
    
    toast({
      title: "Success",
      description: "Module deleted successfully",
    });
  };

  const openAddVideoDialog = (moduleId: string) => {
    setModuleForVideo(moduleId);
    setNewVideo({
      title: "",
      duration: "",
      moduleId: moduleId,
      url: "",
      description: "",
      views: 0,
      completions: 0,
      resources: [],
      assignedAssignments: []
    });
    setIsAddingVideo(true);
    setVideoAddTab("details");
  };

  const handleAddVideo = () => {
    if (!newVideo.title.trim() || !newVideo.url.trim()) {
      toast({
        title: "Error",
        description: "Video title and URL are required",
        variant: "destructive"
      });
      return;
    }
    
    onVideoAdd(newVideo, moduleForVideo);
    setNewVideo({
      title: "",
      duration: "",
      moduleId: "",
      url: "",
      description: "",
      views: 0,
      completions: 0,
      resources: [],
      assignedAssignments: []
    });
    setModuleForVideo("");
    setIsAddingVideo(false);
    
    toast({
      title: "Success",
      description: "Video added successfully",
    });
  };

  const handleAddResource = () => {
    if (!newResource.title.trim() || !newResource.url.trim()) {
      toast({
        title: "Error",
        description: "Resource title and URL are required",
        variant: "destructive"
      });
      return;
    }
    
    const resourceId = `resource${Date.now()}`;
    const newResources = [...(newVideo.resources || []), { ...newResource, id: resourceId }];
    
    setNewVideo(prev => ({
      ...prev,
      resources: newResources
    }));
    
    setNewResource({ title: "", type: "pdf", url: "" });
    
    toast({
      title: "Success",
      description: "Resource attached to video",
    });
  };

  const handleToggleAssignment = (assignmentId: string) => {
    const currentAssignments = newVideo.assignedAssignments || [];
    const updatedAssignments = currentAssignments.includes(assignmentId)
      ? currentAssignments.filter(id => id !== assignmentId)
      : [...currentAssignments, assignmentId];
    
    setNewVideo(prev => ({
      ...prev,
      assignedAssignments: updatedAssignments
    }));
  };

  const handleRemoveResource = (resourceId: string) => {
    const updatedResources = (newVideo.resources || []).filter(resource => resource.id !== resourceId);
    setNewVideo(prev => ({
      ...prev,
      resources: updatedResources
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Course Modules</h2>
        <Button onClick={() => setIsAddingModule(true)}>
          <Plus size={16} className="mr-2" />
          Add Module
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                  <div className="flex space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground"
                      onClick={() => {
                        setEditingModule(module);
                        setIsEditingModule(true);
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={() => handleDeleteModule(module.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {module.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="text-sm font-medium">Videos ({module.videos.length})</div>
                  {module.videos.length > 0 ? (
                    <div className="space-y-2">
                      {module.videos.map((video) => (
                        <div 
                          key={video.id} 
                          className="flex items-start p-2 rounded-md bg-secondary/40 text-sm"
                        >
                          <FileVideo size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{video.title}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Clock size={12} className="mr-1" />
                              <span>{video.duration}</span>
                              <span className="mx-1">•</span>
                              <Eye size={12} className="mr-1" />
                              <span>{video.views} views</span>
                              
                              {video.resources && video.resources.length > 0 && (
                                <>
                                  <span className="mx-1">•</span>
                                  <FileText size={12} className="mr-1" />
                                  <span>{video.resources.length} resources</span>
                                </>
                              )}
                              
                              {video.assignedAssignments && video.assignedAssignments.length > 0 && (
                                <>
                                  <span className="mx-1">•</span>
                                  <BookOpen size={12} className="mr-1" />
                                  <span>{video.assignedAssignments.length} assignments</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground italic">No videos in this module</div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => openAddVideoDialog(module.id)}
                >
                  <Video size={14} className="mr-2" />
                  Add Video
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>

      <Dialog open={isAddingModule} onOpenChange={setIsAddingModule}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Module</DialogTitle>
            <DialogDescription>
              Create a new module for this course. You can add videos to it later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="module-title">Module Title</Label>
              <Input
                id="module-title"
                placeholder="Enter module title"
                value={newModule.title}
                onChange={(e) => setNewModule(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="module-description">Description (Optional)</Label>
              <Textarea
                id="module-description"
                placeholder="Enter module description"
                value={newModule.description}
                onChange={(e) => setNewModule(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingModule(false)}>Cancel</Button>
            <Button onClick={handleAddModule}>
              <Plus size={16} className="mr-2" />
              Add Module
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditingModule} onOpenChange={setIsEditingModule}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
            <DialogDescription>
              Update this module's information.
            </DialogDescription>
          </DialogHeader>
          {editingModule && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-module-title">Module Title</Label>
                <Input
                  id="edit-module-title"
                  placeholder="Enter module title"
                  value={editingModule.title}
                  onChange={(e) => setEditingModule(prev => prev ? { ...prev, title: e.target.value } : null)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-module-description">Description</Label>
                <Textarea
                  id="edit-module-description"
                  placeholder="Enter module description"
                  value={editingModule.description}
                  onChange={(e) => setEditingModule(prev => prev ? { ...prev, description: e.target.value } : null)}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingModule(false)}>Cancel</Button>
            <Button onClick={handleEditModule}>
              <Check size={16} className="mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddingVideo} onOpenChange={setIsAddingVideo}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Add New Video</DialogTitle>
            <DialogDescription>
              Upload a new video and attach resources or assignments.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs value={videoAddTab} onValueChange={setVideoAddTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <Video size={16} />
                Video Details
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                <FileText size={16} />
                Resources
              </TabsTrigger>
              <TabsTrigger value="assignments" className="flex items-center gap-2">
                <BookOpen size={16} />
                Assignments
              </TabsTrigger>
            </TabsList>
            
            <div className="flex-1 overflow-auto pr-1">
              <TabsContent value="details" className="mt-0 space-y-4">
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="video-title">Video Title</Label>
                    <Input
                      id="video-title"
                      placeholder="Enter video title"
                      value={newVideo.title}
                      onChange={(e) => setNewVideo(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="video-duration">Duration</Label>
                      <Input
                        id="video-duration"
                        placeholder="e.g. 25:30"
                        value={newVideo.duration}
                        onChange={(e) => setNewVideo(prev => ({ ...prev, duration: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="video-url">Video URL</Label>
                      <Input
                        id="video-url"
                        placeholder="Enter video URL"
                        value={newVideo.url}
                        onChange={(e) => setNewVideo(prev => ({ ...prev, url: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="video-description">Description (Optional)</Label>
                    <Textarea
                      id="video-description"
                      placeholder="Enter video description"
                      value={newVideo.description}
                      onChange={(e) => setNewVideo(prev => ({ ...prev, description: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="p-4 border rounded-md bg-secondary/30">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>Module</span>
                      <span>{modules.find(m => m.id === moduleForVideo)?.title || "Unknown Module"}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Attach Resources</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="resource-title">Resource Title</Label>
                      <Input
                        id="resource-title"
                        placeholder="Enter resource title"
                        value={newResource.title}
                        onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="resource-type">Resource Type</Label>
                        <select
                          id="resource-type"
                          value={newResource.type}
                          onChange={(e) => setNewResource(prev => ({ ...prev, type: e.target.value as "pdf" | "link" | "other" }))}
                          className="w-full flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="pdf">PDF Document</option>
                          <option value="link">External Link</option>
                          <option value="other">Other Resource</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="resource-url">URL or File Link</Label>
                        <Input
                          id="resource-url"
                          placeholder={newResource.type === 'pdf' ? "Link to PDF file" : "Enter URL"}
                          value={newResource.url}
                          onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                        />
                      </div>
                    </div>
                    
                    <Button onClick={handleAddResource} className="w-full">
                      <Plus size={16} className="mr-2" />
                      Add Resource
                    </Button>
                  </div>
                  
                  <div className="mt-6 border-t pt-4">
                    <h4 className="font-medium mb-2">Attached Resources ({(newVideo.resources || []).length})</h4>
                    
                    {(newVideo.resources || []).length > 0 ? (
                      <div className="space-y-2">
                        {(newVideo.resources || []).map((resource) => (
                          <div 
                            key={resource.id}
                            className="flex items-center justify-between p-3 rounded-md bg-secondary/40"
                          >
                            <div className="flex items-center">
                              {resource.type === 'pdf' ? (
                                <FileText size={16} className="mr-2 text-red-600" />
                              ) : resource.type === 'link' ? (
                                <Link size={16} className="mr-2 text-blue-600" />
                              ) : (
                                <FileUp size={16} className="mr-2 text-green-600" />
                              )}
                              <div>
                                <div className="font-medium">{resource.title}</div>
                                <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {resource.url}
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive"
                              onClick={() => handleRemoveResource(resource.id)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-sm">
                        No resources attached yet.
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="assignments" className="mt-0 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Assign Assignments</h3>
                  
                  <div className="space-y-4">
                    {availableAssignments.map(assignment => (
                      <div 
                        key={assignment.id}
                        className={`flex items-center justify-between p-3 rounded-md border ${
                          (newVideo.assignedAssignments || []).includes(assignment.id) 
                            ? "border-primary bg-primary/10" 
                            : "border-border bg-secondary/40"
                        }`}
                      >
                        <div className="flex items-center">
                          <BookOpen size={16} className="mr-2" />
                          <span>{assignment.title}</span>
                        </div>
                        
                        <Button
                          variant={
                            (newVideo.assignedAssignments || []).includes(assignment.id) 
                              ? "default" 
                              : "outline"
                          }
                          size="sm"
                          onClick={() => handleToggleAssignment(assignment.id)}
                        >
                          {(newVideo.assignedAssignments || []).includes(assignment.id) ? (
                            <>
                              <Check size={16} className="mr-2" />
                              Assigned
                            </>
                          ) : (
                            <>
                              <BookmarkPlus size={16} className="mr-2" />
                              Assign
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                    
                    {availableAssignments.length === 0 && (
                      <div className="text-muted-foreground text-sm">
                        No available assignments found. Create assignments in the Assignments section.
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          <DialogFooter className="mt-4 pt-4 border-t">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">Added:</span>
                <div className="flex items-center">
                  <FileText size={14} className="mr-1" />
                  {(newVideo.resources || []).length} resources
                </div>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <BookOpen size={14} className="mr-1" />
                  {(newVideo.assignedAssignments || []).length} assignments
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddingVideo(false)}>Cancel</Button>
                <Button onClick={handleAddVideo}>
                  <FileVideo size={16} className="mr-2" />
                  Add Video
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseModuleManagement;
