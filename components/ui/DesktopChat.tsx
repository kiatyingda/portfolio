'use client'

import { useEffect, useState } from 'react'

interface Message {
  id: number
  text: string
  from: 'them' | 'me'
  delay: number
}

const CONTACTS = [
  { id: 1, name: 'Alex Chen', preview: 'hi', time: 'now', active: true },
  { id: 2, name: 'Design Team', preview: 'Looks great!', time: '2m', active: false },
  { id: 3, name: 'Mia Park', preview: 'Can you review?', time: '1h', active: false },
  { id: 4, name: 'Jordan', preview: 'Shipped 🚀', time: '3h', active: false },
]

const MESSAGES: Message[] = [
  { id: 1, text: 'hi', from: 'them', delay: 600 },
  { id: 2, text: 'hey! what\'s up?', from: 'me', delay: 1400 },
  { id: 3, text: 'just saw the new portfolio — it looks really clean', from: 'them', delay: 2600 },
  { id: 4, text: 'appreciate it, still refining a few things', from: 'me', delay: 3800 },
  { id: 5, text: 'the case studies read really well', from: 'them', delay: 5000 },
]

export default function DesktopChat() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    MESSAGES.forEach((msg, i) => {
      // Show typing indicator ~500ms before the message appears
      if (msg.from === 'them') {
        const typingTimer = setTimeout(() => {
          setShowTyping(true)
        }, msg.delay - 500)
        timers.push(typingTimer)
      }

      const msgTimer = setTimeout(() => {
        setShowTyping(false)
        setVisibleCount(i + 1)
      }, msg.delay)
      timers.push(msgTimer)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className="w-full max-w-[520px] rounded-card-lg overflow-hidden border border-th-border"
      style={{ boxShadow: 'rgba(255,255,255,0.06) 0px 8px 40px 0px' }}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 bg-th-bg3 border-b border-th-border">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="flex-1 text-center font-sans text-[11px] text-th-text3 select-none">
          Messages
        </span>
      </div>

      <div className="flex h-[320px]">
        {/* Sidebar */}
        <div className="w-[160px] flex-shrink-0 bg-th-bg2 border-r border-th-border overflow-hidden">
          <div className="px-3 pt-3 pb-2">
            <div className="w-full rounded-pill bg-th-bg4 px-3 py-1.5 font-sans text-[11px] text-th-text3">
              Search
            </div>
          </div>
          <ul className="mt-1">
            {CONTACTS.map((c) => (
              <li
                key={c.id}
                className={`flex items-center gap-2.5 px-3 py-2 cursor-default ${
                  c.active ? 'bg-th-bg4' : 'hover:bg-th-bg3'
                }`}
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-th-bg4 border border-th-border flex-shrink-0 flex items-center justify-center">
                  <span className="font-sans text-[10px] text-th-text3">{c.name[0]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[11px] font-medium text-th-text truncate leading-none mb-0.5">
                    {c.name}
                  </p>
                  <p className="font-sans text-[10px] text-th-text3 truncate leading-none">
                    {c.preview}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-th-bg">
          {/* Chat header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-th-border">
            <div className="w-7 h-7 rounded-full bg-th-bg4 border border-th-border flex items-center justify-center">
              <span className="font-sans text-[10px] text-th-text3">A</span>
            </div>
            <span className="font-sans text-[12px] font-medium text-th-text">Alex Chen</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden px-4 py-3 flex flex-col justify-end gap-1.5">
            {MESSAGES.slice(0, visibleCount).map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                style={{ animation: 'chatIn 0.25s ease-out both' }}
              >
                <span
                  className={`inline-block max-w-[70%] px-3 py-1.5 rounded-pill font-sans text-[12px] leading-[1.4] ${
                    msg.from === 'me'
                      ? 'bg-th-text text-th-bg'
                      : 'bg-th-bg3 text-th-text'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}

            {/* Typing indicator */}
            {showTyping && (
              <div
                className="flex justify-start"
                style={{ animation: 'chatIn 0.2s ease-out both' }}
              >
                <span className="inline-flex items-center gap-1 px-3 py-2 rounded-pill bg-th-bg3">
                  <span className="typing-dot" style={{ animationDelay: '0ms' }} />
                  <span className="typing-dot" style={{ animationDelay: '150ms' }} />
                  <span className="typing-dot" style={{ animationDelay: '300ms' }} />
                </span>
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-pill bg-th-bg3 border border-th-border">
              <span className="flex-1 font-sans text-[11px] text-th-text3">Message</span>
              <div className="w-5 h-5 rounded-full bg-th-bg4 flex items-center justify-center">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M4.5 1v7M1 4.5l3.5-3.5 3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-th-text3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
