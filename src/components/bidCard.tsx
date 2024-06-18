import {Container, Text} from "@mantine/core";
import {formatTimestampDistance} from "@/util/format";

export function BidCard({bid}: {bid: any}) {
  return (
    <Container className="bg-gray-100 rounded-xl p-8" key={bid.id}>
      <Text>
        ${bid.amount} by {bid.user.name} at {formatTimestampDistance(bid.timestamp)}
      </Text>
    </Container>
  );
}