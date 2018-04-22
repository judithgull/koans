import { ProgrammingLanguage } from './programming-language';

export enum SourceType {
  validation = 'validation',
  execution = 'execution',
  monaco = 'monaco'
}

export enum FeedbackType {
  Error,
  Success
}

export interface ModelState {
  id: string;
  versionId: number;
  progLang: ProgrammingLanguage;
  value: string;
}

export interface Feedback extends ModelState {
  validation?: FeedbackDetails;
  execution?: FeedbackDetails;
  monaco?: FeedbackDetails;
  valid?: boolean;
}

export interface FeedbackDetails {
  success: boolean;
  errors: ErrorMarker[];
}

export interface ErrorMarker {
  message: string;
  startLineNumber: number; // 1 based as in monaco editor
}
