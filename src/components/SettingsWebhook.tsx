// src/components/SettingsWebhook.tsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsWebhook() {
  const [webhook, setWebhook] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Optional: prefill if you expose GET /api/me or similar
    // axios.get("/api/me").then((res) => setWebhook(res.data.webhook_url));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("url", webhook);

    try {
      const res = await axios.put("/api/user/webhook", form, {
        withCredentials: true,
      });
      setMessage("✅ Webhook saved!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to save webhook");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Webhook Notifications</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="url"
          value={webhook}
          onChange={(e) => setWebhook(e.target.value)}
          placeholder="https://discord.com/api/webhooks/..."
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Webhook
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}
