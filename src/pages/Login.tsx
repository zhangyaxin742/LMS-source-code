import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { GraduationCap, Bookmark, Shield } from "lucide-react";
type Role = "admin" | "tutor" | "student";
interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}
const RoleCard: React.FC<RoleCardProps> = ({
  role,
  title,
  description,
  icon,
  selected,
  onClick
}) => {
  return <motion.div whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }} onClick={onClick} className={`cursor-pointer relative rounded-xl border-2 overflow-hidden ${selected ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/30"}`}>
      <Card className="bg-transparent border-0 h-full">
        <CardHeader>
          <div className={`p-3 rounded-full w-fit ${selected ? "bg-primary text-primary-foreground" : "bg-secondary/80 text-foreground/80"}`}>
            {icon}
          </div>
          <CardTitle className="text-lg mt-2">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
      {selected && <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary" />}
    </motion.div>;
};
const Login: React.FC = () => {
  const {
    login
  } = useUser();
  const {
    toast
  } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast({
        title: "Please select a role",
        description: "You need to select your role to continue.",
        variant: "destructive"
      });
      return;
    }
    if (!email || !password) {
      toast({
        title: "All fields are required",
        description: "Please fill in your email and password.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);

    // Simulate loading
    setTimeout(() => {
      login(email, password, selectedRole);
      setLoading(false);
    }, 800);
  };
  const roleCards = [{
    role: "student" as Role,
    title: "Student",
    description: "Access courses, assignments, and track your progress",
    icon: <GraduationCap size={24} />
  }, {
    role: "tutor" as Role,
    title: "Tutor",
    description: "Manage classrooms, assignments, and student progress",
    icon: <Bookmark size={24} />
  }, {
    role: "admin" as Role,
    title: "Administrator",
    description: "Access all platform features and manage users",
    icon: <Shield size={24} />
  }];
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/30 p-4">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">Welcome to the Learning Platform</h1>
        <p className="text-muted-foreground mt-2">Sign in to continue to your dashboard</p>
      </motion.div>
      
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5,
      delay: 0.1
    }} className="w-full max-w-4xl">
        <Card className="border-border/30 shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Select your role and enter your credentials to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Select your role:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {roleCards.map(card => <RoleCard key={card.role} {...card} selected={selectedRole === card.role} onClick={() => setSelectedRole(card.role)} />)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                </div>
              </div>
              
              <Button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-500 text-neutral-50">
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col text-center border-t pt-6">
            <p className="text-sm text-muted-foreground">
              For demo purposes, you can use any email and password.
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>;
};
export default Login;