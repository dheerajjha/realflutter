import NextAuthProvider from "@/components/AuthProvider/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <div>
      <NextAuthProvider>{children}</NextAuthProvider>
    </div>
  );
}
