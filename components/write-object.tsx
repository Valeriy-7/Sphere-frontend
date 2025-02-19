export function WriteObject(data: Record<string, unknown>) {
  return JSON.stringify(data, null, 2);
}
