export type Therapist = {
  id: string;
  name: string;
  initials: string;
  title: string;
  languages: string[];
  specialties: string[];
  formats: string[];
  feeMad: number;
  nextSlot: string;
  verified: boolean;
  accent: string;
};

export const therapists: Therapist[] = [
  { id: 'salma-benali', name: 'Salma Benali', initials: 'SB', title: 'Licensed psychologist', languages: ['Arabic', 'French'], specialties: ['Stress', 'Transitions'], formats: ['Video', 'Voice'], feeMad: 420, nextSlot: 'Tomorrow, 18:00', verified: true, accent: '#e8896f' },
  { id: 'youssef-amrani', name: 'Youssef Amrani', initials: 'YA', title: 'Psychotherapist', languages: ['Arabic', 'English'], specialties: ['Relationships', 'Confidence'], formats: ['Video', 'Messaging'], feeMad: 350, nextSlot: 'Thu, 10:30', verified: true, accent: '#8db9aa' },
  { id: 'claire-martin', name: 'Claire Martin', initials: 'CM', title: 'Counsellor', languages: ['French', 'English'], specialties: ['Self-understanding', 'Transitions'], formats: ['Video', 'Voice'], feeMad: 390, nextSlot: 'Fri, 16:00', verified: true, accent: '#d7b574' },
];
