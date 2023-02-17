export interface Environment {
  currency: string;
  defaultLanguage: string;
  defaultCurrency: string;
  googleMapsApiKey: string;
  rollBarApiKey: string;
  rollBarEnable: boolean;
  rollBarEnv: string;
  application: string;
  applicationShortCode: string;
  baseUrl: string;
  production: boolean;
  redirectUri: string;
}

export interface Meta {
  current?: number;
  lastPage?: number;
  nextPage?: number;
  previous?: number;
  total?: number;
}
