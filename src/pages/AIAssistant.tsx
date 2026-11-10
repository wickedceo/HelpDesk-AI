import { useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  Copy,
  MessageSquare,
  RefreshCw,
  Check,
} from "lucide-react";

const suggestions = [
  "Write a professional response to a customer.",
  "Summarise a support ticket.",
  "Suggest troubleshooting steps.",
];

function createResponse(prompt: string): string {
  const request = prompt.toLowerCase();

  if (
    request.includes("summaris") ||
    request.includes("summariz") ||
    request.includes("ticket")
  ) {
    return `SUPPORT TICKET SUMMARY

Issue overview:
The customer has reported a support issue that requires investigation and resolution.

Recommended priority:
Assess the impact on the customer and determine whether the issue affects a single user or multiple users.

Suggested next steps:
1. Review the customer's original message.
2. Identify the affected product or service.
3. Check for similar reported issues.
4. Document the investigation.
5. Update the customer with the outcome.

Note: This is a demonstration summary. Add the actual ticket details for an accurate summary.`;
  }

  if (
    request.includes("troubleshoot") ||
    request.includes("fix") ||
    request.includes("technical") ||
    request.includes("error")
  ) {
    return `TROUBLESHOOTING PLAN

Start with these steps:

1. Reproduce the issue to understand when it occurs.
2. Check the relevant account, device or service settings.
3. Review recent changes that could have caused the problem.
4. Check system status and available error logs.
5. Test a suitable solution in a controlled way.
6. Confirm that the issue is resolved before closing the ticket.

CUSTOMER COMMUNICATION

Keep the customer informed throughout the investigation. If the issue remains unresolved, escalate it to the appropriate technical team.

Note: These are general troubleshooting suggestions. The exact steps depend on the reported issue.`;
  }

  if (
    request.includes("response") ||
    request.includes("reply") ||
    request.includes("customer") ||
    request.includes("email")
  ) {
    return `CUSTOMER SUPPORT RESPONSE

Hello,

Thank you for getting in touch with our support team.

We understand your concern and sincerely apologise for any inconvenience this may have caused.

Our team is looking into the matter and will work to find the most appropriate solution. We will keep you updated as soon as we have more information.

Thank you for your patience and for giving us the opportunity to assist you.

Kind regards,
Customer Support Team

CUSTOMISATION TIP

Add the customer's name, the specific issue and any confirmed resolution details before sending.`;
  }

  return `SUPPORT ASSISTANT SUGGESTION

Based on your request:

${prompt.trim()}

Recommended approach:

1. Identify the main issue or objective.
2. Gather the relevant customer and ticket information.
3. Determine the most appropriate action.
4. Communicate the next steps clearly.
5. Follow up to confirm the outcome.

This is a rule-based demonstration response, not a live AI-generated analysis. Add more context to receive a more relevant suggestion.`;
}

export default function AIAssistant() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function generateResponse() {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse("");
    setCopied(false);

    window.setTimeout(() => {
      setResponse(createResponse(prompt));
      setLoading(false);
    }, 700);
  }

  async function copyResponse() {
    if (!response) return;

    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function resetAssistant() {
    setPrompt("");
    setResponse("");
    setCopied(false);
  }

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <h2>AI Assistant</h2>
          <p>Your support writing and productivity assistant.</p>
        </div>

        <span className="ai-status">
          <span className="status-dot" />
          Demo mode
        </span>
      </div>

      <div className="ai-workspace">
        <div className="ai-welcome">
          <div className="ai-icon-large">
            <Sparkles size={27} />
          </div>

          <h2>How can I help you today?</h2>

          <p>
            Draft customer replies, summarise support tickets and explore
            troubleshooting ideas.
          </p>
        </div>

        <div className="suggestion-grid">
          {suggestions.map((suggestion) => (
            <button
              className="suggestion-card"
              key={suggestion}
              onClick={() => {
                setPrompt(suggestion);
                setResponse("");
              }}
            >
              <MessageSquare size={18} />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>

        <div className="ai-input-area">
          <textarea
            placeholder="Ask the assistant something..."
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                generateResponse();
              }
            }}
            rows={4}
          />

          <div className="ai-input-footer">
            <span>Press Ctrl/⌘ + Enter to generate.</span>

            <button
              className="primary-button"
              onClick={generateResponse}
              disabled={loading || !prompt.trim()}
            >
              {loading ? (
                <RefreshCw size={16} className="spin" />
              ) : (
                <Send size={16} />
              )}
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        </div>

        {response && (
          <div className="ai-response">
            <div className="ai-response-header">
              <div>
                <Bot size={19} />
                <strong>Suggested response</strong>
              </div>

              <button
                className="icon-button"
                title={copied ? "Copied" : "Copy response"}
                onClick={() => void copyResponse()}
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>

            <p>{response}</p>

            <button className="dropdown-action" onClick={resetAssistant}>
              Start a new request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
