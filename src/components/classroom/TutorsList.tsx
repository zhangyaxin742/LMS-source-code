
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Search, UserPlus, Mail, X } from "lucide-react";
import { Tutor } from "@/types/classroom";
import { useToast } from "@/components/ui/use-toast";

interface TutorsListProps {
  classroomId: string;
  initialTutors?: Tutor[];
}

const TutorsList: React.FC<TutorsListProps> = ({ classroomId, initialTutors }) => {
  const { toast } = useToast();
  const [isAddTutorOpen, setIsAddTutorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - in a real app, this would come from an API
  const [tutors, setTutors] = useState<Tutor[]>(initialTutors || [
    {
      id: "t1",
      name: "Thomas Anderson",
      email: "thomas.anderson@example.com",
      role: "Lead Tutor",
      profileImage: "https://i.pravatar.cc/150?img=33"
    },
    {
      id: "t2",
      name: "Lisa Wong",
      email: "lisa.wong@example.com",
      role: "Assistant Tutor",
      profileImage: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: "t3",
      name: "Michael Rodriguez",
      email: "michael.rodriguez@example.com",
      role: "Subject Expert",
      profileImage: "https://i.pravatar.cc/150?img=12"
    }
  ]);

  const [newTutor, setNewTutor] = useState({
    name: "",
    email: "",
    role: "Assistant Tutor"
  });

  const handleAddTutor = () => {
    if (!newTutor.name || !newTutor.email) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const tutor: Tutor = {
      id: `t${tutors.length + 1}`,
      name: newTutor.name,
      email: newTutor.email,
      role: newTutor.role,
      profileImage: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    setTutors([...tutors, tutor]);
    setNewTutor({ name: "", email: "", role: "Assistant Tutor" });
    setIsAddTutorOpen(false);
    
    toast({
      title: "Tutor added",
      description: `${tutor.name} has been added to the classroom.`
    });
  };

  const handleRemoveTutor = (tutorId: string) => {
    const tutorToRemove = tutors.find(t => t.id === tutorId);
    setTutors(tutors.filter(tutor => tutor.id !== tutorId));
    
    toast({
      title: "Tutor removed",
      description: `${tutorToRemove?.name} has been removed from the classroom.`
    });
  };

  const filteredTutors = tutors.filter(tutor => 
    tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tutor.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Classroom Tutors</CardTitle>
        <Button onClick={() => setIsAddTutorOpen(true)} className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Add Tutor
        </Button>
      </CardHeader>
      <CardContent>
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tutors..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tutor</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTutors.length > 0 ? (
                filteredTutors.map((tutor) => (
                  <TableRow key={tutor.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <img src={tutor.profileImage} alt={tutor.name} />
                        </Avatar>
                        <span className="font-medium">{tutor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{tutor.email}</TableCell>
                    <TableCell>{tutor.role}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleRemoveTutor(tutor.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    {searchTerm ? "No tutors match your search" : "No tutors assigned to this classroom"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add Tutor Dialog */}
      <Dialog open={isAddTutorOpen} onOpenChange={setIsAddTutorOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Tutor to Classroom</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="tutor-name" className="text-sm font-medium">
                Tutor Name
              </label>
              <Input
                id="tutor-name"
                placeholder="Enter tutor name"
                value={newTutor.name}
                onChange={(e) => setNewTutor({ ...newTutor, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="tutor-email" className="text-sm font-medium">
                Email
              </label>
              <div className="flex">
                <div className="relative flex-1">
                  <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="tutor-email"
                    placeholder="email@example.com"
                    className="pl-9"
                    value={newTutor.email}
                    onChange={(e) => setNewTutor({ ...newTutor, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <label htmlFor="tutor-role" className="text-sm font-medium">
                Role
              </label>
              <Select 
                value={newTutor.role} 
                onValueChange={(value) => setNewTutor({ ...newTutor, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead Tutor">Lead Tutor</SelectItem>
                  <SelectItem value="Assistant Tutor">Assistant Tutor</SelectItem>
                  <SelectItem value="Subject Expert">Subject Expert</SelectItem>
                  <SelectItem value="Guest Lecturer">Guest Lecturer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTutorOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTutor}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Tutor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default TutorsList;
