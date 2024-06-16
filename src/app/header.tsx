'use client';

import {AppShellHeader, Box, Button} from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import {NotificationFeedPopover, NotificationIconButton} from "@knocklabs/react";
import {useRef, useState} from "react";
import {signIn, signOut, useSession} from "next-auth/react";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);
  const session = useSession();

  return (
    <AppShellHeader className="bg-gray-200 flex justify-between">
      <Box className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-1 hover:underline pl-1">
          <Image src="/biddyLogo.png" alt="Biddy Logo" width={50} height={50}/>
          Biddy.ca
        </Link>

        <Link href="/" className="flex items-center gap-1 hover:underline pl-1">
          All Auctions
        </Link>

        <Link href="/items/create" className="flex items-center gap-1 hover:underline pl-1">
          Create Auction
        </Link>

        <Link href="/auctions" className="flex items-center gap-1 hover:underline pl-1">
          My Auctions
        </Link>
      </Box>

      <Box className="flex items-center gap-4 py-4 pr-4">
        <NotificationIconButton
          ref={notifButtonRef}
          onClick={(e) => setIsVisible(!isVisible)}
        />
        <NotificationFeedPopover
          buttonRef={notifButtonRef}
          isVisible={isVisible}
          onClose={() => setIsVisible(false)}
        />

        <Box>
          {session?.data?.user?.name}
        </Box>
        <Box>
          {session
            ?
            <Button
              type="submit"
              onClick={() => signOut({callbackUrl: "/"})}>
              Sign Out
            </Button>
            :
            <Button
              type="submit"
              onClick={() => signIn()}>
              Sign In
            </Button>
          }
        </Box>
      </Box>
    </AppShellHeader>
);
}