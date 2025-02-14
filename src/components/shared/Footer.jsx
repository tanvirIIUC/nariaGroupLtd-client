const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mb-0">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Naria Group Ltd</h2>
            <p className="text-gray-400">
              Empowering businesses with modern web solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">About Us</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="/" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
           
          
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Naria Group Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
