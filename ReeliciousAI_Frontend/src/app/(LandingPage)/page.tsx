import AllInOne from "./_components/all_in_one";
import Footer from "./_components/footer";
import Header from "./_components/header";
import Hero from "./_components/hero";
import HowDoesItWork from "./_components/how_does_it_work";
import RegisterHere from "./_components/register_here";

export default function Home() {
  return (
    <div className="h-full">
      <Header />
      <Hero />
      <AllInOne />
      <HowDoesItWork />
      <RegisterHere />
      <Footer />
    </div>
  );
}
