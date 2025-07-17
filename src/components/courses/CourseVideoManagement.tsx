import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileVideo, Edit, Trash2, Eye, Clock, Check, BookOpen, Link, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";

interface Resource {
  id: string;
  title: string;
  type: "pdf" | "link" | "other";
  url: string;
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

interface Module {
  id: string;
  title: string;
}

interface Assignment {
  id: string;
  title: string;
}

interface VideoManagementProps {
  courseId: string;
  videos: Video[];
  modules: Module[];
  onVideoEdit: (video: Video) => void;
  onVideoDelete: (videoId: string) => void;
}

const CourseVideoManagement: React.FC<VideoManagementProps> = ({
  videos,
  modules,
  onVideoEdit,
  onVideoDelete
}) => {
  const { toast } = useToast();
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isEditingVideo, setIsEditingVideo] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [editTab, setEditTab] = useState("details");
  
  const availableAssignments = [
    { id: "assign1", title: "UI/UX Design Principles Quiz" },
    { id: "assign2", title: "Wireframing Assignment" },
    { id: "assign3", title: "User Personas Creation" },
    { id: "assign4", title: "Usability Testing Plan" },
  ];
  
  const [newResource, setNewResource] = useState<{ title: string; type: "pdf" | "link" | "other"; url: string }>({ 
    title: "", 
    type: "pdf", 
    url: "" 
  });

  const handleEditVideo = () => {
    if (!editingVideo) return;
    
    onVideoEdit(editingVideo);
    setEditingVideo(null);
    setIsEditingVideo(false);
    
    toast({
      title: "Success",
      description: "Video updated successfully"
    });
  };

  const handleDeleteVideo = (videoId: string) => {
    onVideoDelete(videoId);
    setConfirmDelete(null);
    
    toast({
      title: "Success",
      description: "Video deleted successfully"
    });
  };
  
  const handleAddResource = () => {
    if (!editingVideo || !newResource.title.trim() || !newResource.url.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a title and URL for the resource",
        variant: "destructive"
      });
      return;
    }
    
    const newResourceItem: Resource = {
      id: `resource-${Date.now()}`,
      title: newResource.title,
      type: newResource.type,
      url: newResource.url
    };
    
    const currentResources = editingVideo.resources || [];
    setEditingVideo({
      ...editingVideo,
      resources: [...currentResources, newResourceItem]
    });
    
    setNewResource({ title: "", type: "pdf", url: "" });
    
    toast({
      title: "Success",
      description: "Resource attached to video"
    });
  };
  
  const handleRemoveResource = (resourceId: string) => {
    if (!editingVideo) return;
    
    const updatedResources = (editingVideo.resources || [])
      .filter(resource => resource.id !== resourceId);
      
    setEditingVideo({
      ...editingVideo,
      resources: updatedResources
    });
  };
  
  const handleToggleAssignment = (assignmentId: string) => {
    if (!editingVideo) return;
    
    const currentAssignments = editingVideo.assignedAssignments || [];
    const updatedAssignments = currentAssignments.includes(assignmentId)
      ? currentAssignments.filter(id => id !== assignmentId)
      : [...currentAssignments, assignmentId];
    
    setEditingVideo({
      ...editingVideo,
      assignedAssignments: updatedAssignments
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Course Videos</h2>

      {/* Video List Table */}
      <div className="overflow-hidden rounded-xl border border-border/50">
        <table className="w-full bg-white/70 backdrop-blur-sm">
          <thead>
            <tr className="border-b border-border/50 bg-secondary/30">
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Video Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Module</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden lg:table-cell">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Views</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">Completions</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {videos.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  No videos found for this course. Add some from the modules section.
                </td>
              </tr>
            ) : (
              videos.map((video, index) => (
                <motion.tr 
                  key={video.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="hover:bg-secondary/40"
                >
                  <td className="px-4 py-3 text-sm font-medium">
                    <div className="flex items-center">
                      <FileVideo size={16} className="mr-2 text-primary" />
                      {video.title}
                      {video.resources && video.resources.length > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                          {video.resources.length} resources
                        </span>
                      )}
                      {video.assignedAssignments && video.assignedAssignments.length > 0 && (
                        <span className="ml-2 px-1.5 py-0.5 bg-amber-100 text-amber-600 text-xs rounded-full">
                          {video.assignedAssignments.length} assignments
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                    {modules.find(m => m.id === video.moduleId)?.title || "Unknown"}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">
                    {video.duration}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {video.views}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">
                    {video.completions}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground"
                        onClick={() => {
                          setEditingVideo(video);
                          setIsEditingVideo(true);
                          setEditTab("details");
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => setConfirmDelete(video.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Enhanced Edit Video Dialog with Tabs */}
      <Dialog open={isEditingVideo} onOpenChange={setIsEditingVideo}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Video</DialogTitle>
            <DialogDescription>
              Update this video's information, resources, and assignments.
            </DialogDescription>
          </DialogHeader>
          
          {editingVideo && (
            <Tabs value={editTab} onValueChange={setEditTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="details">Video Details</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 py-2 overflow-y-auto max-h-[60vh]">
                <div className="space-y-2">
                  <Label htmlFor="edit-video-title">Video Title</Label>
                  <Input
                    id="edit-video-title"
                    placeholder="Enter video title"
                    value={editingVideo.title}
                    onChange={(e) => setEditingVideo(prev => prev ? { ...prev, title: e.target.value } : null)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-video-duration">Duration</Label>
                    <Input
                      id="edit-video-duration"
                      placeholder="e.g. 25:30"
                      value={editingVideo.duration}
                      onChange={(e) => setEditingVideo(prev => prev ? { ...prev, duration: e.target.value } : null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-video-url">Video URL</Label>
                    <Input
                      id="edit-video-url"
                      placeholder="Enter video URL"
                      value={editingVideo.url}
                      onChange={(e) => setEditingVideo(prev => prev ? { ...prev, url: e.target.value } : null)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-video-module">Module</Label>
                  <Select 
                    value={editingVideo.moduleId}
                    onValueChange={(value) => setEditingVideo(prev => prev ? { ...prev, moduleId: value } : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a module" />
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map(module => (
                        <SelectItem key={module.id} value={module.id}>
                          {module.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-video-description">Description</Label>
                  <Textarea
                    id="edit-video-description"
                    placeholder="Enter video description"
                    value={editingVideo.description}
                    onChange={(e) => setEditingVideo(prev => prev ? { ...prev, description: e.target.value } : null)}
                    className="min-h-[100px]"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="resources" className="space-y-4 py-2 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4 border border-border/50 rounded-lg p-4">
                  <h4 className="font-medium">Add New Resource</h4>
                  <div className="space-y-2">
                    <Label htmlFor="resource-title">Resource Title</Label>
                    <Input 
                      id="resource-title" 
                      placeholder="Enter resource title" 
                      value={newResource.title}
                      onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-type">Resource Type</Label>
                    <Select
                      value={newResource.type}
                      onValueChange={(value: "pdf" | "link" | "other") => setNewResource(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger id="resource-type">
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="link">External Link</SelectItem>
                        <SelectItem value="other">Other Resource</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="resource-url">Resource URL</Label>
                    <Input 
                      id="resource-url" 
                      placeholder="Enter resource URL or link" 
                      value={newResource.url}
                      onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                    />
                  </div>
                  <Button 
                    onClick={handleAddResource}
                    className="w-full"
                  >
                    <Plus size={16} className="mr-2" />
                    Add Resource
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Attached Resources</h4>
                  {(editingVideo.resources?.length || 0) === 0 ? (
                    <p className="text-muted-foreground text-sm py-2">No resources attached to this video yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {editingVideo.resources?.map(resource => (
                        <div 
                          key={resource.id} 
                          className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
                        >
                          <div className="flex items-center">
                            {resource.type === "pdf" ? (
                              <BookOpen size={16} className="mr-2 text-rose-600" />
                            ) : resource.type === "link" ? (
                              <Link size={16} className="mr-2 text-blue-600" />
                            ) : (
                              <FileVideo size={16} className="mr-2 text-amber-600" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{resource.title}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[300px]">{resource.url}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 text-destructive p-0"
                            onClick={() => handleRemoveResource(resource.id)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="assignments" className="space-y-4 py-2 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  <h4 className="font-medium">Attach Assignments</h4>
                  <p className="text-sm text-muted-foreground">
                    Select assignments to associate with this video. Students will be required to complete these assignments after watching.
                  </p>
                  
                  <div className="space-y-2">
                    {availableAssignments.map(assignment => (
                      <div key={assignment.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`assignment-${assignment.id}`}
                          checked={(editingVideo.assignedAssignments || []).includes(assignment.id)}
                          onCheckedChange={() => handleToggleAssignment(assignment.id)}
                        />
                        <label
                          htmlFor={`assignment-${assignment.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {assignment.title}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsEditingVideo(false)}>Cancel</Button>
            <Button onClick={handleEditVideo}>
              <Check size={16} className="mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this video? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={() => confirmDelete && handleDeleteVideo(confirmDelete)}
            >
              <Trash2 size={16} className="mr-2" />
              Delete Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseVideoManagement;
