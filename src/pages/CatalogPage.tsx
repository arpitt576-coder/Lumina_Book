import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, SlidersHorizontal, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, Category, storeService } from '@/services/storeService';
import { BookCard } from '@/components/books/BookCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [booksData, catsData] = await Promise.all([
          storeService.getBooks(),
          storeService.getCategories()
        ]);
        setBooks(booksData);
        setCategories(catsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <header className="space-y-6">
        <h1 className="text-5xl font-sans font-extrabold tracking-tighter text-gray-900">Explore our <span className="text-gray-400">Library</span></h1>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search by title or author..." 
              className="pl-10 h-12 bg-gray-50 border-gray-100 focus:bg-white transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2 w-full overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
             <Button 
               variant={selectedCategory === 'All' ? 'default' : 'outline'} 
               size="sm"
               className="rounded-full px-6"
               onClick={() => setSelectedCategory('All')}
             >
               All
             </Button>
             {categories.map(cat => (
               <Button 
                 key={cat.id} 
                 variant={selectedCategory === cat.name ? 'default' : 'outline'} 
                 size="sm"
                 className="rounded-full px-6 whitespace-nowrap"
                 onClick={() => setSelectedCategory(cat.name)}
               >
                 {cat.name}
               </Button>
             ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))
        ) : filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <BookCard key={book.id} book={book} index={index} />
          ))
        ) : (
          <div className="col-span-full py-32 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <BookOpen size={64} className="mx-auto text-gray-200 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              We couldn't find any books matching your current search or category filter.
            </p>
            <Button 
               variant="link" 
               className="text-black font-bold mt-4" 
               onClick={() => {
                 setSelectedCategory('All');
                 setSearchQuery('');
               }}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
