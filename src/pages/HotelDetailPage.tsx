import { useParams } from 'react-router-dom';

export default function HotelDetailPage() {
  const { id } = useParams();

  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Hotel Details
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Displaying details for hotel with ID: {id}
        </p>
      </div>
    </div>
  );
}