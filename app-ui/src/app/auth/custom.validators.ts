import { FormGroup } from '@angular/forms';

export class CustomValidators {

  static compareWith(value: string, matchWith: string) {
    return (group: FormGroup) => {
      const a = group.get(value).value;
      const b = group.get(matchWith).value;
      if (a === b) {
        return null;
      }
      group.get(matchWith).setErrors({ compare: true });
      return { compare: true };
    };
  }

}
