export function generateUUID16() {
  // Generate 16 random hex characters (0-9, a-f)
  // Each hex character represents 4 bits, so 16 hex chars = 64 bits
  const chars = "0123456789abcdef";
  let result = "";
  for (let i = 0; i < 16; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
