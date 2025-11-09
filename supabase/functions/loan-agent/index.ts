import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userMessage } = await req.json();
    console.log("Processing loan application:", userMessage);

    // Mock responses for each agent
    const masterMessage = "Master Agent: I'll coordinate your loan application process. Let me engage the verification team.";
    
    const verificationMessage = "Verification Agent: KYC documents validated successfully. Identity confirmed with 98% confidence. Proceeding to credit assessment.";
    
    const underwritingMessage = "Underwriting Agent: Credit score verified at 720. Income-to-debt ratio is healthy. Approved for requested loan amount with 9.5% interest rate.";
    
    const sanctionMessage = "Sanction Agent: Congratulations! Your loan has been sanctioned. Generating your sanction letter now. You can view it in the dashboard.";

    // Simulate processing delays
    await new Promise(resolve => setTimeout(resolve, 1000));

    return new Response(
      JSON.stringify({
        success: true,
        stages: {
          master: masterMessage,
          verification: verificationMessage,
          underwriting: underwritingMessage,
          sanction: sanctionMessage,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in loan-agent function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
