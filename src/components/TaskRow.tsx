import type { Task } from '../types';
import { paletteMap } from '../lib/palettes';
import type { Palette } from '../types';

interface Props {
  task: Task;
  palette: Palette;
  weeks: number;
  currentWeek: number;
  onCycle: () => void;
}

function pad(n: number) {
  return n < 10 ? '0' + n : String(n);
}

export function TaskRow({ task, palette, weeks, currentWeek, onCycle }: Props) {
  const pal = paletteMap[palette];
  const pc = task.progress;
  const isDone = pc === 100;
  const isPartial = pc > 0 && pc < 100;
  const size = 18;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (pc / 100) * circumference;

  const pctColor = isDone || isPartial ? pal.deep : 'var(--color-ink-4)';

  return (
    <tr
      onClick={onCycle}
      style={{ cursor: 'pointer' }}
      onMouseEnter={e => {
        const cells = (e.currentTarget as HTMLTableRowElement).querySelectorAll('td');
        cells.forEach(td => {
          if (!td.dataset.curCol) td.style.background = 'var(--color-bg-1)';
        });
      }}
      onMouseLeave={e => {
        const cells = (e.currentTarget as HTMLTableRowElement).querySelectorAll('td');
        cells.forEach(td => {
          if (!td.dataset.curCol) td.style.background = 'var(--color-surface)';
          else td.style.background = 'var(--color-bg-2)';
        });
      }}
    >
      <td
        style={{
          padding: '10px 28px 10px 52px',
          verticalAlign: 'middle',
          background: 'var(--color-surface)',
          transition: 'background .12s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            width: size, 
            height: size, 
            position: 'relative', 
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg 
              width={size} 
              height={size} 
              style={{ transform: 'rotate(-90deg)', position: 'absolute' }}
            >
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="var(--color-line-2)"
                strokeWidth={strokeWidth}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={isDone || isPartial ? pal.deep : "transparent"}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ 
                  transition: 'stroke-dashoffset 0.3s ease, stroke 0.3s ease' 
                }}
              />
            </svg>
          </div>

          <span style={{
            fontSize: '13.5px',
            color: isDone ? 'var(--color-ink-3)' : 'var(--color-ink-2)',
            lineHeight: 1.45,
            flex: 1,
            fontWeight: 400,
          }}>
            {task.label}
          </span>

          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            fontWeight: 600,
            minWidth: '38px',
            textAlign: 'right',
            color: pctColor,
            transition: 'color .2s',
            letterSpacing: '.03em',
          }}>
            {pad(pc)}%
          </span>
        </div>
      </td>

      {Array.from({ length: weeks }, (_, i) => i + 1).map(w => {
        const inRange = w >= task.startWeek && w <= task.endWeek;
        const isCur = w === currentWeek;

        if (inRange) {
          const span = task.endWeek - task.startWeek + 1;
          const cmpW = (task.progress / 100) * span;
          const ci = w - task.startWeek;
          const filledFully = ci < Math.floor(cmpW);
          const partial = ci === Math.floor(cmpW) && cmpW - Math.floor(cmpW) > 0;
          const partPct = partial ? Math.round((cmpW - Math.floor(cmpW)) * 100) : 0;
          const isFirst = w === task.startWeek;
          const isLast = w === task.endWeek;
          const br = isFirst && isLast ? '5px' : isFirst ? '5px 0 0 5px' : isLast ? '0 5px 5px 0' : '0';
          const fillW = filledFully ? 100 : partial ? partPct : 0;

          return (
            <td
              key={w}
              data-cur-col={isCur ? '1' : undefined}
              style={{
                padding: '10px 4px',
                height: '36px',
                position: 'relative',
                verticalAlign: 'middle',
                background: isCur ? 'var(--color-bg-2)' : 'var(--color-surface)',
                transition: 'background .12s ease',
              }}
            >
              <div style={{ height: '16px', borderRadius: br, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, background: pal.bg, borderRadius: br }} />
                <div
                  style={{
                    position: 'absolute',
                    inset: '0 auto 0 0',
                    width: `${fillW}%`,
                    background: `linear-gradient(90deg, ${pal.mid}, ${pal.deep})`,
                    borderRadius: br,
                    transition: 'width .55s cubic-bezier(.2,.8,.2,1)',
                  }}
                />
              </div>
            </td>
          );
        }

        return (
          <td
            key={w}
            data-cur-col={isCur ? '1' : undefined}
            style={{
              padding: '10px 4px',
              height: '36px',
              background: isCur ? 'var(--color-bg-2)' : 'var(--color-surface)',
              transition: 'background .12s ease',
            }}
          />
        );
      })}
    </tr>
  );
}