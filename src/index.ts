// import ButtonX from './components/FwbButton/FwbButton.vue'
//import AppSelectDropBox from './components/AppSelectDropBox/presentation/AppSelectDropBox.vue'
import DatePickerX from './components/DatePicker/DatePicker.vue'
//import Drawer from './components/Drawer/presentation/Drawer.vue'
import AccordionX from './components/FwbAccordion/FwbAccordion.vue'
import AccordionContentX from './components/FwbAccordion/FwbAccordionContent.vue'
import AccordionHeaderX from './components/FwbAccordion/FwbAccordionHeader.vue'
import AccordionPanelX from './components/FwbAccordion/FwbAccordionPanel.vue'
import AvatarX from './components/FwbAvatar/FwbAvatar.vue'
import AvatarStackX from './components/FwbAvatar/FwbAvatarStack.vue'
import BadgeX from './components/FwbBadge/FwbBadge.vue'
import BreadcrumbX from './components/FwbBreadcrumb/FwbBreadcrumb.vue'
import BreadcrumbItemX from './components/FwbBreadcrumb/FwbBreadcrumbItem.vue'
import ButtonGroupX from './components/FwbButtonGroup/FwbButtonGroup.vue'
import AreaX from './components/FwbCharts/Area/AreaChart.vue'
import BarX from './components/FwbCharts/Bar/BarChart.vue'
import ColumnX from './components/FwbCharts/Column/ColumnChart.vue'
import DonutX from './components/FwbCharts/Donut/DonutChart.vue'
import LineX from './components/FwbCharts/Line/LineChart.vue'
import PieX from './components/FwbCharts/Pie/PieChart.vue'
import RadialX from './components/FwbCharts/Radial/RadialChart.vue'
import CheckboxX from './components/FwbCheckbox/FwbCheckbox.vue'
import DropdownX from './components/FwbDropdown/FwbDropdown.vue'
import FileInputX from './components/FwbDropzone/FwbFileInput.vue'
import GalleryX from './components/FwbGallery/FwbGallery.vue'
import ImageX from './components/FwbImage/FwbImage.vue'
import IndicatorX from './components/FwbIndicators/FwbIndicator.vue'
import InputX from './components/FwbInput/FwbInput.vue'
import InputPasswordX from './components/FwbInput/InputPassword.vue'
import ModalX from './components/FwbModal/FwbModal.vue'
//import FwbNavbar from './components/FwbNavbar/FwbNavbar.vue'
import PaginationX from './components/FwbPagination/FwbPagination.vue'
import PhoneInputX from './components/FwbPhoneInput/FwbPhoneInput.vue'
import ProgressX from './components/FwbProgress/FwbProgress.vue'
import RadioX from './components/FwbRadio/FwbRadio.vue'
import RangeX from './components/FwbRange/FwbRange.vue'
import SelectX from './components/FwbSelect/FwbSelect.vue'
import SkeletonX from './components/FwbSkeleton/FwbSkeleton.vue'
import SpeedDialX from './components/FwbSpeedDial/FwbSpeedDial.vue'
import SpinnerX from './components/FwbSpinner/FwbSpinner.vue'
import StepperX from './components/FwbStepper/FwbStepper.vue'
import TableX from './components/FwbTable/FwbTable.vue'
import TableRowX from './components/FwbTable/FwbTableRow.vue'
import TableCellX from './components/FwbTable/FwbTableCell.vue'
import TableHeadX from './components/FwbTable/FwbTableHead.vue'
import TableHeadCellX from './components/FwbTable/FwbTableHeadCell.vue'
import TableBodyX from './components/FwbTable/FwbTableBody.vue'
import TabX from './components/FwbTabs/FwbTab.vue'
import TabPaneX from './components/FwbTabs/FwbTabPane.vue'
import TabsX from './components/FwbTabs/FwbTabs.vue'
import TextareaX from './components/FwbTextarea/FwbTextarea.vue'
import ToggleX from './components/FwbToggle/FwbToggle.vue'
import TooltipX from './components/FwbTooltip/FwbTooltip.vue'
import SearchCustomX from './components/FwbInputSearchCustom/FwbInputSearchCustom.vue'
import FwbChooseQuantity from './components/FwbChooseQuantity/FwbChooseQuantity.vue'
import IconX from './components/IconWrapper.vue'
import type { iconsNames } from './components/data/icons.ts'
export type { iconsNames as IconsNames }
import ExpandableTableX from './components/FwbTable/NestedTable/ExpandableTable.vue'
import { defineAsyncComponent } from 'vue'
const ButtonX = defineAsyncComponent(() => import('./components/FwbButton/FwbButton.vue'))
// const CarouselX = defineAsyncComponent(() => import('./components/FwbCarousel/FwbCarousel.vue'))

import '@/components/FwbTable/NestedTable/styles/table_styles.css'
export {
  ButtonX,
  DatePickerX,
  //Drawer,
  AccordionX,
  AccordionContentX,
  AccordionHeaderX,
  AccordionPanelX,
  AvatarX,
  AvatarStackX,
  BadgeX,
  BreadcrumbX,
  BreadcrumbItemX,
  ButtonGroupX,
  AreaX,
  BarX,
  ColumnX,
  DonutX,
  LineX,
  //FwbNavbar,
  PieX,
  RadialX,
  CheckboxX,
  DropdownX,
  FileInputX,
  GalleryX,
  ImageX,
  IndicatorX,
  InputX,
  InputPasswordX,
  ModalX,
  PaginationX,
  PhoneInputX,
  ProgressX,
  RadioX,
  RangeX,
  SelectX,
  SkeletonX,
  SpeedDialX,
  SpinnerX,
  StepperX,
  TableX,
  TableRowX,
  TableCellX,
  TableHeadX,
  TableHeadCellX,
  TabX,
  TableBodyX,
  TabPaneX,
  TabsX,
  TextareaX,
  ToggleX,
  TooltipX,
  SearchCustomX,
  IconX,
  FwbChooseQuantity,
  ExpandableTableX
  // CarouselX
}
