import Hotels from '../components/Hotels';
import CallToAction from '../components/CallToAction';

export default function HotelsPage() {
  return (
    <div className="pt-16"> {/* This padding pushes content below the fixed Header */}
      <Hotels />
      <CallToAction />
    </div>
  );
}