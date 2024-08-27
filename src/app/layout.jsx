import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react" // import statement already present in the file

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "Real Flutter",
    template: "%s | Real Flutter",
  },
  description: "Discover the best Flutter resources",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Analytics/>
        {children}
      </body>
    </html>
  );
}