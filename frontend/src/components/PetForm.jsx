import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const PetForm = ({ pets, setPets, editingPet, setEditingPet }) => {
  const { user } = useAuth();
  // form data state for all input fields
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    owner: {
      name: '',
      phone: '',
      email: ''
    }
  });
  // populate form fields when editing an existing pet
  useEffect(() => {
    if (editingPet) {
      setFormData({
        name: editingPet.name || '',
        species: editingPet.species || '',
        breed: editingPet.breed || '',
        age: editingPet.age || '',
        owner: editingPet.owner || { name: '', phone: '', email: '' }
      });
    } else {
      // if no pet is being edited, reset form to empty values
      setFormData({
        name: '',
        species: '',
        breed: '',
        age: '',
        owner: {
          name: '',
          phone: '',
          email: ''
        }
      });
    }
  }, [editingPet]);

  // handle form submission for creating or updating a pet
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPet) {
        // update existing pet
        const response = await axiosInstance.put(`/api/pets/${editingPet._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // update pet in local state
        setPets(pets.map((pet) => (pet._id === response.data._id ? response.data : pet)));
      } else {
        // create new pet
        const response = await axiosInstance.post('/api/pets', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        // add new pet to local state
        setPets([...pets, response.data]);
      }
      // reset form and exit edit mode
      setEditingPet(null);
      setFormData({
        name: '',
        species: '',
        breed: '',
        age: '',
        owner: { name: '', phone: '', email: '' }
      });
    } catch (error) {
      alert('Failed to save pet.');
    }
  };

  // handle changes in owner details
  const handleOwnerChange = (e) => {
    setFormData({
      ...formData,
      owner: { ...formData.owner, [e.target.name]: e.target.value },
    });
  };

  // render the form
  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingPet ? 'Edit Pet' : 'Add Pet'}</h1>
      {/* Form */}
      <input
        type="text"
        placeholder="Pet Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Species"
        value={formData.species}
        onChange={(e) => setFormData({ ...formData, species: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Breed"
        value={formData.breed}
        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        name="name"
        placeholder="Owner Name"
        value={formData.owner.name}
        onChange={handleOwnerChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        name="phone"
        placeholder="Owner Phone"
        value={formData.owner.phone}
        onChange={handleOwnerChange}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        placeholder="Owner Email"
        value={formData.owner.email}
        onChange={handleOwnerChange}
        className="w-full mb-4 p-2 border rounded"
      />
      {/* Submit button */}
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingPet ? 'Update Pet' : 'Add Pet'}
      </button>
    </form>
  );
};

export default PetForm;