import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
export class FormUtils {
  static isValidField(form: FormGroup, fielName: string): boolean | null {
    return !!form.controls[fielName].errors && form.controls[fielName].touched;
  }

  static getFielError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextErrors(errors);
  }

  static isValidFieldNameArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFielErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;
    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextErrors(errors);
  }

  static getTextErrors(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minLength':
          return `Mínimo de ${errors['minLength'].requiredLength} caracteres`;
        case 'min':
          return `Mínimo de ${errors['min'].min} caracteres`;
      }
    }
    return null;
  }
}
