export enum FeedbackType {
  Error,
  Warning,
  Info
}

export interface Feedback {
  message: string;
  type: FeedbackType;
  source: string;
  startLineNumber: number;
}

export class FeedbackFactory {
  static createSuccess(source: string) {
    return {
      source,
      message: 'Success',
      type: FeedbackType.Info,
      startLineNumber: -1
    };
  }
  static createError(message: string, source: string) {
    return {
      source,
      message,
      type: FeedbackType.Error,
      startLineNumber: -1
    };
  }
}
