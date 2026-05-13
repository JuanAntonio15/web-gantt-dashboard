import type { Section } from '../types';
import { paletteMap } from '../lib/palettes';
import { sectionProgress } from '../lib/stats';

interface Props {
  section: Section;
  index: number;
  weeks: number;
  isFirst: boolean;
}

function pad(n: number) {
  return n < 10 ? '0' + n : String(n);
}

export function SectionRow({ section, index, weeks, isFirst }: Props) {
  const pal = paletteMap[section.palette];
  const sp = sectionProgress(section.tasks);

  return (
    <tr>
      <td
        style={{
          padding: isFirst ? '24px 28px 10px' : '28px 28px 10px',
          background: 'var(--color-surface)',
          borderTop: isFirst ? 'none' : '1px solid var(--color-line-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 11px 5px 7px',
              borderRadius: '999px',
              background: pal.bg,
              color: pal.deep,
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '.04em',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,.7)',
                fontSize: '10px',
                fontWeight: 700,
                color: pal.deep,
              }}
            >
              {index + 1}
            </span>
            {section.tasks.length} tareas
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              color: 'var(--color-ink)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
            }}
          >
            {section.label}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-ink-3)',
              marginLeft: 'auto',
              fontWeight: 500,
              letterSpacing: '.04em',
            }}
          >
            {pad(sp)} %
          </span>
        </div>
      </td>
      <td
        colSpan={weeks}
        style={{
          padding: '0 28px 0 0',
          verticalAlign: 'bottom',
          background: 'var(--color-surface)',
          borderTop: isFirst ? 'none' : '1px solid var(--color-line-2)',
        }}
      >
        <div
          style={{
            height: '4px',
            background: 'var(--color-line-2)',
            borderRadius: '999px',
            margin: '0 0 4px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: '999px',
              width: `${sp}%`,
              background: `linear-gradient(90deg, ${pal.mid}, ${pal.deep})`,
              transition: 'width .7s cubic-bezier(.2,.8,.2,1)',
            }}
          />
        </div>
      </td>
    </tr>
  );
}
