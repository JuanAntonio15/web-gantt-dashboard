interface Props {
  state: 'idle' | 'saving' | 'saved' | 'error';
}

export function SaveIndicator({ state }: Props) {
  if (!import.meta.env.DEV || state === 'idle') return null;

  const label = state === 'saving' ? 'Guardando...' : state === 'saved' ? '✓ Guardado' : '✗ Error';
  const color = state === 'error' ? '#B25268' : state === 'saved' ? '#3F8B5A' : 'var(--color-ink-3)';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '.06em',
        padding: '8px 14px',
        borderRadius: '999px',
        background: 'rgba(255,255,255,.9)',
        backdropFilter: 'blur(8px)',
        boxShadow: 'var(--shadow-soft-md)',
        border: '1px solid var(--color-line)',
        color,
        fontWeight: 500,
        transition: 'color .2s',
        zIndex: 50,
      }}
    >
      {label}
    </div>
  );
}
