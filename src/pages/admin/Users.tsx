import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Search, MoreHorizontal, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", plan: "Pro", status: "active", bots: 3, joined: "2024-01-15" },
  { id: 2, name: "Sarah Wilson", email: "sarah@example.com", plan: "Free", status: "active", bots: 1, joined: "2024-01-20" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "Enterprise", status: "inactive", bots: 8, joined: "2024-01-10" },
  { id: 4, name: "ozz", email: "admin@example.com", plan: "Admin", status: "active", bots: 0, joined: "2024-01-01" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.warn("Using dummy users due to fetch error:", error);
        setUsers(dummyUsers);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Users className="h-8 w-8 mr-3 text-primary" />
            User Management
          </h1>
          <p className="text-muted-foreground">Manage all registered users</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-10 w-64" />
        </div>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="card-hover">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    {user.plan === "Admin" ? (
                      <Shield className="h-6 w-6 text-white" />
                    ) : (
                      <User className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.plan === "Admin" && <Shield className="h-4 w-4 text-orange-500" />}
                    </CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={user.status === "active" ? "default" : "secondary"}
                    className={user.status === "active" ? "bg-green-500" : ""}
                  >
                    {user.status}
                  </Badge>
                  <Badge variant="outline">{user.plan}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Bots</p>
                    <p className="font-semibold">{user.bots}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Joined</p>
                    <p className="font-semibold">{user.joined}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Plan</p>
                    <p className="font-semibold">{user.plan}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
