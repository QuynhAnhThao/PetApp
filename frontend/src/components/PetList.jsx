import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';

const PetList = ({ pets, setPets }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // handle delete pet
  const handleDelete = async (petId) => {
    // alert user before delete
    if (!window.confirm('Delete this pet?')) return;
    
    // if accept delete, send DELETE request
    try {
      await axiosInstance.delete(`/api/pets/${petId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      // update pet list after deletion
      setPets((prev) => prev.filter((pet) => pet._id !== petId));
    } catch {
      alert('Failed to delete pet.');
    }
  };

  // if no pet found, return no pet
  if (!pets?.length) return <p>No pets found.</p>;

  // render UI for pet
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <div
          key={pet._id}
          className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-md"
        >
          {/* content grid: text | image */}
          <div className="grid grid-cols-[1fr_auto] items-start gap-6">
            {/* left: text */}
            <div>
              <h2 className="mb-2 text-2xl font-extrabold tracking-tight">{pet.name}</h2>
              <p className="text-gray-700">
                <span className="font-semibold">Species:</span>{' '}
                <span className="text-gray-800">{pet.species}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Breed:</span>{' '}
                <span className="text-gray-800">{pet.breed}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Age:</span>{' '}
                <span className="text-gray-800">{pet.age}</span>
              </p>
            </div>

            {/* right: image */}
            <div className="h-24 w-28 shrink-0 self-center">
              <img
                src={pet.imageUrl || '/images/pet2.png'}
                alt={pet.name || 'Pet'}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          </div>

          {/* actions */}
          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/pets/${pet._id}`)}
              className="flex-1 rounded-xl bg-[#D8AF37] px-5 py-2.5 font-semibold text-white shadow hover:brightness-95"
            >
              View
            </button>
            <button
              type="button"
              onClick={() => handleDelete(pet._id)}
              className="flex-1 rounded-xl bg-[#CF4B3A] px-5 py-2.5 font-semibold text-white shadow hover:brightness-95"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetList;
