import { useState } from 'react';
import { useGanttData } from './hooks/useGanttData';
import { useAutoSave } from './hooks/useAutoSave';
import { Header } from './components/Header';
import { StatsCards } from './components/StatsCards';
import { Gantt } from './components/Gantt';
import { SaveIndicator } from './components/SaveIndicator';
import { downloadJson } from './lib/download';

export default function App() {
  const { data, loading, error, cycleProgress } = useGanttData();
  const [currentWeek, setCurrentWeek] = useState(1);
  const saveState = useAutoSave(data);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'var(--font-mono)', color: 'var(--color-ink-3)', fontSize: '13px', letterSpacing: '.1em', textTransform: 'uppercase' }}>
        Cargando...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'var(--font-mono)', color: '#B25268', fontSize: '13px' }}>
        Error al cargar data.json
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1260px', margin: '0 auto', padding: '56px 40px 80px' }}>
      <Header data={data} />
      <StatsCards data={data} currentWeek={currentWeek} />
      <Gantt data={data} currentWeek={currentWeek} onCycle={cycleProgress} onWeekSelect={setCurrentWeek} />

      {!import.meta.env.DEV && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={() => downloadJson(data)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              padding: '10px 20px',
              borderRadius: '999px',
              border: '1px solid var(--color-line)',
              background: 'rgba(255,255,255,.8)',
              backdropFilter: 'blur(8px)',
              color: 'var(--color-ink-2)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-soft-sm)',
              fontWeight: 500,
            }}
          >
            Descargar JSON
          </button>
        </div>
      )}

      <SaveIndicator state={saveState} />
    </div>
  );
}
