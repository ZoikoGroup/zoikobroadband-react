export const money = (n: number) => `£${n.toFixed(2)}`;

export const addDays = (base: string | Date, days: number) => {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
};

export const fmtDate = (d: string | Date) =>
  new Date(d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const fmtShort = (d: string | Date) =>
  new Date(d).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

export const formatDownload = (download: string) => {
  const n = parseFloat(download);
  if (!n) return download;
  return n < 1 ? `${Math.round(n * 1000)} Kbps` : `${n} Mbps`;
};
