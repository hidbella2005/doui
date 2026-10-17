'use client';

import { useState } from 'react';

const questions = [
  { title: 'What would you like support with?', options: ['Stress or feeling overwhelmed', 'Relationships and communication', 'Confidence and self-understanding', 'A transition or difficult season'] },
  { title: 'What language would feel most natural?', options: ['Arabic', 'French', 'English', 'I am comfortable with more than one'] },
  { title: 'What kind of sessions are you open to?', options: ['Video sessions', 'Voice sessions', 'Messaging between sessions', 'I would like to explore options'] },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [consented, setConsented] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const current = questions[step];
  const complete = step === questions.length;

  function choose(option: string) {
    setAnswers((existing) => [...existing.slice(0, step), option]);
    setStep((value) => value + 1);
  }

  return (
    <main className="onboarding page-shell">
      <div className="onboarding-top"><a className="back-link" href="/">← Back to Doui</a><span>{complete ? 'Ready' : `Step ${step + 1} of ${questions.length}`}</span></div>
      {!consented ? <section className="consent-card"><p className="eyebrow">Before we begin</p><h1>This is your space.</h1><p>These questions help us show relevant therapists. They are not a medical assessment, and you can skip or change your answers at any time.</p><label className="consent-row"><input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} /><span>I understand and agree to Doui processing these answers to provide matching suggestions.</span></label><button className="button button-primary" disabled={!consented} onClick={() => setStep(0)}>Continue privately <span aria-hidden="true">↗</span></button><p className="microcopy">Read our privacy notice and consent details before continuing.</p></section> : complete ? <section className="result-card"><p className="eyebrow">Your starting point</p><h1>You have made a thoughtful start.</h1><p>We have enough to show a first set of care options. In the full product, this is where your answers would be matched against verified therapist profiles.</p><div className="answer-summary">{answers.map((answer, index) => <div key={answer}><span>{String(index + 1).padStart(2, '0')}</span>{answer}</div>)}</div><a className="button button-primary" href="/therapists">See suggested therapists <span aria-hidden="true">↗</span></a></section> : <section className="question-card"><div className="progress"><span style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div><p className="eyebrow">A little context</p><h1>{current.title}</h1><div className="option-list">{current.options.map((option) => <button className="option-button" key={option} onClick={() => choose(option)}>{option}<span aria-hidden="true">↗</span></button>)}</div><button className="skip-button" onClick={() => setStep((value) => value + 1)}>I would rather skip this</button></section>}
    </main>
  );
}
