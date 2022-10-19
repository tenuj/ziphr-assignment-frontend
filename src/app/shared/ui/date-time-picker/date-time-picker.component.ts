/**
 * DateTimePickerComponent wraps tempus-dominus date-picker to support Angular Reactive Forms
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DateTime, TempusDominus } from '@eonasdan/tempus-dominus';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {

  /**
  Calls then value changed by user (For ControlValueAccessor component implementation)
   */
  private onChange?: Function;
  /**
   * Calls then component touched by user (For ControlValueAccessor component implementation)
   */
  private onTouched?: Function;

  /**
   * tempus-dominus datepicker instance
   * @private
   */
  private picker!: TempusDominus;
  /**
   * subscription to tempus-dominus datepicker events
   */
  private subscription: any;
  /**
   * internal tempus-dominus datepicker options
   */
  private pickerOptions: {[key: string]: any} = {};

  /**
   * Disabled component or not (For ControlValueAccessor component implementation)
   */
  disabled = false;

  /**
   * datepicker html element ref
   */
  @ViewChild('picker')
  pickerHost!: ElementRef;

  /**
   * minDate to select in milliseconds
   */
  @Input()
  minDate!: number;

  /**
   * maxDate to select in milliseconds
   */
  @Input()
  maxDate!: number;

  /**
   * Selected date in milliseconds
   */
  value: number|undefined = undefined;

  constructor() { }

  private setValue( value: number ): void {
    this.value = value;
  }

  /**
   * ControlValueAccessor interface implementation
   */
  writeValue(value: any): void {
    this.ngOnChanges( {
      date: new SimpleChange( this.value, value, false )
    } );

    this.setValue(value);
  }

  /**
   * ControlValueAccessor interface implementation
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * ControlValueAccessor interface implementation
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * ControlValueAccessor interface implementation
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit() {
    /**
     * Initialise picker
     */
    this.picker = new TempusDominus( this.pickerHost.nativeElement, this.pickerOptions );

    /**
     * update value
     */
    this.ngOnChanges( {
      date: new SimpleChange( null, this.value, false )
    } );

    /**
     * and subscribe to change event
     */
    this.subscription = this.picker.subscribe( 'change.td', (e) => {
      const value = e.date.getTime();

      this.setValue( value );

      if ( this.onChange ) {
        this.onChange( value );
      }
    });

    /**
     * Subscribe to capture phase to support onTouched ControlValueAccessor implementation
     */
    this.pickerHost.nativeElement.addEventListener( 'blur', this.blurListener, true );
  }

  /**
   * Blur listener wrapper
   * @private
   */
  private blurListener = this.onBlur.bind(this);

  /**
   * Blur listener function
   * @private
   */
  private onBlur(): void {
    if ( this.onTouched ) {
      this.onTouched();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const restrictions: {[key: string]: any} = {};

    if ( changes['minDate']?.currentValue ) {
      restrictions['minDate'] = new DateTime( changes['minDate']?.currentValue );
    }

    if ( changes['maxDate']?.currentValue ) {
      restrictions['maxDate'] = new DateTime( changes['maxDate']?.currentValue );
    }

    if ( changes['date']?.currentValue ) {
      this.picker?.dates.setValue(
        new DateTime( changes['date']?.currentValue )
      );
    }

    if ( Object.keys(restrictions).length > 0 ) {
      this.pickerOptions['restrictions'] = restrictions;
    }

    if ( Object.keys(this.pickerOptions).length > 0 ) {
      this.picker?.updateOptions( this.pickerOptions );
    }
  }

  ngOnDestroy() {
    /**
     * Unsubscribe from tempus-dominus date-picker on destroy
     */
    this.subscription.unsubscribe();

    /**
     * Unsubscribe from blur events (to support onTouched ControlValueAccessor implementation)
     */
    this.pickerHost.nativeElement.removeEventListener( 'blur', this.blurListener, true );
  }

}
