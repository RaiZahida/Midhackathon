import React from "react";
export default function Footer() {
  return (
    <footer className="bg-[#778da9] text-white">
      {/* Outer container with max width & horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: logo + links */}
        <div className="flex flex-col gap-10 py-10 md:flex-row md:justify-between md:items-start">
          
          {/* Brand Name + About */}
          <div className="md:w-1/3 flex flex-col items-center md:items-start">
            <h1 className="text-4xl font-extrabold text-[#0D1B2A] mb-2">Z Events</h1>
            <p className="mt-4 text-white text-center md:text-left max-w-xs">
              Building amazing web experiences with React & Tailwind.
            </p>
          </div>

          {/* Link columns – responsive grid that wraps */}
          <div className="grid gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:w-2/3">
            <div>
              <h3 className="text-sm font-semibold text-[#0D1B2A] uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0D1B2A] uppercase tracking-wider">
                Support
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[#0D1B2A] uppercase tracking-wider">
                Follow Us
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">GitHub</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border + copyright */}
      <div className="border-t border-white py-6 text-center bg-[#0d1b2a]">
        <p className="text-white text-sm">
          © {new Date().getFullYear()} Z Events. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
