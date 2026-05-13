import type { GanttData } from '../types';
import { computeStats } from '../lib/stats';

interface Props {
  data: GanttData;
  currentWeek: number;
}

export function StatsCards({ data, currentWeek }: Props) {
  const { overall } = computeStats(data);

  return (
    <section
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
        marginBottom: '36px',
      }}
    >
      {/* Avance global */}
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: '20px',
          padding: '22px 24px',
          boxShadow: 'var(--shadow-soft-md)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '4px', background: 'linear-gradient(180deg, var(--color-c1-mid), var(--color-c1-deep))' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: '12px', fontWeight: 500 }}>
          Avance global
        </div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '40px', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--color-ink)', display: 'flex', alignItems: 'baseline', gap: '2px' }}>
          <span>{overall}</span>
          <span style={{ fontSize: '17px', color: 'var(--color-ink-3)', fontWeight: 400, marginLeft: '4px' }}>%</span>
        </div>
        <div style={{ height: '6px', background: 'var(--color-bg-2)', borderRadius: '999px', marginTop: '14px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, var(--color-c1-mid), var(--color-c1-deep))', width: `${overall}%`, transition: 'width .7s cubic-bezier(.2,.8,.2,1)' }} />
        </div>
      </div>

      {/* Semana actual + totales */}
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: '20px',
          padding: '22px 24px',
          boxShadow: 'var(--shadow-soft-md)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '4px', background: 'linear-gradient(180deg, var(--color-c3-mid), var(--color-c3-deep))' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: '12px', fontWeight: 500 }}>
          Semana actual
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '40px', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--color-ink)', display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontSize: '22px', fontWeight: 400, color: 'var(--color-ink-3)', marginRight: '4px' }}>Semana</span>
            <span>{currentWeek}</span>
          </div>
        </div>
        <div style={{ height: '6px', background: 'var(--color-bg-2)', borderRadius: '999px', marginTop: '14px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, var(--color-c3-mid), var(--color-c3-deep))', width: `${(currentWeek / data.weeks) * 100}%`, transition: 'width .7s cubic-bezier(.2,.8,.2,1)' }} />
        </div>
      </div>
      {/* Duración del proyecto */}
      <div
        style={{
          background: 'var(--color-surface)',
          borderRadius: '20px',
          padding: '22px 24px',
          boxShadow: 'var(--shadow-soft-md)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: '4px', background: 'linear-gradient(180deg, var(--color-c2-mid), var(--color-c2-deep))' }} />
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: '12px', fontWeight: 500 }}>
          Duración
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '40px', lineHeight: 1, letterSpacing: '-0.03em', color: 'var(--color-ink)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
            <span>{String(data.weeks).padStart(2, '0')}</span>
            <span style={{ fontSize: '17px', color: 'var(--color-ink-3)', fontWeight: 400 }}>semanas</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-ink-3)', letterSpacing: '.02em' }}>
            <b style={{ color: 'var(--color-ink)', fontWeight: 600 }}>{String(data.months).padStart(2, '0')}</b>
            <span style={{ marginLeft: '4px' }}>meses totales</span>
          </div>
        </div>
      </div>
    </section>
  );
}
