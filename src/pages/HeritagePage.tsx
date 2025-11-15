import Heritage from '../components/Heritage';
import CallToAction from '../components/CallToAction';

export default function HeritagePage() {
  return (
    <div className="pt-16"> {/* This padding pushes content below the fixed Header */}
      <Heritage />
      {/* I'm adding CallToAction here too, to encourage booking */}
      <CallToAction /> 
    </div>
  );
} 