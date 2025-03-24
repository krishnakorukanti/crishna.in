import React from "react";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full min-h-screen flex flex-col items-center justify-center relative px-4 py-24 overflow-hidden">
      <h2 className="text-3xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in-up">Get In Touch</h2>
      
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-8 border border-zinc-800 animate-fade-in-up shadow-lg">
          <h3 className="text-xl font-bold text-zinc-100 mb-4">Contact Me</h3>
          <p className="text-zinc-400 mb-6">
            Feel free to reach out with any questions, opportunities, or just to say hello. I'll get back to you as soon as possible.
          </p>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="your.email@example.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Your message here..."
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 transition-transform duration-300">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </form>
        </div>
        
        <div className="bg-zinc-900/40 backdrop-blur-sm rounded-xl p-5 sm:p-6 md:p-8 border border-zinc-800 animate-fade-in-up shadow-lg flex flex-col">
          <h3 className="text-xl font-bold text-zinc-100 mb-4">Connect With Me</h3>
          
          <div className="space-y-6 flex-grow">
            <div>
              <h4 className="text-lg font-medium text-zinc-200 mb-2">Email</h4>
              <a 
                href="mailto:hello@crishna.in" 
                className="text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>hello@crishna.in</span>
              </a>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-zinc-200 mb-2">Location</h4>
              <p className="text-zinc-400 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>San Francisco, CA</span>
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-zinc-200 mb-2">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com/crishna_c"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors duration-300"
                  aria-label="Twitter"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a
                  href="https://github.com/crishna"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/crishnakorukanti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-zinc-400">I'm always open to discussing new projects, opportunities, or partnerships.</p>
          </div>
        </div>
      </div>
      
      {/* Scroll Up Indicator */}
      <div className="absolute bottom-10 w-full flex justify-center animate-bounce">
        <a href="#top" aria-label="Scroll to top" className="w-8 h-12 border-2 border-zinc-400 rounded-full flex items-center justify-center hover:border-blue-400 hover:scale-110 transition-all duration-300 group">
          <div className="w-1 h-3 bg-zinc-400 rounded-full group-hover:bg-blue-400 animate-bounce-slow transform rotate-180"></div>
        </a>
      </div>
    </section>
  );
} 