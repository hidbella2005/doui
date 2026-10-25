'use client';

import { FormEvent, useEffect, useState } from 'react';

type Slot = { id: string; startsAt: string; endsAt: string; timezone: string };
type Format = 'VIDEO' | 'VOICE' | 'MESSAGING';

const formatLabels: Record<Format, string> = { VIDEO: 'Video session', VOICE: 'Voice session', MESSAGING: 'Messaging' };

export function BookingScheduler({ therapistId }: { therapistId: string }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [formats, setFormats] = useState<Format[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<Format | ''>('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/bookings?therapistId=${encodeURIComponent(therapistId)}`)
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? 'Unable to load availability.');
        setSlots(result.slots);
        setFormats(result.formats ?? []);
      })
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [therapistId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setMessage('');
    setPending(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotId: selectedSlot, format: selectedFormat, consentAccepted }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? 'Unable to request this session.');
      setMessage('Your session request has been sent. We will confirm the details in your Doui space.');
      setSelectedSlot('');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to request this session.');
    } finally {
      setPending(false);
    }
  }

  if (loading) return <div className="booking-state"><span className="loading-dot" />Loading available times…</div>;
  if (error && !slots.length) return <div className="booking-state booking-error" role="alert">{error}</div>;
  if (!slots.length) return <div className="booking-state"><strong>No availability is published yet.</strong><span>This therapist will appear here when verified availability is added.</span></div>;

  return <form className="booking-form" onSubmit={submit}>
    <fieldset>
      <legend>Choose a time</legend>
      <div className="slot-list">{slots.map((slot) => <button className={`slot-button ${selectedSlot === slot.id ? 'selected' : ''}`} type="button" key={slot.id} onClick={() => setSelectedSlot(slot.id)}><span>{new Intl.DateTimeFormat('en-MA', { weekday: 'long', day: 'numeric', month: 'short' }).format(new Date(slot.startsAt))}</span><span>{new Intl.DateTimeFormat('en-MA', { hour: '2-digit', minute: '2-digit' }).format(new Date(slot.startsAt))}</span></button>)}</div>
    </fieldset>
    <fieldset>
      <legend>Choose a format</legend>
      <div className="format-list">{formats.map((format) => <button className={`format-option ${selectedFormat === format ? 'selected' : ''}`} type="button" key={format} onClick={() => setSelectedFormat(format)}>{formatLabels[format]}</button>)}</div>
    </fieldset>
    <label className="consent-row booking-consent"><input type="checkbox" checked={consentAccepted} onChange={(event) => setConsentAccepted(event.target.checked)} /><span>I confirm that I have reviewed the telehealth consent and cancellation information.</span></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    {message && <p className="booking-success" role="status">{message}</p>}
    <button className="button button-primary" type="submit" disabled={!selectedSlot || !selectedFormat || !consentAccepted || pending}>{pending ? 'Requesting session…' : 'Request this session'} <span aria-hidden="true">↗</span></button>
    <p className="microcopy">Your request is not a payment. A compliant payment step will be added before confirmation.</p>
  </form>;
}
