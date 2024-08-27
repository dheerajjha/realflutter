import { Roboto } from "next/font/google";

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
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
