import { computed, ref , watch} from "vue";

 import { onClickOutside } from "@vueuse/core";
 
export const useTimePicker = () => {
 
 
 const wrapper = ref<HTMLDivElement>();
 
 const showDropdown = ref(false);
 const selectedHour = ref<string>();
 const selectedMinute = ref<string>();
 const selectedPeriod = ref<string>();

 const hours = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
 const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
 const periods = ref(['AM', 'PM']);
 
 const hoursStartIndex = ref(0);
 const minutesStartIndex = ref(0);
 const periodsStartIndex = ref(0);

 const positionHourSelected = ref(0);
 const positionMinuteSelected = ref(0);
 const positionPeriodSelected = ref(0);

const showValidationMessage = ref(true);
 
 const formattedTime = computed(() => {
   return `${selectedHour.value}:${selectedMinute.value} ${selectedPeriod.value}`;
 });
  
 
 
 const selectHour = (hour: string, index: number) => {
   selectedHour.value = hour;
   positionHourSelected.value = index;
 };
 
 const selectMinute = (minute: string, index: number) => {
   selectedMinute.value = minute;
   positionMinuteSelected.value = index;  
 };
 
 const selectPeriod = (period: string, index: number) => {
   selectedPeriod.value = period;
   positionPeriodSelected.value = index;  
 };
 
 onClickOutside(wrapper, () => {
   if (!showDropdown.value) return;
   showDropdown.value = false;  
   showValidationMessage.value =true;

  // Asegurar que las otras columnas también se actualicen
  updateAllColumns();
  
 });

 const updateAllColumns = () => {
  hoursStartIndex.value = +(selectedHour.value) -1;//positionHourSelected.value;  
  minutesStartIndex.value = +(selectedMinute.value);//positionMinuteSelected.value;  
  periodsStartIndex.value = positionPeriodSelected.value;

  if(selectedPeriod.value) periods.value = [selectedPeriod.value, ...periods.value.filter(period => period !== selectedPeriod.value)]

  const hoursColumnEl = hoursColumn.value;
  const minutesColumnEl = minutesColumn.value;
  const periodsColumnEl = periodsColumn.value;

  if (hoursColumnEl) hoursColumnEl.scrollTop = 0;
  if (minutesColumnEl) minutesColumnEl.scrollTop = 0;
  if (periodsColumnEl) periodsColumnEl.scrollTop = 0;
};

 //////////////////NUEVO PARA CICLO /////////

const itemHeight = 50; // Altura de cada elemento

const hoursColumn = ref<HTMLElement | null>(null);
const minutesColumn = ref<HTMLElement | null>(null);
const periodsColumn = ref<HTMLElement | null>(null);

const inputHours = ref<HTMLElement | null>(null);
const inputMinutes = ref<HTMLElement | null>(null);
const inputPeriods = ref<HTMLElement | null>(null);

const cyclicArray = (arr: string[], startIndex: number) => {
  return [...arr.slice(startIndex), ...arr.slice(0, startIndex)];
};

const hoursToShow = computed(() => cyclicArray(hours, hoursStartIndex.value));
const minutesToShow = computed(() => cyclicArray(minutes, minutesStartIndex.value));

const onScroll = (type: 'hours' | 'minutes' | 'periods') => {
  const column = type === 'hours' ? hoursColumn.value : type === 'minutes' ? minutesColumn.value : periodsColumn.value;
  if (!column) return;

  const { scrollTop, scrollHeight, clientHeight } = column;
  const maxScrollTop = scrollHeight - clientHeight;

  if (scrollTop >= maxScrollTop) {
    incrementStartIndex(type);
    column.scrollTop = 1;
  } else if (scrollTop <= 0) {
    decrementStartIndex(type);
    column.scrollTop = maxScrollTop - 1;
  }
};

const incrementStartIndex = (type: 'hours' | 'minutes' | 'periods') => {
  if (type === 'hours') {
    hoursStartIndex.value = (hoursStartIndex.value + 1) % hours.length;
  } else if (type === 'minutes') {
    minutesStartIndex.value = (minutesStartIndex.value + 1) % minutes.length;
  } else if (type === 'periods') {
    periodsStartIndex.value = (periodsStartIndex.value + 1) % periods.value.length;
  }
};

const decrementStartIndex = (type: 'hours' | 'minutes' | 'periods') => {
  if (type === 'hours') {
    hoursStartIndex.value = (hoursStartIndex.value - 1 + hours.length) % hours.length;
  } else if (type === 'minutes') {
    minutesStartIndex.value = (minutesStartIndex.value - 1 + minutes.length) % minutes.length;
  } else if (type === 'periods') {
    periodsStartIndex.value = (periodsStartIndex.value - 1 + periods.value.length) % periods.value.length;
  }
};

/// PARA VALIDAR LA ENTRADA DE DATOS
const validateHour = (event: any) => {
  const hourParse = parseInt(selectedHour.value);
   if ( hourParse < 1 ||  hourParse > 12 || isNaN( hourParse)) {
    selectedHour.value = '01';
    event.target.select();    
  } else {
    selectedHour.value = hourParse.toString().padStart(2, '0'); 
    if(hourParse > 2) inputMinutes.value?.focus();
  }
  updateAllColumns();
};

const validateMinute = (event: any) => {
  const minute = parseInt(selectedMinute.value);
  if (minute < 0 || minute > 59 || isNaN(minute)) {
    selectedMinute.value = '00';
    event.target.select(); 
  } else {
    selectedMinute.value = minute.toString().padStart(2, '0');
    if(((selectedMinute.value).toString()).charAt(0) !== '0') inputPeriods.value?.focus() 
  }
  updateAllColumns();
};

const validatePeriod = () => { 
  const allowedChars = ['a', 'p', 'm']; 
  if(selectedPeriod.value) {
  const period = selectedPeriod.value.toLowerCase();

  if (allowedChars.includes(period)) {   
    if (period !== 'AM' && period !== 'PM') {   
      selectedPeriod.value = 'AM';
    } else if (period == 'AM' || period.charAt(0) == 'A'){   
      selectedPeriod.value = 'AM';
    }
    else if (period == 'PM' || period.charAt(0) == 'P'){   
      selectedPeriod.value = 'PM';
    }
  }
    else{
      selectedPeriod.value = period;    
    } 
  }
};

const checkKey = (event: any, inputRef: string)=>{
  // Verifica si la tecla presionada es "Backspace"
      if (event.key === 'Backspace') {
        if(inputRef === 'inputHours')selectedHour.value = '--';
        if(inputRef === 'inputMinutes')selectedMinute.value = '--';       
      }
      else if (event.key === 'ArrowRight') {       
        // Aquí puedes agregar la lógica que necesites cuando se presiona la flecha derecha
        if(inputRef === 'inputHours') inputMinutes.value?.focus();
        if(inputRef === 'inputMinutes') inputPeriods.value?.focus();
      }
      else if (event.key === 'ArrowLeft') {       
        // Aquí puedes agregar la lógica que necesites cuando se presiona la flecha izquierda    
        if(inputRef === 'inputMinutes') {
          inputHours.value?.focus();
          //inputHours.value?.select();
        }
        if(inputRef === 'inputPeriods') inputMinutes.value?.focus();
      }
    
      else{
        /*const allowedChars = ['a', 'p', 'm'];
              if (!allowedChars.includes(selectedPeriod.value.toLowerCase())) {
              const key = event.key.toLowerCase();
              if (key === 'a') {        
                selectedPeriod.value = 'AM';
              } else if (key === 'p') {       
                selectedPeriod.value = 'PM';
              }
            }*/
      }
  
    updateAllColumns(); 
  }

  const checkDown = (event: any, inputRef: string)=>{     
  // Aquí puedes agregar la lógica que necesites cuando se presiona la flecha arriba    
        if(inputRef === 'inputHours') {
          if(parseInt(selectedHour.value) > 1 && selectedHour.value) {
            event.target.value = parseInt(selectedHour.value) - 1;
            selectedHour.value = (parseInt(selectedHour.value) -1).toString().padStart(2, '0');
          }
          else{
            selectedHour.value = '12';
          }
        }

        if(inputRef === 'inputMinutes') {
          if(parseInt(selectedMinute.value) > 0 && selectedMinute.value) {
            event.target.value = parseInt(selectedMinute.value) - 1;
            selectedMinute.value = (parseInt(selectedMinute.value) -1).toString().padStart(2, '0');
          }
          else{
            selectedMinute.value = '59';
          }
        }     
    updateAllColumns(); 
  }

    const checkUP = (event: any, inputRef: string)=>{     
  // Aquí puedes agregar la lógica que necesites cuando se presiona la flecha arriba    
        if(inputRef === 'inputHours') {
          if(parseInt(selectedHour.value) < 12 && selectedHour.value) {
            event.target.value = parseInt(selectedHour.value) + 1;
            selectedHour.value = (parseInt(selectedHour.value) +1).toString().padStart(2, '0');
          }
          else{
            selectedHour.value = '01';
          }
        }

        if(inputRef === 'inputMinutes') {
          if(parseInt(selectedMinute.value) < 59 && selectedMinute.value) {
            event.target.value = parseInt(selectedMinute.value) + 1;
            selectedMinute.value = (parseInt(selectedMinute.value) +1).toString().padStart(2, '0');
          }
          else{
            selectedMinute.value = '00';
          }
        }     
    updateAllColumns(); 
  }

      const  checkDownOrUpPeriod = ()=>{     
  // Aquí puedes agregar la lógica que necesites cuando se presiona la flecha arriba o abajo  
        if(selectedPeriod.value) {
          if(selectedPeriod.value === 'AM'){
            selectedPeriod.value = 'PM';
          } 
          else if(selectedPeriod.value === 'PM'){
            selectedPeriod.value = 'AM';
          }
        }
        else {
           selectedPeriod.value = 'AM';
        }
    updateAllColumns(); 
  }

const selectAllText = (event : any) => {
      event.target.select();      
    }

const formatTime = (time: string) =>{
  // Separar la hora y los minutos
  let [hour, minute] = time.split(':').map(Number);

  // Determinar si es AM o PM
  let period = 'AM';
    
    if (hour > 12) {
      hour -= 12;
      period = 'PM';
    }

  // Convertir hora 0 a 12 AM
  if (hour === 0) {
    hour = 12;
  }

  // Formatear la hora a dos dígitos si es menor que 12
  hour = parseInt(hour.toString().padStart(2, '0'));

  // Retornar la hora y los minutos con el periodo (AM/PM)
  return { hour, minute, period };
}

const convertTo24HourFormat = (time12h: string) => {
  // Separar la hora, los minutos y el periodo (AM/PM)
  const [time, period] = time12h.split(' ');
  let [hour, minute] = time.split(':').map(Number);

  // Convertir a formato de 24 horas
  if (period === 'PM' && hour !== 12) {
    hour += 12;
  } else if (period === 'AM' && hour === 12) {
    hour = 0;
  }

  // Formatear la hora y los minutos a dos dígitos
  hour = parseInt(hour.toString().padStart(2, '0'));
  minute = parseInt(minute.toString().padStart(2, '0'));

  // Retornar la hora en formato de 24 horas
  return  `${hour}:${minute}`;
 
}


return{
    checkKey, 
    formatTime, 
    hoursColumn,
    checkDown,
    checkUP,
    checkDownOrUpPeriod,
  convertTo24HourFormat,
  formattedTime,
  hoursToShow, 
  inputHours,
  inputMinutes,
  inputPeriods, 
  minutesColumn,
  minutesToShow,
  onScroll,
  periods, 
  selectAllText,
  selectedHour,
  selectedMinute,
  selectedPeriod,
  selectHour,
  selectMinute,
  selectPeriod,
  showDropdown,
  showValidationMessage,
  updateAllColumns,
  validateHour,
  validateMinute,
  validatePeriod,
  wrapper
}

}