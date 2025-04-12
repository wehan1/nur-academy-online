
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-madrasah-purple flex items-center justify-center mr-2">
                <span className="text-xl font-bold text-white arabic-text">ق</span>
              </div>
              <span className="text-xl font-bold text-madrasah-purple">Virtual Madrasah</span>
            </Link>
            <p className="text-gray-600">
              Providing high-quality Islamic education online for children ages 8-16.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-madrasah-purple">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-madrasah-purple">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-madrasah-purple">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-madrasah-purple">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-madrasah-purple">Home</Link></li>
              <li><Link to="/courses" className="text-gray-600 hover:text-madrasah-purple">Courses</Link></li>
              <li><Link to="#about" className="text-gray-600 hover:text-madrasah-purple">About Us</Link></li>
              <li><Link to="#contact" className="text-gray-600 hover:text-madrasah-purple">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Curriculum</h3>
            <ul className="space-y-2">
              <li><Link to="/courses?level=1" className="text-gray-600 hover:text-madrasah-purple">Beginner Level</Link></li>
              <li><Link to="/courses?level=2" className="text-gray-600 hover:text-madrasah-purple">Foundation Level</Link></li>
              <li><Link to="/courses?level=3" className="text-gray-600 hover:text-madrasah-purple">Intermediate Level</Link></li>
              <li><Link to="/courses?level=4" className="text-gray-600 hover:text-madrasah-purple">Advanced Level</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">Email: info@virtualmadrasah.com</li>
              <li className="text-gray-600">Phone: +1 (123) 456-7890</li>
              <li className="text-gray-600">Hours: Mon-Fri, 9am-5pm</li>
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 mt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Virtual Madrasah. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
