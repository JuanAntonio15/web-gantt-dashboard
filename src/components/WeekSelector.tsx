interface Props {
  weeks: number;
  currentWeek: number;
  onSelect: (w: number) => void;
}

function pad(n: number) {
  return n < 10 ? '0' + n : String(n);
}

export function WeekSelector({ weeks, currentWeek, onSelect }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '18px', flexWrap: 'wrap' }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--color-ink-3)',
          whiteSpace: 'nowrap',
          fontWeight: 500,
        }}
      >
        Marcar semana
      </span>
      <div
        style={{
          display: 'flex',
          gap: '4px',
          background: 'var(--color-surface)',
          borderRadius: '14px',
          padding: '5px',
          boxShadow: 'var(--shadow-soft-sm)',
        }}
      >
        {Array.from({ length: weeks }, (_, i) => i + 1).map(w => (
          <button
            key={w}
            onClick={() => onSelect(w)}
            style={{
              fontFamily: 'var(--font-mono)',
              padding: '7px 12px',
              border: 'none',
              background: w === currentWeek ? 'var(--color-ink)' : 'transparent',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              color: w === currentWeek ? '#fff' : 'var(--color-ink-3)',
              transition: 'all .18s ease',
              borderRadius: '9px',
              letterSpacing: '.03em',
              boxShadow: w === currentWeek ? '0 1px 3px rgba(0,0,0,.15)' : 'none',
            }}
            onMouseEnter={e => {
              if (w !== currentWeek) {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-ink)';
                (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-bg-2)';
              }
            }}
            onMouseLeave={e => {
              if (w !== currentWeek) {
                (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-ink-3)';
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              }
            }}
          >
            S{pad(w)}
          </button>
        ))}
      </div>
    </div>
  );
}
