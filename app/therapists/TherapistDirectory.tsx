'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Therapist } from '../../lib/mock-data';

type TherapistDirectoryProps = {
  therapists: Therapist[];
};

export function TherapistDirectory({ therapists }: TherapistDirectoryProps) {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('All languages');
  const [format, setFormat] = useState('All formats');
  const [specialty, setSpecialty] = useState('All specialties');

  const options = useMemo(() => ({
    languages: Array.from(new Set(therapists.flatMap((therapist) => therapist.languages))).sort(),
    formats: Array.from(new Set(therapists.flatMap((therapist) => therapist.formats))).sort(),
    specialties: Array.from(new Set(therapists.flatMap((therapist) => therapist.specialties))).sort(),
  }), [therapists]);

  const filteredTherapists = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return therapists.filter((therapist) => {
      const searchableText = [
        therapist.name,
        therapist.title,
        ...therapist.languages,
        ...therapist.specialties,
      ].join(' ').toLowerCase();

      return (
        (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
        (language === 'All languages' || therapist.languages.includes(language)) &&
        (format === 'All formats' || therapist.formats.includes(format)) &&
        (specialty === 'All specialties' || therapist.specialties.includes(specialty))
      );
    });
  }, [format, language, query, specialty, therapists]);

  const hasFilters = query !== '' || language !== 'All languages' || format !== 'All formats' || specialty !== 'All specialties';

  function resetFilters() {
    setQuery('');
    setLanguage('All languages');
    setFormat('All formats');
    setSpecialty('All specialties');
  }

  return (
    <>
      <div className="directory-filters" aria-label="Filter therapist directory">
        <label className="directory-search">
          <span>Search care team</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Name, language, or focus"
          />
        </label>
        <label>
          <span>Language</span>
          <select value={language} onChange={(event) => setLanguage(event.target.value)}>
            <option>All languages</option>
            {options.languages.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Format</span>
          <select value={format} onChange={(event) => setFormat(event.target.value)}>
            <option>All formats</option>
            {options.formats.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Focus</span>
          <select value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
            <option>All specialties</option>
            {options.specialties.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      <p className="directory-result-count" role="status">
        {filteredTherapists.length} {filteredTherapists.length === 1 ? 'professional' : 'professionals'} available
      </p>

      {filteredTherapists.length > 0 ? (
        <div className="therapist-grid">
          {filteredTherapists.map((therapist) => (
            <article className="therapist-card" key={therapist.id}>
              <div className="avatar" style={{ background: therapist.accent }}>{therapist.initials}</div>
              <div className="verified">✓ Verified profile</div>
              <h2>{therapist.name}</h2>
              <p className="muted">{therapist.title}</p>
              <div className="tag-list">{therapist.specialties.map((item) => <span key={item}>{item}</span>)}</div>
              <p className="card-detail">Speaks {therapist.languages.join(' · ')}<br />From {therapist.feeMad} MAD · {therapist.nextSlot}</p>
              <Link className="button button-outline" href={`/therapists/${therapist.id}`}>View profile <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="directory-empty">
          <h2>No profile matches those preferences yet.</h2>
          <p>Try a broader search or clear one of the filters. We are growing the care team thoughtfully.</p>
          {hasFilters && <button className="button button-outline" type="button" onClick={resetFilters}>Clear filters</button>}
        </div>
      )}
    </>
  );
}
