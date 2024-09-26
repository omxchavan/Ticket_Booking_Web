import { useParams } from 'react-router-dom';

const MuseumDetails = () => {
  const { id } = useParams();

  // Fetch museum details based on the ID
  // This could be from an API, static data, or context.
  const museums = [
    { id: 1, name: "National Museum", city: "Delhi", description: "Discover India's rich history and heritage." },
    { id: 2, name: "Indian Museum", city: "Kolkata", description: "Explore one of the oldest museums in the world." },
    { id: 3, name: "Chhatrapati Shivaji Maharaj Museum", city: "Mumbai", description: "Experience the art and culture of India." },
  ];

  const museum = museums.find(museum => museum.id === parseInt(id));

  if (!museum) {
    return <div>Museum not found</div>;
  }

  return (
    <div className="museum-details container mt-5">
      <h2>{museum.name}</h2>
      <p>{museum.city}</p>
      <p>{museum.description}</p>
    </div>
  );
};

export default MuseumDetails;
