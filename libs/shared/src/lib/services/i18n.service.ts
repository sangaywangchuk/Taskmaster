import {  Injectable, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

const languageKey = 'language';

@Injectable({
  providedIn: 'root',
})
export class I18nService implements OnDestroy {
  private langChangeSubscription!: Subscription;
  private supportedLanguages!: string[]
  constructor(
    private translateService: TranslateService,
  ) {
    this.init();
  }

  /**
   * Cleans up language change subscription.
   */
  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  /**
   * Initializes i18n for the application.
   * Loads language from local storage if present, or sets default language.
   */
  init(): void {
    this.language = 'en';
    // Warning: this subscription will always be alive for the app's lifetime
    this.langChangeSubscription = this.translateService.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        localStorage.setItem(languageKey, event.lang);
      },
    );
  }

  /** Module translation loading method*/
  loadTranslations(args: { [key: string]: Record<string, string> }): void {
    Object.keys(args).forEach((key) => {
      this.translateService.setTranslation(key, args[key], true);
    });
    this.supportedLanguages = Object.keys(args);
  }

  /**
   * Switch the languages
   * @param  selectedLanguage the language to change to
   * @returns Observable<string>
   */
  useLanguage(selectedLanguage: string): Observable<string> {
    if (this.isSupportedLanguage(selectedLanguage)) {
      return this.translateService.use(selectedLanguage).pipe(take(1));
    } else {
      return EMPTY;
    }
  }

  private isSupportedLanguage(language: string): boolean {
    return !!this.supportedLanguages?.find((lang) => lang === language);
  }

  /**
   * Sets the current language.
   * Note: The current language is saved to the local storage.
   * If no parameter is specified, the language is loaded from local storage (if present).
   * @param language The IETF language code to set.
   */
  set language(language: string) {
    language =
      language ||
      localStorage.getItem(languageKey) ||
      (this.translateService.getBrowserCultureLang() as string);
    /** To maintain backward compatibility we check both the arrays */

    // Fallback if language is not supported
    !this.isSupportedLanguage(language) &&
      (language = 'en');

    this.translateService.setDefaultLang('en');
    this.translateService.use(language);
  }

  /**
   * Gets the current language.
   * @return The current language code.
   */
  get language(): string {
    return this.translateService.currentLang;
  }

  /**
   * Language change event
   * @returns Observable<LangChangeEvent>
   */
  get languageChanged(): Observable<LangChangeEvent> {
    return this.translateService.onLangChange;
  }
}
