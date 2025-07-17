// hooks/useBots.ts
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const useBots = () => {
  const [bots, setBots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchBots = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bots`, {
        credentials: "include",
      });
      const data = await res.json();
      setBots(Array.isArray(data) ? data : []);
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to fetch bots.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return { bots, loading, fetchBots };
};
