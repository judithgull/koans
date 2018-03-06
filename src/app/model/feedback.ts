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
  runner?: FeedbackDetails;
  monaco?: FeedbackDetails;
}

export interface FeedbackDetails {
  success: boolean;
  errors: ErrorMarker[];
}

export interface ErrorMarker {
  message: string;
  startLineNumber: number; // 1 based as in monaco editor
}

export interface Feedback2 {
  message?: string;
  type: FeedbackType;
  source: SourceType;
  value: string;
  startLineNumber: number;
}

export class FeedbackFactory {
  static createSuccess(source: SourceType, value: string): Feedback2 {
    return {
      source: source,
      value,
      type: FeedbackType.Success,
      startLineNumber: -1
    };
  }
  static createError(
    source: SourceType,
    message: string,
    value: string
  ): Feedback2 {
    return {
      source,
      value,
      message,
      type: FeedbackType.Error,
      startLineNumber: -1
    };
  }
}
