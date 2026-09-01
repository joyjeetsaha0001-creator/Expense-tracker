export function formatDate(dateInput, options = {}) {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "N/A";
    
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      ...options,
    });
  } catch {
    return "N/A";
  }
}
