export function getClasses(classList: unknown[]) {
  return classList.filter(item => item).join(' ');
}
