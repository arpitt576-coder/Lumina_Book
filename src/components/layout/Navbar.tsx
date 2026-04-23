import { 
  Home, 
  BookOpen, 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram 
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav 
      id="main-nav"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled ? "bg-white/80 backdrop-blur-md h-16 border-gray-200 shadow-sm" : "bg-transparent h-20 border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-bento-primary text-white rounded flex items-center justify-center font-bold text-xl serif">
            L
          </div>
          <h1 className="text-2xl font-bold tracking-tight serif text-bento-text">LUMINA</h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium uppercase tracking-widest transition-colors hover:text-bento-primary",
                location.pathname === link.path ? "text-bento-primary" : "text-bento-muted"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-bento-muted" size={14} />
              <Input 
                placeholder="Search..." 
                className="bg-white border-bento-border rounded-full py-2 px-4 pl-9 text-xs w-40 outline-none focus:border-bento-primary transition-all focus:w-48"
              />
            </div>
            <Button variant="ghost" size="icon" className="w-8 h-8 bg-bento-border rounded-full flex items-center justify-center text-xs">
              <ShoppingCart size={16} />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-500 hover:text-black p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4 shadow-lg md:hidden"
          >
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2",
                    location.pathname === link.path ? "text-black" : "text-gray-500"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black text-white rounded-md flex items-center justify-center">
              <BookOpen size={18} />
            </div>
            <span className="font-sans font-bold text-lg tracking-tight text-gray-900">LuminaBooks</span>
          </Link>
          <p className="text-sm text-gray-500 leading-relaxed">
            Curating the finest literature for curious minds. Your journey through stories starts here.
          </p>
          <div className="flex space-x-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-black">
              <Facebook size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-black">
              <Twitter size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-black">
              <Instagram size={18} />
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-gray-900 mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-black transition-colors">Home</Link></li>
            <li><Link to="/catalog" className="hover:text-black transition-colors">Catalog</Link></li>
            <li><Link to="/contact" className="hover:text-black transition-colors">Contact</Link></li>
            <li><Link to="/admin" className="hover:text-black transition-colors">Admin Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-gray-900 mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="mt-0.5 text-gray-400 shrink-0" />
              <span>123 bibliophile Lane, Booktown, BK 56789</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-gray-400 shrink-0" />
              <span>+1 (234) 567-890</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-400 shrink-0" />
              <span>hello@luminabooks.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-sm uppercase tracking-wider text-gray-900 mb-6">Newsletter</h4>
          <p className="text-sm text-gray-500 mb-6">Get the latest book releases and exclusive deals.</p>
          <div className="flex space-x-2">
            <Input placeholder="Email address" className="bg-white border-gray-200" />
            <Button className="bg-black text-white hover:bg-gray-800 shrink-0">Join</Button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs text-gray-400">&copy; 2026 Lumina Books. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link to="#" className="text-xs text-gray-400 hover:text-black">Privacy Policy</Link>
          <Link to="#" className="text-xs text-gray-400 hover:text-black">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
