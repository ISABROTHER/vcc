import Events from '../components/Events';
import CallToAction from '../components/CallToAction';

export default function EventsPage() {
  return (
    <div className="pt-16"> {/* This padding pushes content below the fixed Header */}
      <Events />
      <CallToAction />
    </div>
  );
}