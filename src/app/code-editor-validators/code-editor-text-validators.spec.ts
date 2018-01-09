import { FormControl, FormGroup } from '@angular/forms';
import { CodeEditorTextValidators } from './code-editor-text-validators';

describe('CodeEditorTextValidators', () => {
  describe('containsText', () => {
    it('should not error on an empty string', () => {
      expect(
        CodeEditorTextValidators.containsText('???')(new FormControl(''))
      ).toBeNull();
    });

    it('should not error on null', () => {
      expect(
        CodeEditorTextValidators.containsText('a')(new FormControl(null))
      ).toBeNull();
    });

    it('should not error on undefined', () => {
      expect(
        CodeEditorTextValidators.containsText('a')(new FormControl(undefined))
      ).toBeNull();
    });

    it('should return a validation error on values not containing required text', () => {
      expect(
        CodeEditorTextValidators.containsText('a')(new FormControl(1))
      ).toEqual({
        contains: { text: 'a' }
      });
    });

    it('should not error on values not containing required text', () => {
      expect(
        CodeEditorTextValidators.containsText('a')(new FormControl('a'))
      ).toBeNull();
    });
  });

  describe('sameAsExcept', () => {
    const onlyTextChanged = CodeEditorTextValidators.onlyTextChanged(
      '???',
      'c1',
      'c2'
    );

    const newFormGroup = (v1: string, v2: string) =>
      new FormGroup({
        c1: new FormControl(v1),
        c2: new FormControl(v2)
      });

    const errorObj = {
      onlyTextChanged: { text: '???' }
    };

    it('should not error on unknown elements', () => {
      expect(
        CodeEditorTextValidators.onlyTextChanged('???', '', '')(
          new FormControl('')
        )
      ).toBeNull();
    });

    it('should not error, if both values are empty', () => {
      expect(onlyTextChanged(newFormGroup('', ''))).toBeNull();
    });

    it('should not error, if nothing has changed', () => {
      expect(onlyTextChanged(newFormGroup('???', '???'))).toBeNull();
    });

    it('should not error, if only placeholder is changed', () => {
      expect(onlyTextChanged(newFormGroup('???', ''))).toBeNull();
      expect(onlyTextChanged(newFormGroup('code ???', 'code ??'))).toBeNull();
      expect(
        onlyTextChanged(newFormGroup('code ??? aaa', 'code ?? aaa'))
      ).toBeNull();
    });

    it('should not error, if only placeholder and whitespace is changed', () => {
      expect(
        onlyTextChanged(newFormGroup('code ??? aa\na', 'code ?? aa\na'))
      ).toBeNull();
      expect(onlyTextChanged(newFormGroup('a ??? a', 'aba'))).toBeNull();
      expect(onlyTextChanged(newFormGroup('a ??? a ???', 'aba b'))).toBeNull();
      expect(
        onlyTextChanged(newFormGroup('a \n??? a ???', 'aba b'))
      ).toBeNull();
      expect(
        onlyTextChanged(newFormGroup('a \n??? a ???', 'aba b\nb'))
      ).toBeNull();
    });

    it('should error, if other values are changed', () => {
      expect(onlyTextChanged(newFormGroup('a', 'b'))).toEqual(errorObj);
      expect(onlyTextChanged(newFormGroup('code ???', 'codxe ??'))).toEqual(
        errorObj
      );
      expect(
        onlyTextChanged(newFormGroup('code ??? code', 'code ??? codxe'))
      ).toEqual(errorObj);
      expect(
        onlyTextChanged(newFormGroup('code ??? code', 'code ??? '))
      ).toEqual(errorObj);
      expect(
        onlyTextChanged(newFormGroup('a a \n??? a ???', 'aa b a b\nb'))
      ).toEqual(errorObj);
    });

    it('should not error, if multiple placeholders have changed', () => {
      expect(onlyTextChanged(newFormGroup('??????', ''))).toBeNull();
      expect(
        onlyTextChanged(newFormGroup('??? code ???', 'a code b'))
      ).toBeNull();
      expect(
        onlyTextChanged(newFormGroup('??? a ??? d ???', 'a code d code'))
      ).toBeNull();
    });

    it('should error, for multiple placeholders, if other values have changed', () => {
      expect(onlyTextChanged(newFormGroup('a ??? b ??? c', 'ac'))).toEqual(
        errorObj
      );
      expect(onlyTextChanged(newFormGroup('a ??? b ??? c', 'ab'))).toEqual(
        errorObj
      );
      expect(onlyTextChanged(newFormGroup('a ??? b ??? c', 'bc'))).toEqual(
        errorObj
      );
    });

    it('should not error, for special characters', () => {
      expect(onlyTextChanged(newFormGroup('??????', ''))).toBeNull();
      expect(
        onlyTextChanged(
          newFormGroup('(1 * 1).should.equal(???);', '(1 * 1).should.equal(1);')
        )
      ).toBeNull();
    });
  });
});
