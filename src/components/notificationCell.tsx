'use client';

import { Notification } from '@mantine/core';

export function NotificationCell(
  {item}
  : {item: any}
) {

  return (
    <>
      <Notification title={item.data?.itemName}>
        You&apos;ve been outbid on &quot;{item.data?.itemName}&quot; by ${item.data.bidAmount}
      </Notification>
    </>
  )
}