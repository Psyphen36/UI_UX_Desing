import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import api from "@/api/axios";
import Cookies from "js-cookie";
import { Loader2 } from "lucide-react"; // 🌀 spinner icon

interface BotToggleProps {
  botId: number;
  status: string; // "active" or "inactive"
  onStatusChanged: () => void;
}

export default function BotToggle({ botId, status, onStatusChanged }: BotToggleProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [optimisticStatus, setOptimisticStatus] = useState(status);

  const handleToggle = async () => {
    const newStatus = optimisticStatus === "active" ? "inactive" : "active";

    // Show waiting toast
    toast({
      title: newStatus === "active" ? "Activating bot..." : "Stopping bot...",
      description: "Please wait a moment while we update the bot status.",
    });

    // Optimistically update
    setOptimisticStatus(newStatus);
    setIsLoading(true);

    try {
      await api.post(`api/bots/${botId}/toggle`, {}, {
        withCredentials: true,
        headers: {
          "X-CSRF-Token": Cookies.get("csrf_token") || "",
        },
      });

      toast({
        title: "Success!",
        description: `Bot is now ${newStatus}`,
      });

      onStatusChanged();
    } catch (err) {
      setOptimisticStatus(status);
      toast({
        title: "Error",
        description: "Could not update bot status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Switch
        checked={optimisticStatus === "active"}
        disabled={isLoading}
        onCheckedChange={handleToggle}
      />
      {isLoading && (
        <Loader2 className="animate-spin text-muted-foreground h-4 w-4" />
      )}
    </div>
  );
}
