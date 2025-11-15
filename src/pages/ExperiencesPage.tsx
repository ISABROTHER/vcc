import Experiences from '../components/Experiences';
import CallToAction from '../components/CallToAction';

export default function ExperiencesPage() {
  return (
    <div className="pt-16"> {/* This padding pushes content below the fixed Header */}
      <Experiences />
      <CallToAction />
    </div>
  );
}