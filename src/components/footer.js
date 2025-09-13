import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Outer container with max width & horizontal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: logo + links */}
        <div className="flex flex-col gap-10 py-10 md:flex-row md:justify-between md:items-start">
          
          {/* Logo + About */}
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-white">YourLogo</h2>
            <p className="mt-4 text-gray-400">
              Building amazing web experiences with React & Tailwind.
            </p>
          </div>

          {/* Link columns – responsive grid that wraps */}
          <div className="grid gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:w-2/3">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                Support
              </h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
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

        {/* Bottom border + copyright */}
        <div className="border-t border-gray-700 py-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
