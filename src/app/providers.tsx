'use client';

import {
  KnockFeedProvider,
  KnockProvider,
} from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";
import {ReactNode} from "react";
import {env} from "@/env";
import {useSession} from "next-auth/react";

export function Providers({children}: {children: ReactNode}) {
  const session = useSession();

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session?.data?.user?.id ?? ""}
    >
    <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
      {children}
    </KnockFeedProvider>
  </KnockProvider>
);
};