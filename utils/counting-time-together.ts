export interface TimeTogether {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Aceita:
 *  - start_date ISO (2025-11-18T00:00:00.000Z)
 *  - start_date YYYY-MM-DD
 *  - start_date YYYY-MM-DDTHH:mm
 *  - start_hour HH:mm opcional
 */
export function calculateTimeTogether(
  startDate?: string,
  startHour?: string
): TimeTogether {
  if (!startDate) {
    return zeroTime();
  }

  let baseDate: Date | null = null;

  // Caso 1: ISO valid (ex: 2025-11-18T00:00:00.000Z)
  if (!isNaN(Date.parse(startDate))) {
    baseDate = new Date(startDate);
  }

  // Caso 2: YYYY-MM-DD (não ISO)
  if (!baseDate && /^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    baseDate = new Date(`${startDate}T00:00:00`);
  }

  // Caso 3: YYYY-MM-DD + HH:mm
  if (!baseDate && /^\d{4}-\d{2}-\d{2}/.test(startDate) && startHour) {
    baseDate = new Date(`${startDate}T${startHour}:00`);
  }

  if (!baseDate || isNaN(baseDate.getTime())) {
    return zeroTime();
  }

  // Se vier apenas YYYY-MM-DD, aplicar startHour se existir
  if (startHour && startDate.length === 10) {
    baseDate = new Date(`${startDate}T${startHour}:00`);
  }

  const now = new Date();
  const diff = now.getTime() - baseDate.getTime();

  if (diff < 0) return zeroTime();

  return {
    years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
    days: Math.floor((diff / (1000 * 60 * 60 * 24)) % 365),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function zeroTime(): TimeTogether {
  return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
}
