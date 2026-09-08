const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

exports.chatWithAgent = async (req, res) => {
  const { message, mode } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (!genAI || !process.env.GEMINI_API_KEY) {
      // High-quality intelligent rule-based response fallback
      const q = message.toLowerCase();
      let response = '';

      if (q.includes('dsa') || q.includes('tree') || q.includes('graph') || q.includes('dynamic programming')) {
        response = `### 🎯 High-Frequency Algorithmic Strategy\n\nFor Tier-1 product interviews at Google/Amazon, focus on **Sliding Window**, **Binary Search on Monotonic Predicates**, and **Graph Topological Sort (Kahn's algorithm)**. Ensure you always analyze Big-O Time & Space complexity before writing code.`;
      } else if (q.includes('hr') || q.includes('weakness') || q.includes('why should we hire you')) {
        response = `### 🏆 STAR Behavioral Framing\n\nStructure your response with: **Situation (20%)**, **Task (10%)**, **Action (50%)**, and **Result (20% with quantitative metrics)**. State concrete results like: *"Improved API p99 latency by 32% and cut server AWS bills by $1,400/mo."*`;
      } else if (q.includes('scam') || q.includes('telegram') || q.includes('fee') || q.includes('deposit')) {
        response = `### 🛡️ PlaceGuard Threat Advisory\n\n**Warning:** Legitimate campus recruitment drives (TCS, Amazon, Google, Infosys) never charge registration fees or laptop deposits. Any recruiter operating exclusively on Telegram or asking for certificate custody is an illegal fraud.`;
      } else {
        response = `### 🚀 PlaceGuard AI Placement Advisor\n\nTo maximize your campus selection rate: 1) Maintain an **ATS Resume score above 85%**; 2) Practice daily on our **AI Mock Interview Simulator**; 3) Check our **Drive Radar** for upcoming OA deadlines. How else can I assist your placement preparation?`;
      }

      return res.status(200).json({
        success: true,
        response,
        source: 'placeguard-local-engine'
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      You are Place Gaurd AI, an elite campus placement mentor and career security advisor for engineering students.
      The student asks: "${message}"
      
      Respond with structured, actionable advice in GitHub-flavored markdown. Highlight technical accuracy, STAR frameworks, or scam awareness where appropriate.
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    res.status(200).json({
      success: true,
      response: text,
      source: 'gemini-ai'
    });
  } catch (error) {
    console.error("PlaceGuard AI Mentor Error:", error);
    res.status(200).json({
      success: true,
      response: `### 🚀 PlaceGuard Placement Advisor\n\nI recommend reviewing your **Resume ATS score** and practicing a **Mock Technical Round**. Focus on high-frequency DSA patterns and clear STAR communication!`,
      source: 'fallback'
    });
  }
};
