// Cookie helper: store a map of attempted case indices -> status ("won" | "lost")
type Status = "won" | "lost";

function readRaw(): Record<string, Status> {
  try {
    if (typeof document === "undefined") return {};
    const match = document.cookie.split("; ").find((c) => c.startsWith("attemptedCases="));
    if (!match) return {};
    const raw = decodeURIComponent(match.split("=")[1] || "");
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed as Record<string, Status>;
    return {};
  } catch {
    return {};
  }
}

function writeRaw(obj: Record<string, Status>) {
  if (typeof document === "undefined") return;
  const v = encodeURIComponent(JSON.stringify(obj));
  const maxAge = 60 * 60 * 24 * 2; // 2 days
  document.cookie = `attemptedCases=${v}; path=/; max-age=${maxAge}`;
}

export function getAttemptedMap(): Record<number, Status> {
  const raw = readRaw();
  const result: Record<number, Status> = {};
  Object.keys(raw).forEach((k) => {
    const n = Number(k);
    if (!Number.isNaN(n)) result[n] = raw[k];
  });
  return result;
}

export function getAttemptedIndices(): number[] {
  return Object.keys(readRaw())
    .map((k) => Number(k))
    .filter((n) => !Number.isNaN(n));
}

export function addAttempted(idx: number, status: Status) {
  try {
    const raw = readRaw();
    raw[String(idx)] = status;
    writeRaw(raw);
  } catch {}
}

export function clearAttempted() {
  writeRaw({});
}

export default null;
