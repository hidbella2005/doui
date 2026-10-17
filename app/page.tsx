import { DouiMark } from '../components/brand/DouiMark';

const steps = [
  ['01', 'Tell us what support could look like'],
  ['02', 'Explore people who match your needs'],
  ['03', 'Choose a pace and format that feels right'],
];

export default function HomePage() {
  return (
    <main>
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow">A softer way to start</p>
          <h1>Make room for the life you want to feel.</h1>
          <p className="hero-text">Doui helps you find a verified therapist whose approach, language, and availability fit your real life.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/onboarding">Find your care fit <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#how-it-works">See how Doui works</a>
          </div>
          <p className="microcopy">Private by design · You stay in control · Not an emergency service</p>
        </div>
        <div className="hero-art" aria-label="Illustration of two abstract overlapping shapes" role="img">
          <div className="sun-orb" />
          <div className="soft-arch"><DouiMark /></div>
          <div className="hero-note">A little support<br />can change the shape<br />of a hard day.</div>
        </div>
      </section>

      <section id="how-it-works" className="steps-section page-shell">
        <div className="section-intro"><p className="eyebrow">A clear first step</p><h2>Care that starts with listening.</h2></div>
        <div className="step-grid">{steps.map(([number, text]) => <div className="step-card" key={number}><span>{number}</span><p>{text}</p></div>)}</div>
      </section>

      <section id="care-team" className="trust-section page-shell">
        <div><p className="eyebrow">Built around your context</p><h2>Human guidance, without the guesswork.</h2></div>
        <div className="trust-list"><p><strong>Verified professionals.</strong> We review credentials before a therapist joins the Doui care team.</p><p><strong>Your language matters.</strong> Find support in Arabic, French, English, and the languages your therapist speaks.</p><p><strong>Your choice stays central.</strong> Matching is a helpful starting point, never a diagnosis or a decision made for you.</p></div>
      </section>
    </main>
  );
}
