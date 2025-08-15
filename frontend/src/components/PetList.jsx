// import { useAuth } from '../context/AuthContext';
// import axiosInstance from '../axiosConfig';

// const PetList = ({ pets, setPets, setEditingPet }) => {
//   const { user } = useAuth();

//   // handle deleting pet by petid
//   const handleDelete = async (petId) => {
//     // alert user before delete
//     if (!window.confirm('Delete this pet?')) return;
    
//     // if accept delete, send DELETE request
//     try {
//       await axiosInstance.delete(`/api/pets/${petId}`, {
//         headers: { Authorization: `Bearer ${user.token}` },
//       });
//       // remove deleted pet from local state
//       setPets(pets.filter((pet) => pet._id !== petId));
//     } catch (error) {
//       alert('Failed to delete pet.');
//     }
//   };

//   // render a list of pets
//   return (
//     <div>
//       {pets.map((pet) => (
//         <div key={pet._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
//         {/* Pet details */}
//           <h2 className="font-bold">{pet.name}</h2>
//           <p>Species: {pet.species}</p>
//           <p>Breed: {pet.breed}</p>
//           <p>Age: {pet.age}</p>

//         {/* Owner details */}
//           <p className="mt-2 font-semibold">Owner:</p>
//           <p>Name: {pet.owner?.name}</p>
//           <p>Phone: {pet.owner?.phone}</p>
//           <p>Email: {pet.owner?.email}</p>
//           <p>Address: {pet.owner?.address}</p>
          
//         {/* Buttons */}
//           <div className="mt-2">
//             <button
//               onClick={() => setEditingPet(pet)}
//               className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
//             >
//               Edit
//             </button>
//             <button
//               onClick={() => handleDelete(pet._id)}
//               className="bg-red-500 text-white px-4 py-2 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PetList;

import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const PetList = ({ pets, setPets, setEditingPet }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDelete = async (petId) => {
        try {
        await axiosInstance.delete(`/api/pets/${petId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        setPets(pets.filter((pet) => pet._id !== petId));
        } catch (error) {
        alert('Failed to delete pet.');
        }
    };

    return (
        <div>
        {pets.map((pet) => (
            <div key={pet._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
            <h2 className="font-bold">{pet.name}</h2>
            <p>Species: {pet.species}</p>
            <p>Breed: {pet.breed}</p>
            <p>Age: {pet.age}</p>
            <p className="mt-2 font-semibold">Owner:</p>
            <p>Name: {pet.owner?.name}</p>
            <p>Phone: {pet.owner?.phone}</p>
            <p>Email: {pet.owner?.email}</p>
            <p>Address: {pet.owner?.address}</p>

            <div className="mt-2 flex gap-2">
                <button
                onClick={() => navigate(`/pets/${pet._id}`)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                View
                </button>
                <button
                onClick={() => setEditingPet(pet)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                Edit
                </button>
                <button
                onClick={() => handleDelete(pet._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
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