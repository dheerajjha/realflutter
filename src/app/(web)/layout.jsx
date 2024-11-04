import NextAuthProvider from "@/components/AuthProvider/AuthProvider";
import Head from "next/head";

export default function RootLayout({ children }) {
  return (
    <div>
      <Head>
        <script
          defer
          data-website-id="672936034a567f1d37c69ca5"
          data-domain="realflutter.com"
          src="https://datafa.st/js/script.js"
        ></script>
      </Head>
      <NextAuthProvider>{children}</NextAuthProvider>
    </div>
  );
}