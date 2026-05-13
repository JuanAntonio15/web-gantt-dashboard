import type { Palette } from '../types';

export const paletteMap: Record<Palette, { bg: string; mid: string; deep: string }> = {
  mint:     { bg: 'var(--color-c1-bg)', mid: 'var(--color-c1-mid)', deep: 'var(--color-c1-deep)' },
  sky:      { bg: 'var(--color-c2-bg)', mid: 'var(--color-c2-mid)', deep: 'var(--color-c2-deep)' },
  lavender: { bg: 'var(--color-c3-bg)', mid: 'var(--color-c3-mid)', deep: 'var(--color-c3-deep)' },
  peach:    { bg: 'var(--color-c4-bg)', mid: 'var(--color-c4-mid)', deep: 'var(--color-c4-deep)' },
  rose:     { bg: 'var(--color-c5-bg)', mid: 'var(--color-c5-mid)', deep: 'var(--color-c5-deep)' },
};
