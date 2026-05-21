import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

export function PageShell({
  children,
  withFooter = true,
}: {
  children: React.ReactNode;
  withFooter?: boolean;
}) {
  return (
    <div className="relative">
      <Sidebar tone="light" />
      <div className="md:pl-[17rem]">
        <div className="px-6 pt-24 pb-2 md:px-12 md:pt-12">
          {children}
          {withFooter && <Footer />}
        </div>
      </div>
    </div>
  );
}
