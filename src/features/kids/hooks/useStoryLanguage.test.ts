import {localDirection,localText} from './useStoryLanguage';
import {DEFAULT_READING_PREFERENCES} from 'constants/readingPreferences';
import {TRANSLATIONS} from 'constants/translations';
import {LANGUAGES} from 'constants/languages';
import {isRTL} from 'utils/rtl';
describe('mixed-language story fields',()=>{
 it('keeps an untranslated paragraph in English and left-to-right',()=>{const p={en:'An English paragraph.'};expect(localText(p,'ur')).toBe(p.en);expect(localDirection(p,'ur')).toBe('ltr')});
 it('shows a translated Urdu field right-to-left independently of the chapter title',()=>{const note={en:'A note.',ur:'یہ ایک سبق ہے۔'};expect(localText(note,'ur')).toBe(note.ur);expect(localDirection(note,'ur')).toBe('rtl')});
 it('treats a blank Urdu translation as an English fallback',()=>expect(localDirection({en:'English',ur:'  '},'ur')).toBe('ltr'));
});

// The reader pages place their text from the same idea: every block answers
// "which way does MY text run?", never "what is the app's UI language?".
describe('reader text placement',()=>{
 it('keeps the Quran reader default Arabic-on-the-right',()=>{
  // `rtl` is the unmirrored layout: Arabic column on the right, translation on the left.
  expect(DEFAULT_READING_PREFERENCES.readingDirection).toBe('rtl');
 });
 it('derives a translation paragraph direction from its own language',()=>{
  const rtl=TRANSLATIONS.filter(t=>isRTL(t.languageCode)).map(t=>t.languageCode);
  const ltr=TRANSLATIONS.filter(t=>!isRTL(t.languageCode)).map(t=>t.languageCode);
  expect(rtl).toContain('ur');expect(ltr).toContain('en');
  expect(new Set(rtl)).toEqual(new Set(['ur','fa']));
 });
 it('marks exactly the RTL interface languages as right-to-left',()=>{
  expect(LANGUAGES.filter(l=>l.dir==='rtl').map(l=>l.code).sort()).toEqual(['ar','fa','ur']);
 });
});
