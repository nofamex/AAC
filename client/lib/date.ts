export const getDate = (dt: Date) => {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const month = monthNames[dt.getMonth()];

  return `${dt.getDate() - 1} ${month} ${dt.getUTCFullYear()}`;
};

export const toCurrentTimezone = (crt: string) => {
  const dt = new Date(crt);
  dt.setHours(dt.getHours() - 7);
  return dt;
};
