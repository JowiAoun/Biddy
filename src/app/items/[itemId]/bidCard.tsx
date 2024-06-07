import {Container, Text} from "@mantine/core";
import {formatTimestampDistance} from "@/util/format";

// TODO: Infer bid from schema as done within itemCard
export function BidCard({bid}: {bid: any}) {
  return (
    <Container className="bg-gray-100 rounded-xl p-8" key={bid.id}>
      <Text>
        ${bid.amount} by {bid.username} at {formatTimestampDistance(bid.timestamp)}
      </Text>
    </Container>
  );
}