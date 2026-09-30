import Header from "./components/Header";
import Hero from "./components/home/Hero";
import About from "./components/home/About";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
      </main>
    </>
  );
}
