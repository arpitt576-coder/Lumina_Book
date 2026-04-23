import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  CheckCircle2, 
  Truck, 
  RotateCcw,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Book, storeService } from '@/services/storeService';
import { toast } from 'sonner';

export default function BookDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      try {
        const data = await storeService.getBook(id);
        if (data) {
          setBook(data);
        } else {
          toast.error("Book not found");
          navigate('/catalog');
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, navigate]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-32 text-center">Loading masterpieces...</div>;
  }

  if (!book) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/catalog">
        <Button variant="ghost" className="mb-8 text-gray-500 hover:text-black group">
          <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Catalog
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image Column */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100"
        >
          {book.coverUrl ? (
            <img 
              src={book.coverUrl} 
              alt={book.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
               <span className="font-sans text-xl uppercase tracking-widest italic">No Cover Available</span>
            </div>
          )}
          {book.featured && (
             <div className="absolute top-6 right-6">
                <Badge className="bg-amber-500 text-white px-4 py-1 text-sm">Best Seller</Badge>
             </div>
          )}
        </motion.div>

        {/* Content Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-100 px-4 py-1">
              {book.category}
            </Badge>
            <h1 className="text-5xl font-sans font-extrabold tracking-tight text-gray-900 leading-tight">
              {book.title}
            </h1>
            <p className="text-2xl text-gray-400 font-serif italic">by {book.author}</p>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-4xl font-mono font-bold text-gray-900">${book.price.toFixed(2)}</span>
            <div className="flex items-center space-x-1 text-amber-500">
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" />
               <Star size={16} fill="currentColor" className="opacity-30" />
               <span className="text-gray-400 text-sm ml-2 font-medium">(4.2 / 128 reviews)</span>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {book.description || "No description available for this masterpiece yet. Dive in and discover its secrets yourself."}
          </p>

          <Separator className="bg-gray-100" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <Truck size={18} className="text-gray-400" />
              <span>Free Worldwide Shipping</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <RotateCcw size={18} className="text-gray-400" />
              <span>30-Day Easy Returns</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <CheckCircle2 size={18} className="text-green-500" />
              <span>In Stock: {book.stock} copies</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="flex-1 h-16 text-lg bg-black text-white hover:bg-gray-800 rounded-2xl shadow-xl shadow-black/10">
              <ShoppingCart size={20} className="mr-3" />
              Add to Shopping Cart
            </Button>
            <Button size="lg" variant="outline" className="h-16 w-16 rounded-2xl border-gray-200">
              <Heart size={20} className="text-gray-400" />
            </Button>
            <Button size="lg" variant="outline" className="h-16 w-16 rounded-2xl border-gray-200">
              <Share2 size={20} className="text-gray-400" />
            </Button>
          </div>
          
          <p className="text-center text-xs text-gray-400 font-medium">Standard shipping arrives in 3-5 business days</p>
        </div>
      </div>
    </div>
  );
}
