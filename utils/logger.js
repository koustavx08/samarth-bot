// Simple logger utility
export function logAction(action, details) {
  console.log(`[${new Date().toISOString()}] ${action}:`, details);
}

export function logError(error) {
  console.error(`[${new Date().toISOString()}] ERROR:`, error);
}
