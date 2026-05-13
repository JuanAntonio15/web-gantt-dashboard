import type { GanttData } from '../types';

interface Props {
  data: GanttData;
}


export function Header({ data }: Props) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: '32px',
        marginBottom: '36px',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-2)',
            background: 'rgba(255,255,255,.7)',
            backdropFilter: 'blur(8px)',
            padding: '7px 14px',
            borderRadius: '999px',
            border: '1px solid rgba(255,255,255,.8)',
            boxShadow: 'var(--shadow-soft-sm)',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--color-c1-deep)',
              boxShadow: '0 0 0 3px var(--color-c1-bg)',
              flexShrink: 0,
            }}
          />
          {data.client} · {data.project}
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: '58px',
            lineHeight: '.98',
            letterSpacing: '-0.035em',
            color: 'var(--color-ink)',
          }}
        >
          {data.title}
        </h1>
      </div>

    </header>
  );
}
