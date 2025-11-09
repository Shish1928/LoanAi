import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Bot, User, CheckCircle2, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

type Message = {
  role: "user" | "assistant" | "system";
  content: string;
  agent?: string;
};

type AgentStatus = "idle" | "processing" | "complete" | "error";

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentStatuses, setAgentStatuses] = useState({
    master: "idle" as AgentStatus,
    verification: "idle" as AgentStatus,
    underwriting: "idle" as AgentStatus,
    sanction: "idle" as AgentStatus,
  });

  const simulateAgentFlow = async (userMessage: string) => {
    setIsProcessing(true);

    // Master Agent
    setAgentStatuses((prev) => ({ ...prev, master: "processing" }));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Master Agent: I'll coordinate your loan application process. Let me engage the verification team.",
        agent: "Master Agent",
      },
    ]);
    setAgentStatuses((prev) => ({ ...prev, master: "complete" }));

    // Verification Agent
    setAgentStatuses((prev) => ({ ...prev, verification: "processing" }));
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Verification Agent: KYC documents validated successfully. Identity confirmed with 98% confidence. Proceeding to credit assessment.",
        agent: "Verification Agent",
      },
    ]);
    setAgentStatuses((prev) => ({ ...prev, verification: "complete" }));

    // Underwriting Agent
    setAgentStatuses((prev) => ({ ...prev, underwriting: "processing" }));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Underwriting Agent: Credit score verified at 720. Income-to-debt ratio is healthy. Approved for requested loan amount with 9.5% interest rate.",
        agent: "Underwriting Agent",
      },
    ]);
    setAgentStatuses((prev) => ({ ...prev, underwriting: "complete" }));

    // Sanction Agent
    setAgentStatuses((prev) => ({ ...prev, sanction: "processing" }));
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: "Sanction Agent: Congratulations! Your loan has been sanctioned. Generating your sanction letter now. You can view it in the dashboard.",
        agent: "Sanction Agent",
      },
    ]);
    setAgentStatuses((prev) => ({ ...prev, sanction: "complete" }));

    setIsProcessing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    await simulateAgentFlow(userMessage);
  };

  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case "processing":
        return <Loader2 className="h-4 w-4 animate-spin text-warning" />;
      case "complete":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-muted" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Bot className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl gradient-text">LoanAI Assistant</span>
          </Link>
          <div className="flex gap-2 items-center">
            <ThemeToggle />
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Agent Status Bar */}
        <Card className="glass-card p-6 mb-6">
          <h2 className="text-sm font-semibold mb-4 text-muted-foreground">AI Agent Pipeline</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "master", label: "Master Agent" },
              { key: "verification", label: "Verification" },
              { key: "underwriting", label: "Underwriting" },
              { key: "sanction", label: "Sanction" },
            ].map((agent) => (
              <div key={agent.key} className="flex items-center gap-2">
                {getStatusIcon(agentStatuses[agent.key as keyof typeof agentStatuses])}
                <span className="text-sm font-medium">{agent.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="glass-card p-6 min-h-[500px] max-h-[600px] overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Bot className="h-16 w-16 text-primary/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Start Your Loan Application</h3>
              <p className="text-muted-foreground max-w-md">
                Tell me about the loan you're looking for. Include your name, loan type, and amount.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.role === "assistant" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card border border-border"
                    }`}
                  >
                    {message.agent && (
                      <div className="text-xs font-semibold text-primary mb-1">{message.agent}</div>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  {message.role === "user" && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {isProcessing && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                      <Loader2 className="h-5 w-5 text-white animate-spin" />
                    </div>
                  </div>
                  <div className="bg-card border border-border rounded-2xl px-4 py-3">
                    <p className="text-sm text-muted-foreground">Processing...</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g., I'm John Doe, need a personal loan of ₹500,000"
            disabled={isProcessing}
            className="flex-1"
          />
          <Button type="submit" disabled={isProcessing || !input.trim()}>
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;