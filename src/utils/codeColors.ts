function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function getCodeColor(code: string) {
  const hash = Math.abs(hashCode(code));

  const hue = hash % 360;

  const saturation = 80;
  const lightness = 55; 

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}