import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Eye } from 'lucide-react';
import { Book } from '@/services/storeService';

interface BookCardProps {
  book: Book;
  index?: number;
}

export function BookCard({ book, index = 0 }: BookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden border-bento-border bg-white rounded-3xl shadow-none hover:border-bento-primary transition-all duration-300">
        <div className="aspect-[3/4] overflow-hidden relative p-4">
          <div className="w-full h-full bg-bento-card rounded-2xl overflow-hidden relative book-shadow">
            {book.coverUrl ? (
              <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-bento-border text-bento-muted">
                <span className="font-serif italic text-xs">No Cover</span>
              </div>
            )}
            
            <div className="absolute inset-0 bg-bento-dark/0 group-hover:bg-bento-dark/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Link to={`/book/${book.id}`}>
                <Button size="icon" variant="secondary" className="rounded-xl h-10 w-10 shadow-lg bg-white text-bento-primary hover:bg-bento-primary hover:text-white">
                  <Eye size={18} />
                </Button>
              </Link>
            </div>
          </div>
          
          {book.featured && (
            <div className="absolute top-6 right-6">
              <Badge className="bg-bento-primary text-white border-0 text-[10px] uppercase font-bold tracking-tighter">Featured</Badge>
            </div>
          )}
        </div>
        
        <CardContent className="pt-0 pb-2 px-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-bento-muted mb-1">{book.category}</p>
          <h3 className="font-serif font-bold text-bento-text group-hover:text-bento-primary transition-colors text-lg line-clamp-1 leading-tight">
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </h3>
          <p className="text-xs text-bento-muted font-medium line-clamp-1 italic">by {book.author}</p>
        </CardContent>
        
        <CardFooter className="pt-2 pb-6 px-6 flex items-center justify-between">
          <span className="font-serif font-bold text-bento-primary text-lg">${book.price.toFixed(2)}</span>
          <Button variant="ghost" size="sm" className="h-8 px-3 rounded-xl bg-bento-card text-bento-text hover:bg-bento-primary hover:text-white transition-colors group/btn">
            <ShoppingCart size={14} className="mr-2" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Add</span>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
