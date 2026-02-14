import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/60 backdrop-blur-sm sticky top-0 z-10 border-b border-coral/20">
        <div className="max-w-2xl mx-auto px-5 py-3 flex justify-between items-center">
          <Link to="/" className="text-lg font-bold text-vivid-pink hover:text-coral-dark transition-colors no-underline">
            都会の動物ゲス診断
          </Link>
        </div>
      </header>
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-6 pb-12">
        {children}
      </main>
      <footer className="bg-white/40 border-t border-coral/20 py-4 px-5 text-center text-xs text-text-secondary">
        <p>都会の動物ゲス診断</p>
        <p className="mt-1 text-[0.7rem]">
          ※ この診断はエンタメを目的としたものであり、性格を断定するものではありません。
        </p>
      </footer>
    </div>
  );
}
