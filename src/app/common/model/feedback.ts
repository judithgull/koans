export enum SourceType {
  Validation,
  Runner,
  Monaco
}

export enum FeedbackType {
  Error,
  Info //TODO
}

export interface Feedback {
  message?: string;
  type: FeedbackType;
  source: SourceType;
  value: string;
  startLineNumber: number;
}

export class FeedbackFactory {
  static createSuccess(source: SourceType, value: string): Feedback {
    return {
      source: source,
      value,
      type: FeedbackType.Info,
      startLineNumber: -1
    };
  }
  static createError(
    source: SourceType,
    message: string,
    value: string
  ): Feedback {
    return {
      source,
      value,
      message,
      type: FeedbackType.Error,
      startLineNumber: -1
    };
  }
}
