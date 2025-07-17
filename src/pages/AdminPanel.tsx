
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Bot, BarChart3, AlertTriangle, TrendingUp, Database, Shield, Activity } from "lucide-react";

const AdminPanel = () => {
  const adminStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+18% this month",
      icon: <Users className="h-4 w-4" />,
      color: "text-blue-600"
    },
    {
      title: "Active Bots",
      value: "45,293",
      change: "+12% this month",
      icon: <Bot className="h-4 w-4" />,
      color: "text-green-600"
    },
    {
      title: "Total Messages",
      value: "2.4M",
      change: "+31% this month",
      icon: <BarChart3 className="h-4 w-4" />,
      color: "text-purple-600"
    },
    {
      title: "System Load",
      value: "67%",
      change: "-5% from last hour",
      icon: <Activity className="h-4 w-4" />,
      color: "text-orange-600"
    }
  ];

  const recentUsers = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", plan: "Pro", status: "active", joined: "2024-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", plan: "Free", status: "active", joined: "2024-01-14" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", plan: "Enterprise", status: "inactive", joined: "2024-01-13" },
    { id: 4, name: "David Wilson", email: "david@example.com", plan: "Pro", status: "active", joined: "2024-01-12" },
  ];

  const systemAlerts = [
    { type: "warning", message: "High memory usage detected on Server 3", time: "5 min ago" },
    { type: "info", message: "Scheduled maintenance completed successfully", time: "2 hours ago" },
    { type: "error", message: "Failed bot deployment for user ID 12847", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Shield className="h-8 w-8 mr-3 text-primary" />
            Admin Panel
          </h1>
          <p className="text-muted-foreground">
            System overview and user management
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Backup Data
          </Button>
          <Button className="btn-gradient">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>
              Latest user registrations and activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={user.status === 'active' ? 'bg-green-500' : ''}
                    >
                      {user.plan}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{user.joined}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Users
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>
              Recent system events and notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    alert.type === 'error' ? 'bg-red-100 text-red-600' :
                    alert.type === 'warning' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card border-0">
        <CardHeader>
          <CardTitle>Quick Admin Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Bot className="h-6 w-6 mb-2" />
              Bot Overview
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              System Reports  
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Database className="h-6 w-6 mb-2" />
              Database Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
