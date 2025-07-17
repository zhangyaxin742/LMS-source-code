
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

interface StudentData {
  id: string;
  name: string;
  image: string;
}

interface StudentsTabProps {
  students: StudentData[];
}

const StudentsTab: React.FC<StudentsTabProps> = ({ students }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Classmates</CardTitle>
          <CardDescription>Students enrolled in this classroom</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center gap-3 p-2 rounded-md">
                <Avatar className="h-10 w-10">
                  <img src={student.image} alt={student.name} />
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{student.name}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentsTab;
