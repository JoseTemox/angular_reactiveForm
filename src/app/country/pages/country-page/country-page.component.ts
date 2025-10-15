import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interfaces';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  private readonly fb = inject(FormBuilder);
  private readonly countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByrRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  readonly myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChanged = effect((onCleanup) => {
    const regionsSubscriptions = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionsSubscriptions.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')?.setValue('');
          this.myForm.get('border')?.setValue('');
          this.borders.set([]);
          this.countriesByrRegion.set([]);
        }),
        switchMap((region) =>
          this.countryService.getCountriesByRegion(region ?? '')
        )
      )
      .subscribe((countries) => {
        this.countriesByrRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')?.setValue('');
        }),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) =>
          this.countryService.getCountryByAlphaCode(alphaCode ?? '')
        ),
        switchMap((country) =>
          this.countryService.getCountryNamesByCodesArray(country.borders)
        )
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      });
  }
}
