export function buildMonthRanges(weeks: number, months: number): { label: string; span: number }[] {
  const base = Math.floor(weeks / months);
  const extra = weeks % months;
  const result: { label: string; span: number }[] = [];
  let start = 1;
  for (let m = 0; m < months; m++) {
    const span = base + (m === months - 1 ? extra : 0);
    const end = start + span - 1;
    const num = String(m + 1).padStart(2, '0');
    result.push({ label: `Mes ${num} · S${String(start).padStart(2,'0')} — S${String(end).padStart(2,'0')}`, span });
    start = end + 1;
  }
  return result;
}
