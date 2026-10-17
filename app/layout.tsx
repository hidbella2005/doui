import type { Metadata } from 'next';
import './globals.css';
import { DouiMark } from '../components/brand/DouiMark';

export const metadata: Metadata = {
  title: 'Doui — care that fits your life',
  description: 'Find a verified therapist and take your next step with clarity.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a className="brand" href="/" aria-label="Doui home">
            <DouiMark />
            <span>Doui</span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#care-team">Our care team</a>
            <a className="nav-cta" href="/onboarding">Find your fit</a>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <span>© 2026 Doui</span>
          <span>Built for thoughtful care in Morocco.</span>
        </footer>
      </body>
    </html>
  );
}
