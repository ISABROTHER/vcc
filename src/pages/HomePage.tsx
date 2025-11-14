import Hero from '../components/Hero';
import WhyVisit from '../components/WhyVisit';
import Experiences from '../components/Experiences';
import Heritage from '../components/Heritage';
import Hotels from '../components/Hotels';
import Events from '../components/Events';
import CallToAction from '../components/CallToAction';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyVisit />
      {/* These components below are still named based on the old files */}
      {/* You may want to rename src/components/Experiences.tsx to SeeDo.tsx, etc. */}
      {/* Or, create new components for the homepage sections. */}
      <Experiences />
      <Heritage />
      <Hotels />
      <Events />
      <CallToAction />
    </>
  );
}