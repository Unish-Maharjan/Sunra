import Header from "./components/Header";
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import Structure from "./components/home/Structure";

import BestSellers from "./components/home/BestSellers";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Structure />
        <BestSellers />
      </main>
      <Footer />
    </>
  );
}
