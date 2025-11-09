import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Bot, CheckCircle2, Clock, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const Dashboard = () => {
  const mockLeads = [
    {
      id: "LOAN-001",
      name: "John Doe",
      loanType: "Personal Loan",
      amount: "₹5,00,000",
      status: "sanctioned",
      creditScore: 720,
      interestRate: "9.5%",
      appliedAt: "2025-11-09",
    },
    {
      id: "LOAN-002",
      name: "Jane Smith",
      loanType: "Home Loan",
      amount: "₹25,00,000",
      status: "underwriting",
      creditScore: 785,
      appliedAt: "2025-11-09",
    },
    {
      id: "LOAN-003",
      name: "Rajesh Kumar",
      loanType: "Business Loan",
      amount: "₹10,00,000",
      status: "verification",
      appliedAt: "2025-11-08",
    },
  ];

  const getStatusVariant = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      sanctioned: "default",
      underwriting: "secondary",
      verification: "outline",
    };
    return variants[status] || "outline";
  };

  const getStatusClassName = (status: string) => {
    const classes: Record<string, string> = {
      sanctioned: "bg-success text-success-foreground",
      underwriting: "bg-warning text-warning-foreground",
    };
    return classes[status] || "";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sanctioned":
        return <CheckCircle2 className="h-4 w-4" />;
      case "underwriting":
      case "verification":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl gradient-text">LoanAI Dashboard</span>
          </Link>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Link to="/chat">
              <Button variant="outline">New Application</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold mt-4 mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage loan applications and track agent performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
                <p className="text-3xl font-bold">156</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Sanctioned</p>
                <p className="text-3xl font-bold">124</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-success" />
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Processing</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Avg Time</p>
                <p className="text-3xl font-bold">4.2m</p>
              </div>
              <Bot className="h-8 w-8 text-accent" />
            </div>
          </Card>
        </div>

        {/* Recent Applications */}
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Applications</h2>
          <div className="space-y-4">
            {mockLeads.map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{lead.name}</h3>
                    <Badge 
                      variant={getStatusVariant(lead.status)} 
                      className={getStatusClassName(lead.status)}
                    >
                      <div className="flex items-center gap-1">
                        {getStatusIcon(lead.status)}
                        <span>{lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}</span>
                      </div>
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium text-foreground">ID:</span> {lead.id}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Type:</span> {lead.loanType}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Amount:</span> {lead.amount}
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Applied:</span> {lead.appliedAt}
                    </div>
                  </div>
                  {lead.creditScore && (
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="font-medium text-foreground">Credit Score:</span>{" "}
                        <span className="text-success">{lead.creditScore}</span>
                      </div>
                      {lead.interestRate && (
                        <div>
                          <span className="font-medium text-foreground">Interest Rate:</span>{" "}
                          {lead.interestRate}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {lead.status === "sanctioned" && (
                  <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                    <Download className="h-4 w-4 mr-2" />
                    Sanction Letter
                  </Button>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;