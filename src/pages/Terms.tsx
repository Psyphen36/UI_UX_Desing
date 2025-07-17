
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container py-16 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-primary glow-effect">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>By accessing and using ChatBot Hub, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </CardContent>
        </Card>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>2. Use License</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>Permission is granted to temporarily use ChatBot Hub for personal and commercial purposes. This is the grant of a license, not a transfer of title.</p>
          </CardContent>
        </Card>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>3. Service Availability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. Scheduled maintenance will be announced in advance.</p>
          </CardContent>
        </Card>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>4. User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>Users are responsible for maintaining the confidentiality of their account information and for all activities under their account.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
