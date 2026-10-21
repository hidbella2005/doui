import { Therapist } from '../mock-data';
import { z } from 'zod';

export type MatchingAnswers = { concern?: string; language?: string; format?: string };

export const matchingAnswersSchema = z.object({
  concern: z.string().trim().max(200).optional(),
  language: z.string().trim().max(100).optional(),
  format: z.string().trim().max(100).optional(),
});

export function matchTherapists(answers: MatchingAnswers, profiles: Therapist[]) {
  return profiles.map((therapist) => {
    const concernScore = answers.concern && therapist.specialties.some((item) => item.toLowerCase().includes(answers.concern!.split(' ')[0].toLowerCase())) ? 3 : 0;
    const languageScore = answers.language && therapist.languages.includes(answers.language) ? 2 : 0;
    const formatScore = answers.format && therapist.formats.includes(answers.format.split(' ')[0]) ? 1 : 0;
    const score = concernScore + languageScore + formatScore;
    const reasons = [
      concernScore ? 'their focus overlaps with what you shared' : '',
      languageScore ? `they offer sessions in ${answers.language}` : '',
      formatScore ? `their format includes ${answers.format}` : '',
    ].filter(Boolean);
    return { therapist, score, reasons };
  }).sort((a, b) => b.score - a.score);
}
