import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Search, UserX, UserCheck, Users as UsersIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserManagementModal from "@/components/admin/UserManagementModal";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "student",
    status: "active",
    program: "UI/UX Design",
    joined: "2023-06-15"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "tutor",
    status: "active",
    program: "Software Development",
    joined: "2023-05-20"
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    role: "student",
    status: "suspended",
    program: "Data Science",
    joined: "2023-07-10"
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "admin",
    status: "active",
    program: "All Programs",
    joined: "2023-04-05"
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    role: "tutor",
    status: "pending",
    program: "Digital Marketing",
    joined: "2023-08-01"
  }
];

const AdminUsers = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(u => u.id !== userId));

    toast({
      title: "User deleted",
      description: `${user?.name} has been removed from the system.`,
    });
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus } 
        : user
    ));

    const user = users.find(u => u.id === userId);
    
    toast({
      title: `User ${newStatus}`,
      description: `${user?.name}'s status has been updated to ${newStatus}.`,
    });
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setModalOpen(true);
  };

  const handleEditUser = (user: any) => {
    setCurrentUser(user);
    setModalOpen(true);
  };

  const handleSaveUser = (userData: any) => {
    if (currentUser) {
      // Update existing user
      setUsers(users.map(user =>
        user.id === currentUser.id ? { ...user, ...userData } : user
      ));

      toast({
        title: "User updated",
        description: `${userData.name} has been updated.`,
      });
    } else {
      // Add new user
      const newUser = {
        id: (users.length + 1).toString(),
        ...userData,
        status: "active",
        joined: new Date().toISOString().split('T')[0]
      };

      setUsers([...users, newUser]);

      toast({
        title: "User added",
        description: `${userData.name} has been added as a ${userData.role}.`,
      });
    }

    setModalOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      case "suspended":
        return <Badge variant="destructive">{status}</Badge>;
      case "pending":
        return <Badge variant="outline" className="text-amber-500 border-amber-500">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500 hover:bg-purple-600">{role}</Badge>;
      case "tutor":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{role}</Badge>;
      case "student":
        return <Badge variant="secondary">{role}</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles and permissions</p>
        </div>
        <Button onClick={handleAddUser} className="flex items-center gap-2">
          <PlusCircle size={16} />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View and manage all system users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              </div>
            </div>
            <div className="w-[150px]">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="tutor">Tutor</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-[150px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Program</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.program}</TableCell>
                      <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                            <Edit size={16} className="text-muted-foreground" />
                          </Button>
                          {user.status === "active" ? (
                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(user.id, "suspended")}>
                              <UserX size={16} className="text-red-500" />
                            </Button>
                          ) : (
                            <Button variant="ghost" size="icon" onClick={() => handleStatusChange(user.id, "active")}>
                              <UserCheck size={16} className="text-green-500" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteUser(user.id)}>
                            <Trash2 size={16} className="text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12 border rounded-md">
              <div className="flex justify-center items-center mb-3">
                <UsersIcon size={48} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No users found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <UserManagementModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveUser}
        user={currentUser}
      />
    </div>
  );
};

export default AdminUsers;
