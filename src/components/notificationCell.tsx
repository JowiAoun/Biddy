import {Avatar, Notification} from '@mantine/core';
import Link from "next/link";
import {IconPackage} from "@tabler/icons-react";
import {getImageUrl} from "@/util/files";
export function NotificationCell(
  {item, closeNotifs}
  : {item: any, closeNotifs: () => void}
) {
  const icon =
    <Avatar src={getImageUrl(item.data?.image)}>
      <IconPackage/>
    </Avatar>

  return (

    <Link
      className="text-blue-400 hover:text=blue-500"
      href={`/items/${item.data.itemId}`}
      onClick={closeNotifs}
    >
      <Notification
        className="rounded-xl my-1 hover:bg-blue-50"
        title={item.data.itemName ?? "An item you've bid on"}
        color="white"
        icon={icon}
        withCloseButton={false}
      >
        You&apos;ve been outbid on {" "}
          {item.data.itemName}
        {" "} by ${item.data.bidAmount}
      </Notification>
    </Link>
  )
}