import type { GanttData } from '../types';
import { GanttHead } from './GanttHead';
import { SectionRow } from './SectionRow';
import { TaskRow } from './TaskRow';
import { Legend } from './Legend';

interface Props {
  data: GanttData;
  currentWeek: number;
  onCycle: (sectionId: string, taskId: string) => void;
  onWeekSelect: (w: number) => void;
}

export function Gantt({ data, currentWeek, onCycle, onWeekSelect }: Props) {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-soft-lg)',
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            tableLayout: 'fixed',
            width: '100%',
            minWidth: '760px',
          }}
        >
          <colgroup>
            <col style={{ width: '340px' }} />
            {Array.from({ length: data.weeks }, (_, i) => (
              <col key={i} style={{ width: '42px' }} />
            ))}
          </colgroup>

          <GanttHead weeks={data.weeks} months={data.months} currentWeek={currentWeek} onWeekSelect={onWeekSelect} />

          <tbody>
            {data.sections.map((section, si) => (
              <>
                <SectionRow
                  key={`sect-${section.id}`}
                  section={section}
                  index={si}
                  weeks={data.weeks}
                  isFirst={si === 0}
                />
                {section.tasks.map(task => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    palette={section.palette}
                    weeks={data.weeks}
                    currentWeek={currentWeek}
                    onCycle={() => onCycle(section.id, task.id)}
                  />
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          padding: '22px 28px',
          background: 'var(--color-surface-2)',
          borderTop: '1px solid var(--color-line-2)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <Legend sections={data.sections} />
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10.5px',
            color: 'var(--color-ink-3)',
            lineHeight: 1.7,
            letterSpacing: '.02em',
            maxWidth: '320px',
            textAlign: 'right',
            textTransform: 'uppercase',
          }}
        >
          Click en una tarea<br />
          <b style={{ color: 'var(--color-ink)', fontWeight: 600 }}>0 → 25 → 50 → 75 → 100 %</b>
        </div>
      </div>
    </div>
  );
}
