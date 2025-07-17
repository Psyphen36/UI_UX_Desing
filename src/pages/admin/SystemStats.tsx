import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Server, Database, Cpu, HardDrive, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

const dummyStats = [
  { title: "CPU Usage", value: "23.5%", icon: "Cpu", color: "text-red-500" },
  { title: "Memory RSS", value: "512 MB", icon: "HardDrive", color: "text-blue-500" },
  { title: "Memory VMS", value: "1024 MB", icon: "HardDrive", color: "text-purple-500" },
  { title: "Threads", value: "45", icon: "Wifi", color: "text-green-500" },
];

const dummyServices = [
  { name: "Auth Service", status: "Healthy", uptime: "3d 5h" },
  { name: "Database Service", status: "Degraded", uptime: "6d 22h" },
  { name: "API Gateway", status: "Healthy", uptime: "1d 12h" },
];

const SystemStats = () => {
  const [stats, setStats] = useState<any[] | null>(null);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/system-stats`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch system stats");
        }

        const data = await res.json();

        const statCards = [
          { title: "CPU Usage", value: `${data.stats.cpu.toFixed(1)}%`, icon: "Cpu", color: "text-red-500" },
          { title: "Memory RSS", value: `${data.stats.memory_rss} MB`, icon: "HardDrive", color: "text-blue-500" },
          { title: "Memory VMS", value: `${data.stats.memory_vms} MB`, icon: "HardDrive", color: "text-purple-500" },
          { title: "Threads", value: `${data.stats.threads}`, icon: "Wifi", color: "text-green-500" },
        ];

        setStats(statCards);
        setServices(data.services);
      } catch (error) {
        console.warn("Using dummy system stats due to fetch error:", error);
        setStats(dummyStats);
        setServices(dummyServices);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="p-4 text-sm">Loading system stats...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center">
          <BarChart3 className="h-8 w-8 mr-3 text-primary" />
          System Statistics
        </h1>
        <p className="text-muted-foreground">Monitor system performance and health</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon === "Cpu" ? Cpu : stat.icon === "HardDrive" ? HardDrive : stat.icon === "Wifi" ? Wifi : Server;
            return (
              <Card key={index} className="card-hover">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2 mt-6">
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Service Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="font-medium">{service.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{service.uptime}</span>
                      <div
                        className={`h-2 w-2 rounded-full ${
                          service.status === "Healthy" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemStats;
