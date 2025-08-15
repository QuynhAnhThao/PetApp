import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';
import PetForm from '../components/PetForm';
import PetList from '../components/PetList';

const Pets = () => {
    const { user } = useAuth();
    const [pets, setPets] = useState([]);
    const [editingPet, setEditingPet] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Fetch pets from backend
    const fetchPets = useCallback(async () => {
        if (!user?.token) return;
        try {
        setLoading(true);
        // send GET request to get pets
        const res = await axiosInstance.get('/api/pets', {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        // update pets in local state
        setPets(res.data || []);
        } catch {
        alert('Failed to fetch pets.');
        } finally {
        setLoading(false);
        }
    }, [user?.token]);

    useEffect(() => {
        fetchPets();
    }, [fetchPets]);

    
    const handleCreateClick = () => {
        setEditingPet(null); 
        setShowForm((v) => !v);
    };

    return (
        <div className="container mx-auto px-4 py-8 mb-5 mt-5">
        {/* Page header */}
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold">All Pets</h1>
            <button
            onClick={handleCreateClick}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
            {showForm ? 'Close' : 'Add Pet'}
            </button>
        </div>

        {/* Optional loading indicator */}
        {loading && <p className="text-sm text-gray-500 mb-4">Loading pets…</p>}

        {/* Create / Edit form (uses create mode if editingPet is null) */}
        {showForm && (
            <div className="mb-6">
            <PetForm
                pets={pets}
                setPets={setPets}
                editingPet={editingPet}
                setEditingPet={setEditingPet}
            />
            </div>
        )}

        {/* Empty state */}
        {!pets?.length ? (
            <p>No pets found.</p>
        ) : (
            <PetList
            pets={pets}
            setPets={setPets}
            setEditingPet={(pet) => {
                setEditingPet(pet);   // put form into edit mode
                setShowForm(true);    // ensure the form is visible when editing
            }}
            />
        )}
        </div>
    );
};

export default Pets;
