'use client'

import { useState } from 'react'
import { MiniPhoneSketch } from '@/components/ui/ImagePlaceholder'
import ConceptLightbox from '@/components/ui/ConceptLightbox'

interface ConceptItem {
  title: string
  body: string
  status?: 'winner' | 'tested' | ''
  image?: string
}

interface ConceptGridProps {
  items: ConceptItem[]
}

export default function ConceptGrid({ items }: ConceptGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="p-6 border border-th-border relative text-left group hover:bg-th-bg2 transition-colors duration-200 cursor-pointer"
          >
            {item.status && (
              <span className={`font-mono text-[9px] tracking-[0.1em] absolute top-6 right-6 px-3 py-1 ${
                item.status === 'winner' ? 'bg-th-text text-th-bg' : 'border border-th-border text-th-text'
              }`}>
                {item.status === 'winner' ? 'Shipped' : 'Tested'}
              </span>
            )}
            <div className="mb-4 flex justify-center opacity-50 group-hover:opacity-70 transition-opacity duration-200">
              <MiniPhoneSketch />
            </div>
            <p className="font-display text-[14px] font-light text-th-text tracking-[0.04em] mb-2">{item.title}</p>
            <p className="font-display text-[13px] font-light leading-[1.6] text-th-text2 tracking-[0.03em]">{item.body}</p>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <ConceptLightbox
          items={items}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(i) => setLightboxIndex(i)}
        />
      )}
    </>
  )
}
