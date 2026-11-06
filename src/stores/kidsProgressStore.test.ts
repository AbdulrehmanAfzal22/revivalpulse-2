import {
  getClearedStationIds,
  getCompletedLessonSurahIds,
  getLearnedLetterIds,
  getLessonStars,
  getLetterStars,
  getMasteredLetterIds,
  getMasteredLessonSurahIds,
} from 'stores/kidsProgressStore';
import type { KidsProgressPayload } from 'types/kids.types';
import type { SyncRecord } from 'types/sync.types';

function records(payloads: KidsProgressPayload[]): SyncRecord<KidsProgressPayload>[] {
  return payloads.map((payload, index) => ({
    id: `r${index}`,
    updatedAt: index,
    deleted: false,
    payload,
  }));
}

describe('letter star mastery selectors', () => {
  it('reads a pre-star letterLearned save as one star', () => {
    const stars = getLetterStars(records([{ kind: 'letterLearned', letterId: 'alif' }]));
    expect(stars.alif).toBe(1);
    expect(getLearnedLetterIds(records([{ kind: 'letterLearned', letterId: 'alif' }]))).toEqual(['alif']);
  });

  it('keeps the best of a legacy save and a later challenge run', () => {
    const recs = records([
      { kind: 'letterLearned', letterId: 'ba' },
      { kind: 'letterStars', letterId: 'ba', stars: 3 },
      { kind: 'letterStars', letterId: 'ba', stars: 1 },
    ]);
    expect(getLetterStars(recs).ba).toBe(3);
  });

  it('only counts a letter as mastered at three stars', () => {
    const recs = records([
      { kind: 'letterStars', letterId: 'alif', stars: 3 },
      { kind: 'letterStars', letterId: 'ba', stars: 2 },
      { kind: 'letterStars', letterId: 'ta', stars: 1 },
    ]);
    expect(getMasteredLetterIds(recs)).toEqual(['alif']);
    expect(getLearnedLetterIds(recs).sort()).toEqual(['alif', 'ba', 'ta']);
  });

  it('ignores deleted records', () => {
    const recs = [
      { id: 'a', updatedAt: 1, deleted: true, payload: { kind: 'letterStars', letterId: 'jim', stars: 3 } as KidsProgressPayload },
      { id: 'b', updatedAt: 2, deleted: false, payload: { kind: 'stationCleared', stationId: 'throat-town' } as KidsProgressPayload },
    ];
    expect(getLetterStars(recs).jim).toBeUndefined();
    expect(getClearedStationIds(recs)).toEqual(['throat-town']);
  });

  it('leaves the rest of the progress model untouched', () => {
    const recs = records([
      { kind: 'quizResult', quizId: 'alphabet', score: 9, total: 10 },
      { kind: 'badgeEarned', badgeId: 'quiz-whiz' },
      { kind: 'dailyActivity', date: '2026-11-06', actionsCount: 3 },
    ]);
    expect(getLearnedLetterIds(recs)).toEqual([]);
    expect(getClearedStationIds(recs)).toEqual([]);
  });
});

describe('lesson star mastery selectors', () => {
  it('reads a pre-star lessonCompleted save as one star', () => {
    const recs = records([{ kind: 'lessonCompleted', surahId: 112 }]);
    expect(getLessonStars(recs)[112]).toBe(1);
    expect(getCompletedLessonSurahIds(recs)).toEqual([112]);
    expect(getMasteredLessonSurahIds(recs)).toEqual([]);
  });

  it('keeps the best of a legacy save and a later quest run', () => {
    const recs = records([
      { kind: 'lessonCompleted', surahId: 112 },
      { kind: 'lessonStars', surahId: 112, stars: 3 },
      { kind: 'lessonStars', surahId: 112, stars: 1 },
    ]);
    expect(getLessonStars(recs)[112]).toBe(3);
  });

  it('only calls a surah mastered at three stars and lists learned ones in order', () => {
    const recs = records([
      { kind: 'lessonStars', surahId: 114, stars: 3 },
      { kind: 'lessonStars', surahId: 112, stars: 2 },
      { kind: 'lessonCompleted', surahId: 113 },
    ]);
    expect(getMasteredLessonSurahIds(recs)).toEqual([114]);
    expect(getCompletedLessonSurahIds(recs)).toEqual([112, 113, 114]);
  });

  it('ignores deleted quest saves', () => {
    const recs = [
      {
        id: 'lesson-stars:112',
        updatedAt: 1,
        deleted: true,
        payload: { kind: 'lessonStars', surahId: 112, stars: 3 } as KidsProgressPayload,
      },
    ];
    expect(getLessonStars(recs)[112]).toBeUndefined();
    expect(getCompletedLessonSurahIds(recs)).toEqual([]);
  });
});
