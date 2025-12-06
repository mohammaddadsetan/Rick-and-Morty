export function truncate(text: string, maxLenght: number = 40): string {
  if (text.length <= maxLenght) return text;
  return text.slice(0, maxLenght) + "...";
}
