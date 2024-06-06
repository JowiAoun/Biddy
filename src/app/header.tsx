import {AppShellHeader, Box} from "@mantine/core";
import Image from "next/image";
import {SignOut} from "@/components/signOut";
import {SignIn} from "@/components/signIn";
import {auth} from "@/auth";
import Link from "next/link";

export async function Header() {
  const session = await auth();

  return (
    <AppShellHeader className="bg-gray-200 flex justify-between">
      <Box className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-1 hover:underline pl-1">
          <Image src="/biddyLogo.png" alt="Biddy Logo" width={50} height={50}/>
          Biddy.ca
        </Link>

        <Box>
          <Link href="/items/create" className="flex items-center gap-1 hover:underline pl-1">
            Auction an item
          </Link>
        </Box>
      </Box>

      <Box className="flex items-center gap-4 py-4 pr-4">
        <Box>
          {session?.user?.name}
        </Box>
        <Box>
          {session ? <SignOut/> : <SignIn/>}
        </Box>
      </Box>
    </AppShellHeader>
  );
}