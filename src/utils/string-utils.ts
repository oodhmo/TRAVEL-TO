export const dateFormat = (value: string): string => {
  // yyyymmdd -> yyyy.mm.dd
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const day = value.slice(6, 8);
  
  return `${year}.${month}.${day}`;
}