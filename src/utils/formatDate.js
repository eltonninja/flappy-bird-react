export function formatDate(dateString) {
  return dateString.slice(0, 19).replace("T", " ");
}
