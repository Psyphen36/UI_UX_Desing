
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container py-16 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-primary glow-effect">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gradient">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </div>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
          </CardContent>
        </Card>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
          </CardContent>
        </Card>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </CardContent>
        </Card>

        <Card className="card-hover max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@chatbothub.com</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
