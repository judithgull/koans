import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CodeEditorTextValidators {
  private static isEmptyInputValue(value: any): boolean {
    return value == null || value.length === 0;
  }
  /**
   * Validator that requires controls to contain a value, if the control value is not empty.
   * Empty control values are valid.
   */
  static containsText(text: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (
        CodeEditorTextValidators.isEmptyInputValue(value) ||
        value.toString().indexOf(text) >= 0
      ) {
        return null;
      }
      return { contains: { text } };
    };
  }

  /**
   * Validator that requires the changedControl to only differ in the given placeholder text from the origControl.
   * Whitespace before and after the placeholder text are ignored.
   * Unknown and empty controls are valid.
   */
  static onlyTextChanged(
    text: string,
    origControlName: string,
    changedControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const origItemControl = control.get(origControlName);
      const changedItemControl = control.get(changedControlName);
      if (!origItemControl || !changedItemControl) {
        return null;
      }
      const origValue = origItemControl.value;
      const changedValue = changedItemControl.value;

      if (
        CodeEditorTextValidators.isEmptyInputValue(origValue) &&
        CodeEditorTextValidators.isEmptyInputValue(changedValue)
      ) {
        return null;
      }

      const escape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

      const splits = origValue.split(text);
      const rs = splits
        .map(s => s.trim())
        .map(escape)
        .join('[\\s\\S]*');

      const r = RegExp(rs);

      const matches = r.test(changedValue);
      if (matches) {
        const match = r.exec(changedValue);

        if (match[0] === changedValue) {
          return null;
        }
      }

      return { onlyTextChanged: { text } };
    };
  }
}
