import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plusJakarta-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${plusJakartaSans.className} w-svw h-svh overflow-hidden`}
        >
        <Sidebar>
            {children}
        </Sidebar>
        </body>
        </html>
    );
}
