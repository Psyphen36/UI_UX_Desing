import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import api from "@/api/axios";
import { Loader } from "lucide-react";

// Dummy fallback data
const dummyEngines = {
  shapes: {
    id: "shapes",
    name: "Shape Engine",
    notes: "Great for basic Q&A tasks and creative writing.",
    features: ["Fast inference", "Supports images", "Lightweight model"],
  },
  gptx: {
    id: "gptx",
    name: "GPT-X Engine",
    notes: "Advanced reasoning and conversation flow.",
    features: ["Handles long contexts", "Advanced dialog", "Multilingual"],
  },
};

const dummyConfig = {
  command_prefix: "!",
  persona_mode: false,
  typing_indicator: true,
  allow_web_access: false,
  allow_images: true,
  allow_voice: false,
  allow_status_controls: true,
  default_status_mode: "online",
  allow_ai2ai: false,
  allow_channel_toggle: false,
  response_mode: "ALL_MESSAGES",
  max_response_length: 500,
  engine: "shapes",
};

export default function BotConfig() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [engines, setEngines] = useState<Record<string, any>>(dummyEngines);
  const [selectedEngine, setSelectedEngine] = useState<string>("shapes");
  const [config, setConfig] = useState(dummyConfig);

  useEffect(() => {
    const fetchEngines = async () => {
      try {
        const res = await api.get("/api/engines");
        const data = res.data.engines || {};
        if (Object.keys(data).length > 0) {
          setEngines(data);
          const engineFromConfig = config.engine || "shapes";
          setSelectedEngine(engineFromConfig);
        }
      } catch (err) {
        console.warn("Using dummy engines due to fetch error:", err);
        toast({ title: "⚠️ Failed to load engines, using fallback", variant: "default" });
        setEngines(dummyEngines);
        setSelectedEngine(dummyConfig.engine);
      }
    };
    fetchEngines();
  }, [config.engine]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/api/bots/${id}/config`);
        if (res.data) {
          setConfig(prev => ({ ...prev, ...res.data }));
        }
      } catch (err) {
        console.warn("Using dummy bot config due to fetch error:", err);
        toast({ title: "⚠️ Failed to load config, using fallback", variant: "default" });
        setConfig(dummyConfig);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const save = async () => {
    setSaving(true);
    try {
      await api.put(`/api/bots/${id}/config`, { settings: config });
      toast({ title: "✅ Config saved!" });
    } catch {
      toast({ title: "❌ Failed to save config", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex items-center gap-2">
        <Loader className="animate-spin" /> Loading config...
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>🤖 Bot Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Command Prefix</label>
            <Input
              value={config.command_prefix}
              onChange={(e) => setConfig({ ...config, command_prefix: e.target.value })}
              maxLength={3}
              className="w-24"
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Enable Persona Mode</span>
            <Switch
              checked={config.persona_mode}
              onCheckedChange={(v) => setConfig({ ...config, persona_mode: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Typing Indicator</span>
            <Switch
              checked={config.typing_indicator}
              onCheckedChange={(v) => setConfig({ ...config, typing_indicator: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Enable AI2AI Chat</span>
            <Switch
              checked={config.allow_ai2ai ?? false}
              onCheckedChange={(v) => setConfig({ ...config, allow_ai2ai: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Allow Channel Toggle</span>
            <Switch
              checked={config.allow_channel_toggle ?? false}
              onCheckedChange={(v) => setConfig({ ...config, allow_channel_toggle: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Enable Web Access</span>
            <Switch
              checked={config.allow_web_access}
              onCheckedChange={(v) => setConfig({ ...config, allow_web_access: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Enable Image Responses</span>
            <Switch
              checked={config.allow_images}
              onCheckedChange={(v) => setConfig({ ...config, allow_images: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Enable Voice Responses</span>
            <Switch
              checked={config.allow_voice}
              onCheckedChange={(v) => setConfig({ ...config, allow_voice: v })}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>Allow Status Controls</span>
            <Switch
              checked={config.allow_status_controls}
              onCheckedChange={(v) => setConfig({ ...config, allow_status_controls: v })}
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col space-y-2 flex-1">
              <label className="font-semibold">AI Engine</label>
              <select
                value={selectedEngine}
                onChange={(e) => {
                  const engine = e.target.value;
                  setSelectedEngine(engine);
                  setConfig({ ...config, engine });
                }}
                className="border rounded bg-background px-2 py-1"
              >
                {Object.values(engines).map((engine: any) => (
                  <option key={engine.id} value={engine.id}>
                    {engine.name}
                  </option>
                ))}
              </select>

              {engines[selectedEngine] && (
                <div className="border rounded bg-muted p-3 text-sm">
                  <p className="font-semibold mb-1">✨ {engines[selectedEngine].name}</p>
                  <p className="mb-1 text-muted-foreground">{engines[selectedEngine].notes}</p>
                  <ul className="list-disc list-inside text-muted-foreground text-xs space-y-1 mt-2">
                    {engines[selectedEngine].features.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-semibold">Response Mode</label>
              <select
                value={config.response_mode}
                onChange={(e) => setConfig({ ...config, response_mode: e.target.value })}
                className="border rounded bg-background px-2 py-1"
              >
                <option value="ALL_MESSAGES">All Messages</option>
                <option value="COMMAND_ONLY">Commands Only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Max Response Length</label>
            <Input
              type="number"
              value={config.max_response_length}
              onChange={(e) =>
                setConfig({ ...config, max_response_length: parseInt(e.target.value) })
              }
              min={100}
              max={4000}
              className="w-32"
            />
          </div>

          <Button onClick={save} disabled={saving}>
            {saving ? "Saving..." : "Save Config"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
