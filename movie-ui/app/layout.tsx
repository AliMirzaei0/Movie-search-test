import React from "react";
import "../styles/globals.css";

export const metadata = {
  title: "MovieTube",
  description: "Search and watch movie trailers instantly.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <header className="flex items-center p-4 bg-white text-black shadow-md">
          <div className="mr-4">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="#FF0000"/>
              <polygon points="16,12 30,20 16,28" fill="white"/>
            </svg>
          </div>
          <span className="font-bold text-xl">MovieTube</span>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
} 