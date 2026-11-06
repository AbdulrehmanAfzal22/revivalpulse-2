import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { getChapterVerses } from 'api/quran/quranClient';
import { TRANSLATIONS } from 'constants/translations';
import type { Ayah } from 'types/quran.types';

const SAHEEH_INTERNATIONAL = TRANSLATIONS.find((item) => item.id === 'saheeh-international');

export default function useBeginnerLessonVerses(surahId: number | null): UseQueryResult<Ayah[], Error> {
  return useQuery({
    // null is the list view: chapter 0 does not exist, so never ask the API for it.
    enabled: surahId !== null,
    queryKey: ['kidsLessonVerses', surahId ?? 0],
    queryFn: () => getChapterVerses(surahId ?? 0, SAHEEH_INTERNATIONAL ? [SAHEEH_INTERNATIONAL] : []),
    staleTime: 1000 * 60 * 60,
  });
}
