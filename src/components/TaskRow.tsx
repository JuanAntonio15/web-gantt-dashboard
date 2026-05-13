import type { Task, Palette } from '../types';
import { paletteMap } from '../lib/palettes';
import { taskProgress, weekInIntervals } from '../lib/stats';

interface Props {
  task: Task;
  palette: Palette;
  weeks: number;
  currentWeek: number;
  onToggleWeek: (week: number) => void;
}

function pad(n: number) {
  return n < 10 ? '0' + n : String(n);
}

export function TaskRow({ task, palette, weeks, currentWeek, onToggleWeek }: Props) {
  const pal = paletteMap[palette];
  const pc = taskProgress(task);
  const isDone = pc === 100;
  const isPartial = pc > 0 && pc < 100;

  const size = 18;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (pc / 100) * circumference;

  const pctColor = isDone || isPartial ? pal.deep : 'var(--color-ink-4)';

  return (
    <tr style={{ cursor: 'default', borderTop: '1px solid var(--color-line-2)' }}>
      <td
        style={{
          padding: '10px 28px 10px 52px',
          verticalAlign: 'middle',
          background: 'var(--color-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Ring progress indicator */}
          <div style={{ width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', display: 'block' }}>
              <circle
                cx={size / 2} cy={size / 2} r={radius}
                fill="transparent"
                stroke={pc > 0 ? pal.bg : 'var(--color-line)'}
                strokeWidth={strokeWidth}
              />
              {pc > 0 && (
                <circle
                  cx={size / 2} cy={size / 2} r={radius}
                  fill="transparent"
                  stroke={pal.deep}
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                />
              )}
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
            letterSpacing: '.03em',
          }}>
            {pad(pc)}%
          </span>
        </div>
      </td>

      {Array.from({ length: weeks }, (_, i) => i + 1).map(w => {
        const isCur = w === currentWeek;
        const inInterval = weekInIntervals(task, w);
        const wp = task.weekProgress.find(p => p.week === w);
        const progress = wp?.progress ?? 0;

        // Border radius per interval block edges
        const prevInInterval = weekInIntervals(task, w - 1);
        const nextInInterval = weekInIntervals(task, w + 1);
        const br = inInterval
          ? (!prevInInterval && !nextInInterval ? '4px'
            : !prevInInterval ? '4px 0 0 4px'
            : !nextInInterval ? '0 4px 4px 0'
            : '0')
          : '0';

        return (
          <td
            key={w}
            data-cur-col={isCur ? '1' : undefined}
            onClick={inInterval ? () => onToggleWeek(w) : undefined}
            style={{
              padding: '10px 4px',
              height: '36px',
              verticalAlign: 'middle',
              background: isCur ? 'var(--color-bg-2)' : 'var(--color-surface)',
              cursor: inInterval ? 'pointer' : 'default',
              transition: 'background .12s ease',
            }}
            onMouseEnter={e => {
              if (inInterval) (e.currentTarget as HTMLTableCellElement).style.background = isCur ? '#EEE6D8' : 'var(--color-bg-1)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLTableCellElement).style.background = isCur ? 'var(--color-bg-2)' : 'var(--color-surface)';
            }}
          >
            {inInterval && (
              <div style={{ height: '16px', borderRadius: br, overflow: 'hidden', position: 'relative', background: pal.bg }}>
                {progress > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0,
                    width: `${progress}%`,
                    borderRadius: br,
                    background: progress === 100
                      ? `linear-gradient(90deg, ${pal.deep}, color-mix(in srgb, ${pal.deep} 70%, #000))`
                      : `linear-gradient(90deg, ${pal.mid}, ${pal.deep})`,
                    transition: 'width .2s ease',
                  }} />
                )}
                {progress === 100 && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,.18) 3px, rgba(255,255,255,.18) 4px)',
                  }} />
                )}
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
}
