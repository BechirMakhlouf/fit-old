export function formatDateForMySQL(date: Date): string {
  return date.getUTCFullYear() + "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getUTCDate()).slice(-2);
}
export function formatDateTimeForMySQL(date: Date): string {
  return date.getUTCFullYear() + "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getUTCDate()).slice(-2) + " " +
    ("00" + date.getUTCHours()).slice(-2) + ":" +
    ("00" + date.getUTCMinutes()).slice(-2) + ":" +
    ("00" + date.getUTCSeconds()).slice(-2);
}
