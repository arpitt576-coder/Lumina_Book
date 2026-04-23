import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Star, Zap, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Book, storeService } from '@/services/storeService';
import { BookCard } from '@/components/books/BookCard';
import { Link } from 'react-router-dom';

export function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const books = await storeService.getFeaturedBooks();
        setFeaturedBooks(books);
      } catch (error) {
        console.error("Error fetching featured books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Bento Grid Hero */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[140px] md:auto-rows-[110px]">
        {/* Main Featured Card */}
        <div className="md:col-span-4 md:row-span-6 bg-bento-primary rounded-[40px] p-8 flex flex-col justify-between text-white relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.3em] opacity-80">Featured Read</span>
            {featuredBooks.length > 0 ? (
              <>
                <h2 className="text-4xl serif mt-4 mb-2 leading-tight">{featuredBooks[0].title}</h2>
                <p className="text-sm opacity-80 italic font-medium">by {featuredBooks[0].author}</p>
              </>
            ) : (
              <>
                <h2 className="text-4xl serif mt-4 mb-2 leading-tight">The Midnight<br/>Library</h2>
                <p className="text-sm opacity-80 italic font-medium">by Matt Haig</p>
              </>
            )}
          </div>
          
          <div className="w-44 h-64 bg-white rounded-xl mx-auto book-shadow mt-4 relative z-10 overflow-hidden text-bento-text p-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
             {featuredBooks.length > 0 && featuredBooks[0].coverUrl ? (
               <img src={featuredBooks[0].coverUrl} className="w-full h-full object-cover rounded-lg" />
             ) : (
               <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center border-l-8 border-bento-dark bg-bento-card">
                 <div className="text-bento-dark serif font-bold text-lg">Lumina Books</div>
                 <div className="w-8 h-0.5 bg-bento-dark my-4"></div>
                 <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Masterpiece</div>
               </div>
             )}
          </div>
          
          <Button size="lg" className="bg-white text-bento-primary py-6 rounded-2xl font-bold text-sm tracking-wide mt-6 relative z-10 hover:bg-bento-card-light transition-colors shadow-lg">
            Add to Cart — ${featuredBooks.length > 0 ? featuredBooks[0].price.toFixed(2) : '18.99'}
          </Button>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-black/10 rounded-full blur-3xl group-hover:bg-black/20 transition-colors" />
        </div>

        {/* Messaging/Hero Text Card */}
        <div className="md:col-span-5 md:row-span-3 bg-white rounded-[40px] p-8 border border-bento-border flex flex-col justify-center gap-4">
           <h1 className="text-5xl font-bold tracking-tighter serif leading-[0.9] text-bento-text">
             CURATING <span className="text-bento-primary italic font-light">STORIES</span> <br /> FOR CURIOUS MINDS.
           </h1>
           <p className="text-sm text-bento-muted max-w-sm font-medium leading-relaxed">
             From lost classics to modern masterpieces, lumina is your sanctuary for distinct literature.
           </p>
           <div className="flex gap-3 mt-2">
             <Link to="/catalog">
               <Button className="bg-bento-text text-white rounded-xl px-6 font-bold text-sm h-11 hover:bg-bento-primary">Explore All</Button>
             </Link>
             <Button variant="outline" className="rounded-xl px-6 font-bold text-sm h-11 border-bento-border">Collection</Button>
           </div>
        </div>

        {/* Stats Bento Card */}
        <div className="md:col-span-3 md:row-span-4 bg-bento-dark rounded-[40px] p-8 text-white flex flex-col group">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-60">Inventory Stats</h3>
            <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-bold animate-pulse">LIVE</span>
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div className="border-b border-white/10 pb-4 group-hover:border-bento-primary transition-colors">
              <div className="text-4xl serif tracking-tighter">1,248</div>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">Total Titles</div>
            </div>
            <div className="border-b border-white/10 pb-4 group-hover:border-bento-primary transition-colors">
              <div className="text-4xl serif tracking-tighter">142</div>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">New Authors</div>
            </div>
            <div>
              <div className="text-4xl serif tracking-tighter">24</div>
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-40 mt-1">Categories</div>
            </div>
          </div>
          <Link to="/admin" className="mt-8">
            <Button className="w-full py-6 bg-bento-primary rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-transform hover:scale-[1.02]">
              Admin Dashboard
            </Button>
          </Link>
        </div>

        {/* Featured Categories Card */}
        <div className="md:col-span-5 md:row-span-3 bg-bento-card-light rounded-[40px] p-8 border border-bento-border flex flex-col justify-between">
           <h3 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-bento-muted mb-4 text-center md:text-left">Trending Shelves</h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Modern', icon: '📚' },
                { label: 'Science', icon: '🧪' },
                { label: 'History', icon: '📜' },
                { label: 'Design', icon: '🎨' }
              ].map((cat) => (
                <div key={cat.label} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 hover:bg-bento-primary hover:text-white transition-all cursor-pointer shadow-sm group/cat">
                  <span className="text-2xl group-hover/cat:scale-110 transition-transform">{cat.icon}</span>
                  <span className="font-bold text-[10px] uppercase tracking-tighter">{cat.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Support Card */}
        <div className="md:col-span-3 md:row-span-2 bg-white rounded-[40px] p-8 border border-bento-border flex items-center gap-6 group hover:border-bento-primary transition-all">
          <div className="w-12 h-12 rounded-2xl bg-bento-card flex items-center justify-center text-xl group-hover:bg-bento-primary group-hover:text-white transition-colors">📞</div>
          <div>
            <div className="text-sm font-bold text-bento-text">Curator Support</div>
            <div className="text-[10px] font-bold uppercase text-bento-muted tracking-widest mt-1">24/7 Availability</div>
          </div>
        </div>
      </section>

      {/* Featured Section (Rest of the page) */}
      <section className="space-y-12 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
          <div className="space-y-3">
            <h2 className="text-4xl font-sans font-extrabold tracking-tight text-gray-900">Curated <span className="font-serif italic font-normal text-gray-400">Specials</span></h2>
            <p className="text-gray-500 max-w-lg">Our editors' choice of the most compelling reads this month.</p>
          </div>
          <Link to="/catalog">
            <Button variant="link" className="text-orange-600 p-0 font-bold items-center group">
              View all books
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 animate-pulse rounded-2xl" />
            ))
          ) : featuredBooks.length > 0 ? (
            featuredBooks.map((book, index) => (
              <BookCard key={book.id} book={book} index={index} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Featured Books Yet</h3>
              <p className="text-gray-400 max-w-xs mx-auto mb-6">Head over to the admin panel to add some treasures to our shelf.</p>
              <Link to="/admin">
                 <Button variant="outline">Go to Admin</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-amber-500">
              <Zap size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Fast Delivery</h3>
            <p className="text-gray-500 leading-relaxed">
              We know you can't wait to dive in. Our logistics network ensures your books reach you in record time.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-500">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Secure Payments</h3>
            <p className="text-gray-500 leading-relaxed">
               Your trust is our priority. Every transaction is encrypted and protected by world-class standards.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-500">
              <Star size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Expert Curation</h3>
            <p className="text-gray-500 leading-relaxed">
              Not sure what to read? Our team of bibliophiles carefully selects every title in our collection.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
