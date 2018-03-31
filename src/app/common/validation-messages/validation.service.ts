import { Injectable } from '@angular/core';

/**
 * Provide validation messages for fields
 */
@Injectable()
export class ValidationService {
  defaultKey = 'default';

  private getMessageConfig(messageArgs?: any): any {
    const validationMessages = {
      default: {
        default: 'Invalid value',
        required: 'Please enter a value.',
        minlength: `Minimum length ${messageArgs.requiredLength}`,
        maxlength: `Maximum length ${messageArgs.requiredLength}`
      },
      email: {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
      },
      exercise: {
        contains: `The exercise must contain a placeholder "${
          messageArgs.text
        }".
          In the solution, the placeholder must be replaced with code in order to make the exercise and assertions run without errors.`
      },
      solution: {
        error: 'The solution must not contain any errors.'
      },
      codeEditors: {
        onlyTextChanged: `Only the placeholder "${
          messageArgs.text
        }" can change in the solution compared to the exercise.`
      }
    };
    return validationMessages;
  }

  public getMessage(
    fieldName: string,
    validationKey: string,
    messageArgs?: any
  ): string {
    const config = this.getMessageConfig(messageArgs || {});

    const fieldValidation = config[fieldName];
    if (fieldValidation && fieldValidation[validationKey]) {
      return fieldValidation[validationKey];
    } else if (config[this.defaultKey][validationKey]) {
      return config[this.defaultKey][validationKey];
    }
    return config[this.defaultKey][this.defaultKey];
  }
}
