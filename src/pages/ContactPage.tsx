import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you shortly.");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <header className="max-w-3xl space-y-6">
        <h1 className="text-6xl font-sans font-extrabold tracking-tighter text-gray-900 leading-[0.9]">
          Let's Start a <br />
          <span className="text-gray-400 italic font-serif font-light underline decoration-gray-200 underline-offset-8">New Chapter</span>
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed">
          Whether you're looking for a specific title, need recommendations, or just want to talk books, we're all ears.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Contact Form */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="space-y-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                <Input required placeholder="Jane Doe" className="h-14 bg-gray-50/50 border-gray-100 focus:bg-white text-lg" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                <Input required type="email" placeholder="jane@example.com" className="h-14 bg-gray-50/50 border-gray-100 focus:bg-white text-lg" />
              </div>
            </div>
            
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Subject</label>
               <Input required placeholder="How can we help?" className="h-14 bg-gray-50/50 border-gray-100 focus:bg-white text-lg" />
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
               <textarea 
                 required
                 className="w-full min-h-[200px] bg-gray-50/50 border border-gray-100 rounded-2xl p-4 text-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:bg-white transition-all shadow-inner"
                 placeholder="Tell us what's on your mind..."
               />
            </div>

            <Button 
               disabled={loading}
               className="w-full md:w-auto h-16 px-12 bg-black text-white hover:bg-gray-800 rounded-2xl text-lg font-bold shadow-xl shadow-black/10 flex items-center justify-center space-x-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
              {!loading && <Send size={20} />}
            </Button>
          </form>
        </motion.div>

        {/* Info Column */}
        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Email Us</h3>
              <p className="text-gray-500">Fast responses during business hours.</p>
              <p className="font-mono font-bold text-black group-hover:underline">support@lumina.com</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
              <p className="text-gray-500">Mon-Fri from 9am to 6pm.</p>
              <p className="font-mono font-bold text-black">+1 (555) 000-0000</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Visit Us</h3>
              <p className="text-gray-500">Come say hi at our HQ.</p>
              <p className="font-mono font-bold text-black">123 Bibliophile Pl, BK</p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Live Chat</h3>
              <p className="text-gray-500">Available on our website.</p>
              <p className="font-mono font-bold text-black">24/7 Availability</p>
            </div>
          </div>

          <Card className="bg-gray-900 border-0 text-white rounded-[40px] overflow-hidden group">
            <CardContent className="p-12 space-y-8">
              <h3 className="text-3xl font-bold">Join the community</h3>
              <p className="text-gray-400 text-lg">Follow us for literary events, author interviews, and new release alerts.</p>
              <div className="flex space-x-6">
                <Button variant="ghost" size="icon" className="h-12 w-12 bg-white/5 hover:bg-white/10 text-white rounded-xl">
                  <Github size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 bg-white/5 hover:bg-white/10 text-white rounded-xl">
                  <Twitter size={24} />
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 bg-white/5 hover:bg-white/10 text-white rounded-xl">
                  <Linkedin size={24} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
