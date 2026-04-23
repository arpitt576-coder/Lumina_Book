import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Book {
  id?: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
  coverUrl?: string;
  stock: number;
  featured: boolean;
  createdAt?: any;
}

export interface Category {
  id?: string;
  name: string;
  slug: string;
}

const BOOKS_COLLECTION = 'books';
const CATEGORIES_COLLECTION = 'categories';

export const storeService = {
  // Books
  async getBooks() {
    const q = query(collection(db, BOOKS_COLLECTION), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
  },

  async getFeaturedBooks() {
    const q = query(collection(db, BOOKS_COLLECTION), where('featured', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
  },

  async getBooksByCategory(category: string) {
    const q = query(collection(db, BOOKS_COLLECTION), where('category', '==', category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Book));
  },

  async getBook(id: string) {
    const docRef = doc(db, BOOKS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Book;
    }
    return null;
  },

  async addBook(book: Omit<Book, 'id'>) {
    return await addDoc(collection(db, BOOKS_COLLECTION), {
      ...book,
      createdAt: serverTimestamp(),
    });
  },

  async updateBook(id: string, book: Partial<Book>) {
    const docRef = doc(db, BOOKS_COLLECTION, id);
    return await updateDoc(docRef, book);
  },

  async deleteBook(id: string) {
    const docRef = doc(db, BOOKS_COLLECTION, id);
    return await deleteDoc(docRef);
  },

  // Categories
  async getCategories() {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
  },

  async addCategory(category: Omit<Category, 'id'>) {
    return await addDoc(collection(db, CATEGORIES_COLLECTION), category);
  }
};
