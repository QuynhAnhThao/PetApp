import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Logo / Brand */}
        <div className="font-semibold text-lg">Pet Clinic</div>

        {/* Links */}
        <div className="flex gap-4 text-sm">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/" className="hover:underline">
            About
          </Link>
          <Link to="/" className="hover:underline">
            Contact
          </Link>
          <Link to="/" className="hover:underline">
            Privacy
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/80">
          © {new Date().getFullYear()} Pet Clinic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
