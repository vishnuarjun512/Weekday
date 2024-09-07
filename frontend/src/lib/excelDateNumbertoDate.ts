export const convertExcelDate = (excelSerialNumber: number) => {
  const utc_days = Math.floor(excelSerialNumber - 25569);
  const utc_value = utc_days * 86400; // 86400 seconds in a day
  const date_info = new Date(utc_value * 1000);

  const fractional_day =
    excelSerialNumber - Math.floor(excelSerialNumber) + 0.0000001;
  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;
  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  return `${date_info.getDate()} ${date_info.toLocaleString("default", {
    month: "short",
  })} ${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
};
