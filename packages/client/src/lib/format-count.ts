export function formatCount(count: number): string {
  const k = 1000;

  if (count < k) {
    return count.toString();
  }

  if (count < k * k) {
    return (count / k).toFixed(1) + "k";
  }

  return (count / (k * k)).toFixed(1) + "M";
}
