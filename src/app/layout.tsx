import type { Metadata } from "next";
import '@mantine/core/styles.css';
import {AppShell, Box, ColorSchemeScript, MantineProvider} from '@mantine/core';
import {Header} from "@/app/header";
import "./globals.css"
import {Providers} from "@/app/providers";
import {SessionProvider} from "next-auth/react";
import React from "react";

export const metadata: Metadata = {
  title: "Biddy",
  description: "Item bidding platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <title>Biddy</title>
      </head>
      <body>
        <MantineProvider>
          <SessionProvider>
            <Providers>
              <AppShell header={{height: "4rem"}}>
                <Header/>
                <Box className="p-8">
                  {children}
                </Box>
              </AppShell>
            </Providers>
          </SessionProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
