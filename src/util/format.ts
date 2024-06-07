import {formatDistance} from "date-fns";

export function formatTimestampDistance(timestamp: Date) {
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}