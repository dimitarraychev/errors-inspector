export const formatDate = (isoString: string) => {
  const d = new Date(isoString);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes} ${day}.${month}.${year}`;
};

export const shortFormatDate = (isoString: string, period: string) => {
  const d = new Date(isoString);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  if (["1h", "2h", "3h", "6h", "12h", "1d"].includes(period)) {
    return `${hours}:${minutes}`;
  } else {
    return `${day}.${month}`;
  }
};

export const parsePeriodToHours = (period: string): number => {
  const value = parseInt(period);
  const unit = period.slice(-1);

  switch (unit) {
    case "h":
      return value;

    case "d":
      return value * 24;

    case "m":
      return value * 30 * 24; // simple 30-day month

    default:
      return 6;
  }
};
