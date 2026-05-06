import React, { useState } from 'react';
import { executeAICommand } from '../../services/aiService';

const formatMessage = (response) => {
  // Agar string hai seedha return karo
  if (typeof response === 'string') return response;

  // Agar success response hai aur data string hai
  if (response?.success && typeof response?.data === 'string') {
    return response.data;
  }

  // Agar data array hai
  if (response?.success && Array.isArray(response?.data)) {
    return response.data
      .map((emp, i) => `${i + 1}. ${emp.name || emp.fullName || JSON.stringify(emp)}`)
      .join('\n');
  }

  // Agar error hai
  if (response?.error) return `Error: ${response.error}`;
  if (response?.message && !response?.success) return `Error: ${response.message}`;

  // Fallback — message field
  if (response?.message) return response.message;

  // Last resort
  return JSON.stringify(response, null, 2);
};

const renderContent = (content) => {
  // Employee list detect karo (numbered list)
  const lines = content.split('\n').filter(Boolean);
  const isNumberedList = lines.some((l) => /^\d+\./.test(l.trim()));

  if (isNumberedList) {
    return (
      <div className="space-y-2">
        {lines.map((line, i) => {
          if (/^\d+\./.test(line.trim())) {
            // Employee line parse karo
            const match = line.match(/^\d+\.\s+(.+?)\s+-\s+(.+?)(?:\s+\((.+)\))?$/);
            if (match) {
              const [, name, email, details] = match;
              return (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                  <p className="font-semibold text-slate-800 text-sm">{name}</p>
                  <p className="text-xs text-slate-500">{email}</p>
                  {details && <p className="text-xs text-slate-400 mt-0.5">{details}</p>}
                </div>
              );
            }
          }
          // Header line (e.g. "Employees List:")
          if (line.endsWith(':')) {
            return <p key={i} className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{line}</p>;
          }
          return <p key={i} className="text-sm text-slate-700">{line}</p>;
        })}
      </div>
    );
  }

  // Plain text
  return <p className="text-sm text-slate-700 whitespace-pre-wrap">{content}</p>;
};

const AIChatbot = ({ onActionSuccess }) => {
  const [prompt, setPrompt] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    const text = prompt.trim();
    if (!text || isSending) return;

    setIsSending(true);
    setMessages((prev) => [...prev, { role: 'user', content: text }]);
    setPrompt('');

    try {
      const response = await executeAICommand(text);
      const formatted = formatMessage(response);
      setMessages((prev) => [...prev, { role: 'assistant', content: formatted }]);
      if (onActionSuccess) onActionSuccess();
    } catch (error) {
      const message = error?.response?.data?.error || 'Failed to execute AI command.';
      setMessages((prev) => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 mt-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4">HR Assistant</h2>
      <div className="h-72 overflow-y-auto bg-slate-50 rounded-lg p-3 border border-slate-200 mb-4 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-slate-500">
            Try: Show all employees, Add employee Rahul salary 50000, Who has highest salary?
          </p>
        ) : (
          messages.map((message, idx) => (
            <div
              key={`${message.role}-${idx}`}
              className={`p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white ml-10'
                  : 'bg-white border border-slate-200 mr-10'
              }`}
            >
              {message.role === 'user' ? (
                <p className="text-sm">{message.content}</p>
              ) : (
                renderContent(message.content)
              )}
            </div>
          ))
        )}
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Type a command..."
          className="flex-1 border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          type="button"
          disabled={isSending}
          onClick={handleSend}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-60"
        >
          {isSending ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;