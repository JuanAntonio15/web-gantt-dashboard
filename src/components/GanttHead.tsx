import { buildMonthRanges } from '../lib/months';

interface Props {
  weeks: number;
  months: number;
  currentWeek: number;
  onWeekSelect: (w: number) => void;
}

function pad(n: number) {
  return n < 10 ? '0' + n : String(n);
}

export function GanttHead({ weeks, months, currentWeek, onWeekSelect }: Props) {
  const ranges = buildMonthRanges(weeks, months);

  return (
    <thead style={{ background: 'var(--color-surface-2)' }}>
      <tr>
        <th
          rowSpan={2}
          style={{
            padding: '22px 28px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '.14em',
            textTransform: 'uppercase',
            color: 'var(--color-ink-3)',
            fontWeight: 500,
            textAlign: 'left',
            verticalAlign: 'bottom',
            borderBottom: '1px solid var(--color-line)',
          }}
        >
          Tarea / entregable
        </th>
        {ranges.map(r => (
          <th
            key={r.label}
            colSpan={r.span}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-3)',
              fontWeight: 500,
              textAlign: 'center',
              paddingBottom: '10px',
              paddingTop: '22px',
            }}
          >
            {r.label}
          </th>
        ))}
      </tr>
      <tr>
        {Array.from({ length: weeks }, (_, i) => i + 1).map(w => {
          const isCur = w === currentWeek;
          return (
            <th
              key={w}
              onClick={() => onWeekSelect(w)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: isCur ? '#fff' : 'var(--color-ink-3)',
                textAlign: 'center',
                padding: '8px 0',
                paddingBottom: '14px',
                fontWeight: 500,
                borderBottom: '1px solid var(--color-line)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
              onMouseEnter={e => {
                if (!isCur) (e.currentTarget as HTMLTableCellElement).style.color = 'var(--color-ink)';
              }}
              onMouseLeave={e => {
                if (!isCur) (e.currentTarget as HTMLTableCellElement).style.color = 'var(--color-ink-3)';
              }}
            >
              {isCur ? (
                <span
                  style={{
                    background: 'var(--color-ink)',
                    padding: '4px 7px',
                    borderRadius: '7px',
                    display: 'inline-block',
                    color: '#fff',
                  }}
                >
                  {pad(w)}
                </span>
              ) : (
                pad(w)
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
