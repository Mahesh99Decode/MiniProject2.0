import { useState } from 'react'
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react'
import { api } from '@/lib/api'

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Namaste Farmer! 👋 I am your AI farming assistant powered by KrishiMitra. How can I help you today with crop selection, soil, or pest control?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const quickPrompts = [
    '🌦️ Weather Advisory',
    '🌱 Best Crop for Rabi',
    '💧 Drip Irrigation Schedule',
    '🦠 Leaf Pest Diagnosis'
  ]

  const handleSend = async (textToSend) => {
    const query = textToSend || input
    if (!query.trim() || loading) return

    const userMsg = { role: 'user', text: query }
    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setLoading(true)

    try {
      const res = await api.chat(query)
      let reply = 'I could not generate an answer right now. Please try again.'
      if (res && res.success && res.reply) {
        reply = res.reply
      } else if (res && res.message) {
        reply = res.message
      }
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Error connecting to Krishi AI service. Please make sure backend is active.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white shadow-lg flex items-center justify-center hover:bg-[var(--color-primary-hover)] transition-all duration-200 hover:scale-105 active:scale-95 group relative"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[var(--color-accent)]"></span>
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-xl flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="px-4 py-3.5 bg-[var(--color-primary)] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">KrishiMitra AI</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online Co-Pilot
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--color-bg)] text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0 text-xs mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[var(--color-primary)] text-white rounded-tr-xs'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-tl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-[var(--color-text-muted)]">
                <div className="w-7 h-7 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0">
                  🤖
                </div>
                <div className="bg-[var(--color-surface)] px-3 py-2 rounded-2xl border border-[var(--color-border)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-[11px] font-medium whitespace-nowrap bg-[var(--color-surface-soft)] text-[var(--color-primary)] px-2.5 py-1 rounded-full border border-[rgba(22,101,52,0.15)] hover:bg-[var(--color-primary)] hover:text-white transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface)] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything in English, Hindi, or Marathi..."
              className="flex-1 px-3 py-2 text-sm bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl focus:outline-none focus:border-[var(--color-primary)]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-40 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
