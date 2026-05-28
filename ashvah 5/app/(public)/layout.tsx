import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { IntroCurtain } from "@/components/ui/IntroCurtain";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IntroCurtain />
      <CustomCursor />
      <Header />
      <ScrollProgress />
      <main className="pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}
