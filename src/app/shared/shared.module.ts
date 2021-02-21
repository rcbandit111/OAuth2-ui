import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Select2Module } from 'ng2-select2';
import { NgSelectModule } from '@ng-select/ng-select';

/* Components */
import { FormBaseComponent } from './components/form-base/form-base.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SearchAccordionComponent } from './components/search-accordion/search-accordion.component';
import { MultiSelectComponent } from './components/multiselect/multi-select.component';
import { ListTableComponent } from './components/list-table/list-table.component';
import { SearchAccordionGroupComponent } from './components/search-accordion-group/search-accordion-group.component';

/* Directives */
import { SubmitFormDirective } from './directives/submit-form.directive';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { DaterangepickerDirective } from './directives/daterangepicker.directive';
import { DaterangepickerConfig } from '@shared/directives/config.service';
import { XmlBeautyfierPipe } from './pipes/xml-beautyfier.pipe';

/* Modals */
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';
import { RangeSlidePickerComponent } from './components/range-slide-picker/range-slide-picker.component';

import { ErrorsModule } from '../errors';
import { FilterPipe } from './pipes/filter.pipe';
import { SelectSearchComponent } from './components/select-search/select-search.component';
import { SelectListComponent } from './components/select-list/select-list.component';
import { AlertifyService } from './alertify.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    IonRangeSliderModule,
    Select2Module,
    NgSelectModule,
    ErrorsModule
  ],
  declarations: [
    DaterangepickerDirective,
    FormBaseComponent,
    HeaderComponent,
    SidebarComponent,
    SubmitFormDirective,
    PaginationComponent,
    SearchAccordionComponent,
    MultiSelectComponent,
    ListTableComponent,
    DatePickerComponent,
    XmlBeautyfierPipe,
    ConfirmDialogComponent,
    RangeSlidePickerComponent,
    FilterPipe,
    SelectSearchComponent,
    SelectListComponent,
    SearchAccordionGroupComponent
  ],
  exports: [
    FormBaseComponent,
    HeaderComponent,
    SidebarComponent,
    SubmitFormDirective,
    PaginationComponent,
    SearchAccordionComponent,
    MultiSelectComponent,
    ListTableComponent,
    DatePickerComponent,
    XmlBeautyfierPipe,
    ConfirmDialogComponent,
    IonRangeSliderModule,
    RangeSlidePickerComponent,
    FilterPipe,
    SelectSearchComponent,
    SelectListComponent,
    Select2Module,
    NgSelectModule,
    SearchAccordionGroupComponent
  ],
  providers: [
    AlertifyService,
    DaterangepickerConfig
  ]
})
export class SharedModule { }
