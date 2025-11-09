import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, Sparkles, ShieldCheck, Zap, ArrowRight, CheckCircle2, MessageSquare, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { GridScan } from "@/components/GridScan";
import { ExpandableTabs } from "@/components/ExpandableTabs";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const agents = [
    {
      name: "Master Agent",
      description: "Orchestrates the entire loan workflow",
      icon: Bot,
      color: "text-primary",
    },
    {
      name: "Verification Agent",
      description: "Validates KYC and identity documents",
      icon: ShieldCheck,
      color: "text-accent",
    },
    {
      name: "Underwriting Agent",
      description: "Assesses creditworthiness and risk",
      icon: Sparkles,
      color: "text-warning",
    },
    {
      name: "Sanction Agent",
      description: "Generates instant sanction letters",
      icon: Zap,
      color: "text-success",
    },
  ];

  const features = [
    "Instant KYC verification from CRM",
    "Real-time credit score assessment",
    "Automated loan sanction in minutes",
    "PDF generation for sanction letters",
    "Multi-agent AI orchestration",
    "Complete audit trail",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl gradient-text">LoanAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <ExpandableTabs
              tabs={[
                { title: "Features", icon: Sparkles },
                { title: "AI Agents", icon: Bot },
                { type: "separator" },
                { title: "Dashboard", icon: LayoutDashboard },
                { title: "Get Started", icon: MessageSquare },
              ]}
              onChange={(index) => {
                if (index === 0) window.location.href = "#features";
                if (index === 1) window.location.href = "#agents";
                if (index === 3) window.location.href = "/dashboard";
                if (index === 4) window.location.href = "/chat";
              }}
            />
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="md:hidden">
              <Link to="/chat">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* GridScan Background */}
        <div className="absolute inset-0 z-0">
          <GridScan
            lineThickness={1.2}
            linesColor="#1a1a2e"
            scanColor="#0ea5e9"
            scanOpacity={0.6}
            gridScale={0.12}
            lineStyle="solid"
            scanDirection="pingpong"
            scanDuration={3.0}
            scanDelay={1.5}
            enablePost={true}
            bloomIntensity={0.4}
            noiseIntensity={0.02}
            className="w-full h-full"
          />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-pulse-slow">
              <Sparkles className="h-4 w-4" />
              AI-Powered Loan Processing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              From Application to
              <br />
              <span className="gradient-text">Sanction in Minutes</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the future of NBFC loan processing with our AI multi-agent system. Automated verification,
              instant underwriting, and immediate sanctions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button size="lg" className="group">
                  Start Application
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Agent Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              return (
                <Card
                  key={agent.name}
                  className="glass-card p-4 text-center hover:scale-105 transition-transform animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground">{agent.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Complete Automation</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI agents handle every step of the loan process, from verification to sanction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card p-6 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm font-medium">{feature}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Agent Flow Section */}
      <section id="agents" className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Four specialized AI agents work together to process your loan application instantly
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-accent to-success hidden md:block" />
              
              {agents.map((agent, index) => {
                const Icon = agent.icon;
                return (
                  <div key={agent.name} className="relative mb-8 md:pl-20">
                    <div className="absolute left-0 top-0 hidden md:block">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <Card className="glass-card p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="md:hidden">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold">{agent.name}</h3>
                      </div>
                      <p className="text-muted-foreground">{agent.description}</p>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <Card className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Experience AI-Powered Lending?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your loan application now and see how our AI agents work together to process it in real-time
            </p>
            <Link to="/chat">
              <Button size="lg" className="group">
                Start Your Application
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 LoanAI. AI-Powered Sales Assistant for NBFCs - Tata Capital Problem Statement</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;