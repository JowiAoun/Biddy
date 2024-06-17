'use client';

import {
  KnockFeedProvider,
  KnockProvider,
} from "@knocklabs/react";
import "@knocklabs/react/dist/index.css";
import React, {useEffect} from "react";
import {env} from "@/env";
import {useSession} from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {}, [session, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session?.user?.id) {
    return <>{children}</>;
  }

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session.user.id}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
