import type { GanttData } from '../types';
import { computeStats } from '../lib/stats';

interface Props {
  data: GanttData;
  currentWeek: number;
}

function pad(n: number) {
  return n < 10 ? '0' + n : String(n);
}

const ACCENT_GRADIENTS = [
  'linear-gradient(180deg, var(--color-c1-mid), var(--color-c1-deep))',
  'linear-gradient(180deg, var(--color-c2-mid), var(--color-c2-deep))',
  'linear-gradient(180deg, var(--color-c3-mid), var(--color-c3-deep))',
  'linear-gradient(180deg, var(--color-c4-mid), var(--color-c4-deep))',
];

export function StatsCards({ data, currentWeek }: Props) {
  const { overall, done, total, statusLabel, stateText, dotColor } = computeStats(data);

  const cards = [
    {
      label: 'Avance global',
      value: <><span>{overall}</span><span style={{ fontSize: '17px', color: 'var(--color-ink-3)', fontWeight: 400, marginLeft: '4px' }}>%</span></>,
      bar: {
        width: `${overall}%`,
        gradient: 'linear-gradient(90deg, var(--color-c1-mid), var(--color-c1-deep))',
      },
    },
    {
      label: 'Entregables',
      value: <><span>{done}</span><span style={{ fontSize: '17px', color: 'var(--color-ink-3)', fontWeight: 400, marginLeft: '4px' }}>/{total}</span></>,
      bar: {
        width: `${(done / total) * 100}%`,
        gradient: 'linear-gradient(90deg, var(--color-c2-mid), var(--color-c2-deep))',
      },
    },
    {
      label: 'Semana actual',
      value: <span>S{pad(currentWeek)}</span>,
      bar: {
        width: `${(currentWeek / data.weeks) * 100}%`,
        gradient: 'linear-gradient(90deg, var(--color-c3-mid), var(--color-c3-deep))',
      },
    },
    {
      label: 'Estado',
      value: <span style={{ fontSize: '26px', lineHeight: '1.4' }}>{stateText}</span>,
      statusRow: { statusLabel, dotColor },
    },
  ];

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',
        marginBottom: '36px',
      }}
    >
      {cards.map((card, i) => (
        <div
          key={card.label}
          style={{
            background: 'var(--color-surface)',
            borderRadius: '20px',
            padding: '22px 24px',
            boxShadow: 'var(--shadow-soft-md)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '0 auto 0 0',
              width: '4px',
              background: ACCENT_GRADIENTS[i],
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'var(--color-ink-3)',
              marginBottom: '12px',
              fontWeight: 500,
            }}
          >
            {card.label}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: '40px',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--color-ink)',
              display: 'flex',
              alignItems: 'baseline',
              gap: '2px',
            }}
          >
            {card.value}
          </div>
          {card.bar && (
            <div
              style={{
                height: '6px',
                background: 'var(--color-bg-2)',
                borderRadius: '999px',
                marginTop: '14px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  borderRadius: '999px',
                  background: card.bar.gradient,
                  width: card.bar.width,
                  transition: 'width .7s cubic-bezier(.2,.8,.2,1)',
                }}
              />
            </div>
          )}
          {card.statusRow && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginTop: '10px' }}>
              <span
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: card.statusRow.dotColor,
                  boxShadow: '0 0 0 3px rgba(0,0,0,.04)',
                  transition: 'all .3s',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-ink)',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '.06em',
                }}
              >
                {card.statusRow.statusLabel}
              </span>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
