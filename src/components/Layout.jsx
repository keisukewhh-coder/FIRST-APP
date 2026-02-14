import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="header-logo">
            Life Compass
          </Link>
          <nav className="header-nav">
            <Link to="/about">診断について</Link>
          </nav>
        </div>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>Life Compass - 人生コンパスタイプ診断</p>
        <p className="footer-note">
          ※ この診断はエンタメ・自己理解を目的としたものであり、性格を断定するものではありません。
        </p>
      </footer>
    </div>
  );
}
