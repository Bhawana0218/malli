import { useCallback, useState } from 'react';
import useLenis from './hooks/useLenis';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import StorySection from './components/sections/StorySection';
import SpacesSection from './components/sections/SpacesSection';
import CorridorInterlude from './components/sections/CorridorInterlude';
import CulinarySection from './components/sections/CulinarySection';
import WineAndCelebrations from './components/sections/WineAndCelebrations';
import FinalReservation from './components/sections/FinalReservation';

export function App() {
  useLenis();

  const [showNavLogo, setShowNavLogo] = useState(false);

  // The hero's centrepiece mark hands off to the header mark as it rises, so
  // there is never a moment with two logos on screen.
  const handleLogoMorph = useCallback((progress) => {
    setShowNavLogo(progress > 0.42);
  }, []);

  return (
    <div className="surface-walnut-deep relative">
      <Navbar showNavLogo={showNavLogo} />

      <main>
        {/* 1 · Filmed opening. Walnut, one film, one action. */}
        <Hero onLogoMorph={handleLogoMorph} />

        {/* 2 · The page changes material: story on warm white paper. */}
        <StorySection />

        {/* 3 · The seven rooms, pinned — a walk from one to the next. */}
        <SpacesSection />

        {/* 4 · A breath. One full-bleed photograph, nothing else. */}
        <CorridorInterlude />

        {/* 5 · Gastronomy, set as a list on walnut. */}
        <CulinarySection />

        {/* 6 · Wine in deep red wine, then celebrations back on walnut. */}
        <WineAndCelebrations />

        {/* 7 · Reservations. */}
        <FinalReservation />
      </main>

      <Footer />
    </div>
  );
}

export default App;
