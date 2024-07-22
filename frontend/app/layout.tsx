import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { ReactQueryProvider } from "./queryclient";
import { ReactLocalizationProvider } from "./localization";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Theme from "./theme";
import "./ui/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LoanLens",
  description: "CS348 Project",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={Theme}>
        <ReactLocalizationProvider>
          <html lang="en">
            <body className={inter.className}>{children}</body>
          </html>
        </ReactLocalizationProvider>
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
