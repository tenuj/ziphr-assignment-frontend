import { Component, ElementRef, forwardRef, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownItem, DropdownItems } from './dropdown-item';

/**
 * DropdownMenuComponent wraps bootstrap dropdown-menu to support Angular Reactive Forms
 */
@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownMenuComponent),
      multi: true
    }
  ]
})
export class DropdownMenuComponent implements ControlValueAccessor, OnDestroy {

  /**
   Calls then value changed by user (For ControlValueAccessor component implementation)
   */
  private onChange?: Function;
  /**
   * Calls then component touched by user (For ControlValueAccessor component implementation)
   */
  private onTouched?: Function;

  /**
   * Selected value
   */
  value: any = null;
  /**
   * Selected Dropdown menu item
   */
  item: DropdownItem|undefined = undefined;

  /**
   * Menu items
   */
  @Input()
  items: DropdownItems = [];

  /**
   * Disabled component or not (For ControlValueAccessor component implementation)
   */
  disabled = false;

  constructor(
    private host: ElementRef
  ) {
    /**
     * Subscribe to capture phase to support onTouched ControlValueAccessor implementation
     */
    this.host.nativeElement.addEventListener( 'blur', this.blurListener, true );
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

  /**
   * Sets new value
   * @param value
   * @private
   */
  private setValue( value: any ): void {
    this.value = value;
    this.item = this.items.find( item => item.value === value );
  }

  /**
   * Called on menu item click
   * @param item
   */
  onItemClick( item: DropdownItem ): void {
    this.setValue( item.value );

    if ( this.onChange ) {
      this.onChange( item.value );
    }
  }

  /**
   * ControlValueAccessor interface implementation
   */
  writeValue(value: any): void {
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

  ngOnDestroy() {
    /**
     * Unsubscribe from blur events (to support onTouched ControlValueAccessor implementation)
     */
    this.host.nativeElement.removeEventListener( 'blur', this.blurListener, true );
  }

}
