"use client"; // Add this at the top

// pages/index.tsx
import { useState } from 'react';
import Modal from '../components/Modal'; // Adjust the path as necessary
import { FaBars } from 'react-icons/fa'; // Import FaBars icon
import Link from 'next/link';

const HomePage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-14">
            {/* Logo and Search Input */}
            <div className="flex items-center">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <img
                  src="https://cdn.prod.website-files.com/600ee75084e3fe0e5731624c/65b6384089ec9e265952391f_bookmyshow-logo-vector-removebg-preview%20(1).png"
                  alt="Logo"
                  className="h-8 w-24 mr-4"
                />
              </Link>
              {/* Search Input */}
              <div className="w-full">
                <input
                  type="text"
                  className="w-[500px] h-8 px-2 py-2 border border-gray-200 rounded-md text-sm bg-white placeholder-gray-500"
                  placeholder="Search..."
                  onClick={openModal} // Open modal on click
                />
              </div>
            </div>

            {/* Dropdown Menu and Buttons */}
            <div className="flex items-center space-x-2">
              <div className="ml-3 relative">
                <button
                  onClick={toggleDropdown}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Dropdown
                </button>

                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Option 1
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Option 2
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Option 3
                    </a>
                  </div>
                )}
              </div>

              <button className="bg-red-500 text-white text-xs py-1 px-3 rounded-full">
                Sign in
              </button>

              {/* Hamburger Icon */}
              <button className="ml-2 text-gray-700">
                <FaBars className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Page Modal */}
      <Modal isOpen={modalOpen} onClose={closeModal} />
    </div>
  );
};

export default HomePage;

