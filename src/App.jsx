import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Stats from "./components/Stats";

function App() {
  return (
    <>
      <Navbar />
      <main className="bg-bg text-ink">
        <Hero />
        <Services />
        <Stats />
        {/* more sections added next */}
      </main>
    </>
  );
}

export default App;
