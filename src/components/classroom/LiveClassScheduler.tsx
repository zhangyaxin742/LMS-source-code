
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { CalendarIcon, Clock, Users, Video, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface LiveClassSchedulerProps {
  classroomId: string;
  classroomName: string;
  students: Student[];
}

const timeSlots = [
  "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"
];

const LiveClassScheduler: React.FC<LiveClassSchedulerProps> = ({
  classroomId,
  classroomName,
  students
}) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    meetingLink: "",
    sendReminders: true,
    selectAllStudents: false,
    selectedStudents: [] as string[]
  });
  
  // Scheduled classes (mock data)
  const [scheduledClasses, setScheduledClasses] = useState([
    {
      id: "class1",
      title: "Introduction to Newton's Laws",
      date: new Date(2023, 9, 17), // October 17, 2023
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      students: 28
    },
    {
      id: "class2",
      title: "Force and Motion Problem Solving",
      date: new Date(2023, 9, 24), // October 24, 2023
      startTime: "01:00 PM",
      endTime: "02:30 PM",
      students: 32
    }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectAllStudents = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectAllStudents: checked,
      selectedStudents: checked ? students.map(s => s.id) : []
    }));
  };
  
  const handleStudentSelection = (studentId: string, checked: boolean) => {
    setFormData(prev => {
      let newSelectedStudents;
      if (checked) {
        newSelectedStudents = [...prev.selectedStudents, studentId];
      } else {
        newSelectedStudents = prev.selectedStudents.filter(id => id !== studentId);
      }
      
      return {
        ...prev,
        selectedStudents: newSelectedStudents,
        selectAllStudents: newSelectedStudents.length === students.length
      };
    });
  };
  
  const handleScheduleClass = () => {
    if (!date || !formData.title || !formData.startTime || !formData.endTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const newClass = {
      id: `class${Date.now()}`,
      title: formData.title,
      date: date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      students: formData.selectAllStudents ? students.length : formData.selectedStudents.length
    };
    
    setScheduledClasses(prev => [...prev, newClass]);
    
    toast({
      title: "Live Class Scheduled",
      description: `"${formData.title}" has been scheduled for ${format(date, "PPP")}.`
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      meetingLink: "",
      sendReminders: true,
      selectAllStudents: false,
      selectedStudents: []
    });
    setDate(undefined);
    setIsDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Live Classes for {classroomName}</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus size={16} className="mr-2" />
          Schedule New Class
        </Button>
      </div>
      
      <div className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="bg-white rounded-xl border shadow-sm p-4">
            <h3 className="text-sm font-medium mb-4">Class Calendar</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </div>
        
        <div className="md:col-span-7 lg:col-span-8 space-y-4">
          <h3 className="text-sm font-medium">Upcoming Classes</h3>
          
          {scheduledClasses.length === 0 ? (
            <div className="bg-secondary/30 rounded-xl p-8 text-center">
              <p className="text-muted-foreground">No classes scheduled yet.</p>
              <Button className="mt-4" onClick={() => setIsDialogOpen(true)}>
                Schedule Your First Class
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {scheduledClasses.map((classItem) => (
                <div 
                  key={classItem.id}
                  className="bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <h4 className="font-medium">{classItem.title}</h4>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarIcon size={14} className="mr-1" />
                          {format(classItem.date, "PPP")}
                        </div>
                        <div className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {classItem.startTime} - {classItem.endTime}
                        </div>
                        <div className="flex items-center">
                          <Users size={14} className="mr-1" />
                          {classItem.students} Students
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">
                        <Video size={14} className="mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule New Live Class</DialogTitle>
            <DialogDescription>
              Create a new live class session for {classroomName}.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Class Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter class title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Select 
                    value={formData.startTime}
                    onValueChange={(value) => handleSelectChange("startTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Select 
                    value={formData.endTime}
                    onValueChange={(value) => handleSelectChange("endTime", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter class description"
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[80px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link (Optional)</Label>
              <Input
                id="meetingLink"
                name="meetingLink"
                placeholder="Enter meeting URL"
                value={formData.meetingLink}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="students" className="text-base">Students</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="selectAll" 
                    checked={formData.selectAllStudents}
                    onCheckedChange={(checked) => handleSelectAllStudents(checked as boolean)} 
                  />
                  <label
                    htmlFor="selectAll"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Select All
                  </label>
                </div>
              </div>
              
              <div className="max-h-[200px] overflow-y-auto space-y-2 border rounded-md p-2">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`student-${student.id}`} 
                      checked={formData.selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                    />
                    <label
                      htmlFor={`student-${student.id}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {student.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="sendReminders" 
                checked={formData.sendReminders}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendReminders: checked as boolean }))}
              />
              <label
                htmlFor="sendReminders"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Send reminders to students 1 hour before class
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleScheduleClass}>Schedule Class</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveClassScheduler;
