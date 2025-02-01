import HeroesHomePage from "@/components/ui/Heroes/HeroesHomePage";
import NavbarHomePage from "@/components/ui/Navbar/NavbarHome";

export default function Home() {
  return (
    <>
    <NavbarHomePage />
    <main className="flex items-center justify-center min-h-screen">
      <HeroesHomePage />
    </main>
    </>
  );
}
