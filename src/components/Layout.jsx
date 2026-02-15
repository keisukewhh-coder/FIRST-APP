import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-10 border-b border-coral/20">
        <div className="max-w-2xl mx-auto px-5 py-3 flex justify-between items-center">
          <Link to="/" className="text-base font-bold text-vivid-pink hover:text-coral-dark transition-colors no-underline">
            裏の顔 覗き見診断
          </Link>
        </div>
      </header>
      <main className="flex-1 max-w-2xl w-full mx-auto px-5 py-6 pb-12">
        {children}
      </main>
      <footer className="bg-card/60 border-t border-coral/20 py-4 px-5 text-center text-xs text-text-secondary">
        <p>裏の顔 覗き見診断（悪趣味エンタメ）</p>
        <p className="mt-1 text-[0.7rem]">
          ※ 勝手に覗き見た結果です。本気にしないでね。
        </p>
      </footer>
    </div>
  );
}
