export function randomRGBA(alpha = 1) {
  const r = Math.floor((Math.random() * 256) / 1.75);
  const g = Math.floor((Math.random() * 255) / 1.75);
  const b = Math.floor((Math.random() * 255) / 1.75);

  return `rgba(${r},${g},${b}, ${alpha})`;
}
