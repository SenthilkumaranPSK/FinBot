import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Copy, 
  Check, 
  Code2, 
  MessageSquare, 
  ShieldAlert, 
  DollarSign, 
  Trash2
} from 'lucide-react';
import { generateCoachResponse } from '../services/aiPlacementEngine';

const PROMPT_SUGGESTIONS = [
  { icon: Code2, label: 'High-Frequency DSA Patterns', prompt: 'What are the top 5 algorithmic patterns asked in Amazon & Google coding rounds?' },
  { icon: MessageSquare, label: 'STAR Method HR Answer', prompt: 'How do I answer "Tell me about a time you failed in a technical project" using STAR method?' },
  { icon: ShieldAlert, label: 'Scam Detection Rules', prompt: 'How do I know if an off-campus job offer is genuine or a fake recruiter scam?' },
  { icon: DollarSign, label: 'Salary Negotiation Script', prompt: 'How can I politely ask for a CTC revision or joining bonus increase after receiving an offer?' }
];

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `### 👋 Welcome to PlaceGuard 24/7 AI Placement Mentor!\n\nI am your specialized career advisor trained on thousands of technical interview rounds, ATS screening algorithms, and campus recruitment patterns.\n\n**Ask me anything about:**\n- 💻 DSA problem approaches & complexity optimization\n- 🎯 STAR behavioral & HR response crafting\n- 🛡️ Fake job offer & scam letter verification\n- 💰 Salary negotiation & in-hand CTC breakdowns`,
      time: 'Just now'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend = inputPrompt) => {
    const text = (textToSend || '').trim();
    if (!text) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      const reply = generateCoachResponse(text);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: reply.text,
        time: 'Just now'
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'msg-init',
        sender: 'ai',
        text: 'Chat history cleared. How can I assist your placement preparation today?',
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto flex flex-col h-[calc(100vh-140px)]">
      
      {/* Top Banner */}
      <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-800 shadow-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg">PlaceGuard 24/7 Placement AI Mentor</h1>
            <p className="text-xs text-slate-300">Instant algorithmic hints, HR STAR scripts, and placement strategies</p>
          </div>
        </div>

        <button 
          onClick={clearChat}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
          title="Clear Conversation"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Chat Messages Log Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
              msg.sender === 'user' 
                ? 'bg-slate-800 text-white' 
                : 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-slate-900 text-white rounded-tr-none' 
                : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/60 rounded-tl-none space-y-2'
            }`}>
              <div className="whitespace-pre-wrap font-sans">
                {msg.text}
              </div>

              {msg.sender === 'ai' && (
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="text-[10px] text-slate-400 hover:text-emerald-500 flex items-center gap-1"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3 max-w-lg mr-auto">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 flex items-center gap-1.5">
              <span>AI Mentor is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0">
        {PROMPT_SUGGESTIONS.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(item.prompt)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-300 transition-colors shrink-0"
          >
            <item.icon className="w-3.5 h-3.5 text-emerald-500" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Input Message Form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        className="flex items-center gap-2 p-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md shrink-0"
      >
        <input 
          type="text" 
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask AI Mentor anything about DSA, STAR answers, or scam checks..." 
          className="flex-1 px-4 py-2.5 bg-transparent text-xs sm:text-sm outline-none dark:text-white placeholder:text-slate-400"
        />
        <button 
          type="submit"
          disabled={!inputPrompt.trim()}
          className="p-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}