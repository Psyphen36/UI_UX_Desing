import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Search, Download, AlertTriangle, Info, XCircle } from "lucide-react";

const dummyLogs = [
  {
    id: 1,
    level: "error",
    message: "Failed to connect to the database.",
    service: "auth-service",
    timestamp: "2025-07-17T10:15:00Z",
  },
  {
    id: 2,
    level: "warning",
    message: "High memory usage detected.",
    service: "analytics-service",
    timestamp: "2025-07-17T09:50:00Z",
  },
  {
    id: 3,
    level: "info",
    message: "System started successfully.",
    service: "core-service",
    timestamp: "2025-07-17T09:00:00Z",
  },
];

const SystemLogs = () => {
  const [logs, setLogs] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/logs`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch logs from backend");
        }

        const data = await res.json();
        setLogs(data.logs);
      } catch (error) {
        console.warn("Using dummy logs due to fetch error:", error);
        setLogs(dummyLogs);
      }
    };

    fetchLogs();
  }, []);

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogBadge = (
    level: string
  ): "destructive" | "secondary" | "default" | "outline" => {
    const variants = {
      error: "destructive",
      warning: "secondary",
      info: "default",
    } as const;
    return variants[level as keyof typeof variants] || "default";
  };

  if (!logs) {
    return <div>Loading System Logs...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary" />
            System Logs
          </h1>
          <p className="text-muted-foreground">Monitor system events and errors</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search logs..." className="pl-10 w-64" />
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {logs.map((log) => (
          <Card key={log.id} className="card-hover">
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getLogIcon(log.level)}
                  <p>{log.message}</p>
                </div>
                <Badge variant={getLogBadge(log.level)}>{log.level.toUpperCase()}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {log.service} • {new Date(log.timestamp).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SystemLogs;
