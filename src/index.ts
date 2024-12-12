import { defineAsyncComponent } from 'vue'

// export ButtonX from './components/FwbButton/FwbButton.vue'
//export AppSelectDropBox from './components/AppSelectDropBox/presentation/AppSelectDropBox.vue'
export const DatePickerX = defineAsyncComponent(
  () => import('./components/DatePicker/DatePicker.vue')
)
//export Drawer from './components/Drawer/presentation/Drawer.vue'
export const AccordionX = defineAsyncComponent(
  () => import('./components/FwbAccordion/FwbAccordion.vue')
)
export const AccordionContentX = defineAsyncComponent(
  () => import('./components/FwbAccordion/FwbAccordionContent.vue')
)
export const AccordionHeaderX = defineAsyncComponent(
  () => import('./components/FwbAccordion/FwbAccordionHeader.vue')
)
export const AccordionPanelX = defineAsyncComponent(
  () => import('./components/FwbAccordion/FwbAccordionPanel.vue')
)
export const AvatarX = defineAsyncComponent(() => import('./components/FwbAvatar/FwbAvatar.vue'))
export const AvatarStackX = defineAsyncComponent(
  () => import('./components/FwbAvatar/FwbAvatarStack.vue')
)
export const BadgeX = defineAsyncComponent(() => import('./components/FwbBadge/FwbBadge.vue'))
export const BreadcrumbX = defineAsyncComponent(
  () => import('./components/FwbBreadcrumb/FwbBreadcrumb.vue')
)
export const BreadcrumbItemX = defineAsyncComponent(
  () => import('./components/FwbBreadcrumb/FwbBreadcrumbItem.vue')
)
export const ButtonGroupX = defineAsyncComponent(
  () => import('./components/FwbButtonGroup/FwbButtonGroup.vue')
)
export const AreaX = defineAsyncComponent(() => import('./components/FwbCharts/Area/AreaChart.vue'))
export const BarX = defineAsyncComponent(() => import('./components/FwbCharts/Bar/BarChart.vue'))
export const ColumnX = defineAsyncComponent(
  () => import('./components/FwbCharts/Column/ColumnChart.vue')
)
export const DonutX = defineAsyncComponent(
  () => import('./components/FwbCharts/Donut/DonutChart.vue')
)
export const LineX = defineAsyncComponent(() => import('./components/FwbCharts/Line/LineChart.vue'))
export const PieX = defineAsyncComponent(() => import('./components/FwbCharts/Pie/PieChart.vue'))
export const RadialX = defineAsyncComponent(
  () => import('./components/FwbCharts/Radial/RadialChart.vue')
)
export const CheckboxX = defineAsyncComponent(
  () => import('./components/FwbCheckbox/FwbCheckbox.vue')
)
export const DropdownX = defineAsyncComponent(
  () => import('./components/FwbDropdown/FwbDropdown.vue')
)
export const FileInputX = defineAsyncComponent(
  () => import('./components/FwbDropzone/FwbFileInput.vue')
)
export const GalleryX = defineAsyncComponent(() => import('./components/FwbGallery/FwbGallery.vue'))
export const ImageX = defineAsyncComponent(() => import('./components/FwbImage/FwbImage.vue'))
export const IndicatorX = defineAsyncComponent(
  () => import('./components/FwbIndicators/FwbIndicator.vue')
)
export const InputX = defineAsyncComponent(() => import('./components/FwbInput/FwbInput.vue'))
export const InputPasswordX = defineAsyncComponent(
  () => import('./components/FwbInput/InputPassword.vue')
)
export const ModalX = defineAsyncComponent(() => import('./components/FwbModal/FwbModal.vue'))
//export FwbNavbar from './components/FwbNavbar/FwbNavbar.vue'
export const PaginationX = defineAsyncComponent(
  () => import('./components/FwbPagination/FwbPagination.vue')
)
export const PhoneInputX = defineAsyncComponent(
  () => import('./components/FwbPhoneInput/FwbPhoneInput.vue')
)
export const ProgressX = defineAsyncComponent(
  () => import('./components/FwbProgress/FwbProgress.vue')
)
export const RadioX = defineAsyncComponent(() => import('./components/FwbRadio/FwbRadio.vue'))
export const RangeX = defineAsyncComponent(() => import('./components/FwbRange/FwbRange.vue'))
export const SelectX = defineAsyncComponent(() => import('./components/FwbSelect/FwbSelect.vue'))
export const SkeletonX = defineAsyncComponent(
  () => import('./components/FwbSkeleton/FwbSkeleton.vue')
)
export const SpeedDialX = defineAsyncComponent(
  () => import('./components/FwbSpeedDial/FwbSpeedDial.vue')
)
export const SpinnerX = defineAsyncComponent(() => import('./components/FwbSpinner/FwbSpinner.vue'))
export const StepperX = defineAsyncComponent(() => import('./components/FwbStepper/FwbStepper.vue'))
export const TableX = defineAsyncComponent(() => import('./components/FwbTable/FwbTable.vue'))
export { default as TableRowX } from './components/FwbTable/FwbTableRow.vue'
export const TableCellX = defineAsyncComponent(
  () => import('./components/FwbTable/FwbTableCell.vue')
)
export const TableHeadX = defineAsyncComponent(
  () => import('./components/FwbTable/FwbTableHead.vue')
)
export const TableHeadCellX = defineAsyncComponent(
  () => import('./components/FwbTable/FwbTableHeadCell.vue')
)
export const TableBodyX = defineAsyncComponent(
  () => import('./components/FwbTable/FwbTableBody.vue')
)
export { default as TabX } from './components/FwbTabs/FwbTab.vue'
export { default as TabPaneX } from './components/FwbTabs/FwbTabPane.vue'
export { default as TabsX } from './components/FwbTabs/FwbTabs.vue'

export const TextareaX = defineAsyncComponent(
  () => import('./components/FwbTextarea/FwbTextarea.vue')
)
export const ToggleX = defineAsyncComponent(() => import('./components/FwbToggle/FwbToggle.vue'))
export const TooltipX = defineAsyncComponent(() => import('./components/FwbTooltip/FwbTooltip.vue'))
export const SearchCustomX = defineAsyncComponent(
  () => import('./components/FwbInputSearchCustom/FwbInputSearchCustom.vue')
)
export const FwbChooseQuantity = defineAsyncComponent(
  () => import('./components/FwbChooseQuantity/FwbChooseQuantity.vue')
)
export const IconX = defineAsyncComponent(() => import('./components/IconWrapper.vue'))
export type { iconsNames } from './components/data/icons.ts'
export const ExpandableTableX = defineAsyncComponent(
  () => import('./components/FwbTable/NestedTable/ExpandableTable.vue')
)
export const ButtonX = defineAsyncComponent(() => import('./components/FwbButton/FwbButton.vue'))
