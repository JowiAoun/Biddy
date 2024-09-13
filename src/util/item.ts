export function getNumericEnumIndex(enumType: any, value: string): number {
  const enumKeys = Object.keys(enumType).filter(k => isNaN(Number(k)));
  return enumKeys.indexOf(value);
}