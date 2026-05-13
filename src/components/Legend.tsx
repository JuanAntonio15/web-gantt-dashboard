import type { Section } from '../types';
import { paletteMap } from '../lib/palettes';

interface Props {
  sections: Section[];
}

export function Legend({ sections }: Props) {
  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
      {sections.map((sec, i) => {
        const pal = paletteMap[sec.palette];
        return (
          <div
            key={sec.id}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              fontSize: '11.5px',
              color: 'var(--color-ink-2)',
              fontWeight: 500,
              padding: '5px 11px',
              borderRadius: '999px',
              background: 'var(--color-surface)',
              boxShadow: 'var(--shadow-soft-sm)',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                flexShrink: 0,
                background: `linear-gradient(135deg, ${pal.mid}, ${pal.deep})`,
              }}
            />
            <span>{i + 1} · {sec.label}</span>
          </div>
        );
      })}
    </div>
  );
}
