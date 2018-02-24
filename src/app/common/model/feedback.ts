export enum SourceType {
  Validation,
  Runner,
  Monaco
}

export enum FeedbackType {
  Error,
  Success
}

export interface Feedback {
  id: string;
  versionId: number;
  value: string;
  validation?: FeedbackDetails;
  runner?: FeedbackDetails;
  monaco?: FeedbackDetails[];
}

export interface FeedbackDetails {
  success: boolean;
  message: string;
  startLineNumber: number;
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
