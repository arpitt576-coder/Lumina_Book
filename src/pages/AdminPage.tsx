import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Database, 
  Check, 
  X, 
  LayoutGrid, 
  List,
  RefreshCw
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Book, Category, storeService } from '@/services/storeService';
import { toast } from 'sonner';

const SAMPLE_BOOKS = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 15.99,
    category: "Fiction",
    description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    coverUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop",
    stock: 25,
    featured: true
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 12.50,
    category: "Classic",
    description: "Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian social science fiction novel by English novelist George Orwell. It was published on 8 June 1949 by Secker & Warburg as Orwell's ninth and final book completed in his lifetime.",
    coverUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=2070&auto=format&fit=crop",
    stock: 40,
    featured: true
  },
  {
    title: "Refactoring UI",
    author: "Adam Wathan",
    price: 79.00,
    category: "Design",
    description: "Refactoring UI is a book about designing for developers. It will teach you how to start with a clean slate and make your own UI design consistently beautiful.",
    coverUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2112&auto=format&fit=crop",
    stock: 15,
    featured: true
  }
];

const INITIAL_CATEGORIES = ["Fiction", "Classic", "Design", "Technology", "History", "Science"];

export default function AdminPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const [formData, setFormData] = useState<Partial<Book>>({
    title: '',
    author: '',
    price: 0,
    category: '',
    description: '',
    coverUrl: '',
    stock: 0,
    featured: false
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [booksData, catsData] = await Promise.all([
        storeService.getBooks(),
        storeService.getCategories()
      ]);
      setBooks(booksData);
      setCategories(catsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSeedData = async () => {
    toast.loading("Planting seeds of knowledge...");
    try {
      // Add categories first
      for (const catName of INITIAL_CATEGORIES) {
        if (!categories.find(c => c.name === catName)) {
           await storeService.addCategory({ name: catName, slug: catName.toLowerCase() });
        }
      }
      
      // Add sample books
      for (const book of SAMPLE_BOOKS) {
        await storeService.addBook(book);
      }
      
      toast.dismiss();
      toast.success("Library seeded successfully!");
      fetchData();
    } catch (error) {
      toast.dismiss();
      toast.error("Seeding failed");
      console.error(error);
    }
  };

  const handleSaveBook = async () => {
    if (!formData.title || !formData.author || !formData.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editingBook?.id) {
        await storeService.updateBook(editingBook.id, formData);
        toast.success("Book updated");
      } else {
        await storeService.addBook(formData as Omit<Book, 'id'>);
        toast.success("Book added to collection");
      }
      setIsDialogOpen(false);
      setFormData({
        title: '',
        author: '',
        price: 0,
        category: '',
        description: '',
        coverUrl: '',
        stock: 0,
        featured: false
      });
      setEditingBook(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to save book");
      console.error(error);
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure you want to remove this book from existence?")) return;
    try {
      await storeService.deleteBook(id);
      toast.success("Book removed successfully");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const openEdit = (book: Book) => {
    setEditingBook(book);
    setFormData(book);
    setIsDialogOpen(true);
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-8 pb-32">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-sans font-extrabold tracking-tight text-gray-900">Inventory <span className="text-gray-400">Control</span></h1>
          <p className="text-gray-500">Manage your library and update stock levels.</p>
        </div>
        
        <div className="flex items-center space-x-4">
           {books.length === 0 && (
             <Button variant="outline" className="border-gray-200" onClick={handleSeedData}>
               <RefreshCw size={18} className="mr-2" />
               Seed Sample Data
             </Button>
           )}
           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800 px-6 h-12 rounded-xl">
                  <Plus size={18} className="mr-2" />
                  Add New Book
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] rounded-3xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{editingBook ? 'Edit Book Master' : 'Add New Masterpiece'}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-6 py-4">
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Title</label>
                    <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. The Lord of the Rings" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Author</label>
                    <Input value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} placeholder="e.g. J.R.R. Tolkien" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Category</label>
                    <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Price ($)</label>
                    <Input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Stock</label>
                    <Input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Cover Image URL</label>
                    <Input value={formData.coverUrl} onChange={e => setFormData({...formData, coverUrl: e.target.value})} placeholder="https://unsplash.com/..." />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-gray-400">Description</label>
                    <textarea 
                      className="w-full min-h-[100px] bg-white border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      placeholder="About this book..."
                    />
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <input 
                       type="checkbox" 
                       id="featured" 
                       checked={formData.featured} 
                       onChange={e => setFormData({...formData, featured: e.target.checked})}
                       className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <label htmlFor="featured" className="text-sm font-medium">Feature on Homepage</label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-4">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button className="bg-black text-white hover:bg-gray-800 px-8" onClick={handleSaveBook}>
                    {editingBook ? 'Update Book' : 'Add to Shelf'}
                  </Button>
                </div>
              </DialogContent>
           </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-gray-100 shadow-sm col-span-1 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-gray-400">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-4xl font-mono font-bold text-gray-900">{books.length}</p>
          </CardContent>
        </Card>
        <Card className="border-gray-100 shadow-sm col-span-1 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-gray-400">Stock Value</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-4xl font-mono font-bold text-gray-900">
               ${books.reduce((acc, b) => acc + (b.price * b.stock), 0).toLocaleString()}
             </p>
          </CardContent>
        </Card>
        <div className="col-span-full md:col-span-2 flex items-end">
           <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search inventory..." 
                className="pl-10 h-14 bg-gray-50 border-gray-100" 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
           </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest pl-8 w-24">Cover</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Title & Author</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Category</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Price</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest">Stock</TableHead>
              <TableHead className="font-bold text-gray-400 uppercase text-[10px] tracking-widest text-right pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array(5).fill(0).map((_, i) => (
                <TableRow key={i}>
                  {Array(6).fill(0).map((_, j) => (
                    <TableCell key={j}><div className="h-10 bg-gray-100 animate-pulse rounded" /></TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredBooks.map((book) => (
              <TableRow key={book.id} className="group hover:bg-gray-50/50 transition-colors">
                <TableCell className="pl-8 py-4">
                  <div className="w-12 h-16 bg-gray-100 rounded-md overflow-hidden">
                    {book.coverUrl && <img src={book.coverUrl} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-bold text-gray-900">{book.title}</p>
                    <p className="text-xs text-gray-500">{book.author}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-white">{book.category}</Badge>
                </TableCell>
                <TableCell className="font-mono font-medium">${book.price.toFixed(2)}</TableCell>
                <TableCell>
                   <span className={book.stock < 5 ? "text-red-500 font-bold" : "text-gray-600"}>
                     {book.stock}
                   </span>
                </TableCell>
                <TableCell className="text-right pr-8">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-black" onClick={() => openEdit(book)}>
                      <Edit3 size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-600" onClick={() => handleDeleteBook(book.id!)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!loading && filteredBooks.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-20 text-center">
                   <div className="flex flex-col items-center space-y-3 opacity-30">
                      <Database size={48} />
                      <p className="font-bold text-xl uppercase tracking-widest">No books in inventory</p>
                   </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
