import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const handleProtectedClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      e.stopPropagation();
      alert("Please login first");
      navigate("/login", { replace: true });
    } else {
    }
  };
  return (
    <div className="container mx-auto px-4 py-8 mb-5 mt-5">
      {/* Hero Section */}
      <section className="bg-zinc-100 to-blue-500 text-dark rounded-2xl p-8 shadow-lg">
        <h1 className="text-3xl md:text-4xl font-extrabold">Pet Clinic</h1>
        <p className="mt-2 text-dark/90 max-w-2xl">
          Manage pets, appointments, and owner records - fast and easy.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/appointments"
            onClick={(e) => handleProtectedClick(e, "/appointments")}
            className="inline-flex items-center rounded-xl bg-white text-zinc-800 px-5 py-2.5 font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition"
          >
            View Appointments
          </Link>
          <Link
            to="/pets"
            onClick={(e) => handleProtectedClick(e, "/pets")}
            className="inline-flex items-center rounded-xl bg-white text-zinc-800 px-5 py-2.5 font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition"
          >
            Pet List
          </Link>
          <Link
            to="/profile"
            onClick={(e) => handleProtectedClick(e, "/profile")}
            className="inline-flex items-center rounded-xl bg-white text-zinc-800 px-5 py-2.5 font-semibold shadow hover:shadow-md hover:-translate-y-0.5 transition"
          >
            Profile
          </Link>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-8 grid gap-10 md:grid-cols-3">
        <Link
          to="/appointments"
          onClick={(e) => handleProtectedClick(e, "/appointments")}
          className="rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition bg-white"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-lg">Create Appointment</h3>
            <img
              src="/images/appointment.png"
              alt=""
              className="h-10 w-10 shrink-0 object-contain"
            />
          </div>
          <p className="text-gray-500 text-sm">Schedule an appointment quickly for a client and pet.</p>
        </Link>

        <Link
          to="/profile"
          onClick={(e) => handleProtectedClick(e, "/profile")}
          className="rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition bg-white"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-lg">Update Profile</h3>
            <img
              src="/images/profile.png"
              alt=""
              className="h-10 w-10 shrink-0 object-contain"
            />
          </div>
          {/* <div className="text-2xl"></div>
          <h3 className="mt-2 font-semibold text-lg">Update Profile</h3> */}
          <p className="text-gray-500 text-sm">Update your profile information.</p>
        </Link>

        <Link
          to="/pets"
          onClick={(e) => handleProtectedClick(e, "/pets")}
          className="rounded-2xl border border-gray-200 p-5 hover:shadow-md hover:-translate-y-0.5 transition bg-white"
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-semibold text-lg">Manage Pets</h3>
            <img
              src="/images/rabbit.png"
              alt=""
              className="h-10 w-10 shrink-0 object-contain"
            />
          </div>
          {/* <div className="text-2xl"></div>
          <h3 className="mt-2 font-semibold text-lg">Manage Pets</h3> */}
          <p className="text-gray-500 text-sm">View, edit, delete, and see treatment history.</p>
        </Link>
      </section>

      {/* Pet Gallery */}
        <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Services</h2>
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {[
            { img: "/images/pet2.png" },
            { img: "/images/pet5.png" },
            { img: "/images/doctor.png" },
            { img: "/images/vaccine.png" },
            { img: "/images/home.png" },
            { img: "/images/pet6.png" },
            ].map((pet, idx) => (
            <div
                key={idx}
                className="rounded-xl overflow-hidden shadow"
            >
                <img
                src={pet.img}
                alt=""
                className="w-full h-40 object-cover"
                />
            </div>
            ))}
        </div>
        </section>


    </div>
  );
}
