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
            className="p-6 rounded-card border border-th-bsub relative text-left group hover:border-th-border transition-colors duration-200 cursor-pointer"
          >
            {item.status && (
              <span className={`font-sans text-[12px] font-medium absolute top-6 right-6 px-3 py-1 rounded-pill ${
                item.status === 'winner' ? 'bg-th-text text-th-bg' : 'bg-th-chip text-th-text'
              }`}>
                {item.status === 'winner' ? 'Shipped' : 'Tested'}
              </span>
            )}
            <div className="mb-4 flex justify-center opacity-50 group-hover:opacity-70 transition-opacity duration-200">
              <MiniPhoneSketch />
            </div>
            <p className="font-sans text-[16px] font-medium text-th-text mb-2">{item.title}</p>
            <p className="font-sans text-[14px] leading-[1.5] text-th-text2">{item.body}</p>
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
