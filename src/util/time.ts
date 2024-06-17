export const getNextDaySameTimeRoundedToHour = (): Date => {
  const now = new Date();

  // Create a date object for the next day
  const nextDay = new Date(now);
  nextDay.setDate(now.getDate() + 1); // Add one day

  // Round to the nearest hour
  const minutes = nextDay.getMinutes();
  if (minutes > 0) {
    nextDay.setHours(nextDay.getHours() + 1);
  }
  nextDay.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0

  return nextDay;
};

export function isAuctionOver(endDate: Date) {
  return endDate < new Date();
}