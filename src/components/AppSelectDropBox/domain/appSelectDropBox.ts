import { ref, type Ref, watch, onMounted, computed } from "vue";
import { useAuthStore } from "@/new_design/auth/stores/auth";
import { storeToRefs } from "pinia";
import { useDrawerStore } from "@/new_design/layouts/appLayouts/components/drawer/domain/drawerStore";
import router from "@/router";
import { useRoute } from "vue-router";
import { useWindowSize } from "@vueuse/core";
export const useAppSelectDropBox = () => {
  const openOptions = ref(false);
  const authStore = useAuthStore();
  const { dark } = storeToRefs(authStore);
  const drawerStore = useDrawerStore();
  const { isExpanded } = storeToRefs(drawerStore);
  const route = useRoute();
  const { width, height } = useWindowSize();
  const otherOptions = ref();
  const hov = ref(false);
  // const selectedIcon = ref(options.value[0].icon)
  const selectedText = ref("");
  // const selectedColor = ref(options.value[0].color)
  const _class = ref("focus:ring-0");

  const handleRing = () => {
    openOptions.value = !openOptions.value;
    _class.value =
      _class.value === "focus:ring-[3px]" ? "focus:ring-0" : "focus:ring-[3px]";
    updateSize();
  };

  const primary = ref(null);
  const BothWidth = ref(0);
  const updateSize = () => {
    BothWidth.value = primary.value?.offsetWidth;

  };
  watch(height, updateSize);

  const handleLeaveOption = () => {
    openOptions.value = false;
    // _class.value = "focus:ring-0";
  };


  const ALL__PERMISSIONS = ref(JSON.parse(localStorage.getItem('permissions')))


  const options: Ref<string[]> = ref([])


 

  const handleSelectItem = (text: string) => {

    hov.value = false;
    otherOptions.value = [];
    openOptions.value = false;
    _class.value = "focus:ring-0";
    options.value.map((op) =>
      op !== text ? otherOptions.value.push(op) : undefined
    );
    selectedText.value = text;
    router.push(`/${text.toLowerCase()}`);
  };

  const TOTAL_MODULES_ACCESS = computed(()=> options.value.length)


  

  onMounted(() => {
    
    
    
    ALL__PERMISSIONS.value.map((i)=> {
      if(options.value.length === 3) return;
      // console.log(i.subject)
      switch (i.subject) {
        
        case 'chargeDashboard':
          if(!options.value.includes('Operation')){
            options.value.push('Operation')
          }
          break;

        case 'charge':
          if(!options.value.includes('Operation')){
            options.value.push('Operation')
          }
          break;
        
        case 'companyUsers':
            if(!options.value.includes('Manager')){
              options.value.push('Manager')
            }
            break;
        case 'user':
          if(!options.value.includes('Manager')){
            options.value.push('Manager')
          }
          break;
        case 'customers':
          if(!options.value.includes('Manager')){
            options.value.push('Manager')
          }
          break;
        case 'charge-location':
          if(!options.value.includes('Manager')){
            options.value.push('Manager')
          }
          break;
        case 'vehicle' :
          if(!options.value.includes('Manager')){
            options.value.push('Manager')
          }
          break;
        case 'driver':
          if(!options.value.includes('Manager')){
            options.value.push('Manager')
          }
          break;
            
        case 'maintenanceDashboard':
            if(!options.value.includes('Maintenance')){
              options.value.push('Maintenance')
            }
            break;
        case 'issues':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'inspectOrder':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'inspectionsDot':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'inspectionPm':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'inspections':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'inspectionFL':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'serviceTask':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'equipment':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'parts':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'inventory-purchase':
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
        case 'maintenance-locations' :
          if(!options.value.includes('Maintenance')){
            options.value.push('Maintenance')
          }
          break;
          case  'accounting' :
            if(!options.value.includes('Maintenance')){
              options.value.push('Maintenance')
            }
            break;
  
        default:
          
          break;
      }
   
  
    })
     

    /* esto es para los usuarios que no tienen mainApp y los redirecciona para un modulo forzado
       cuando pase esto el selector de modulos no va a moner por defecto el nombre de la web redireccionada
       si este no tiene al menos un elemento
    */ 

    if(route.path.includes("manager")){
      if(options.value.includes('Manager') )
          handleSelectItem("Manager")
      else if(options.value.includes("Maintenance"))
          handleSelectItem("Maintenance")
      else
        handleSelectItem('Operation')
    } else if(route.path.includes("maintenance")){
        if(options.value.includes('Maintenance') )
          handleSelectItem("Maintenance")
        else if(options.value.includes("Manager"))
          handleSelectItem("Manager")
        else
          handleSelectItem('Operation')
    } else {
        if(options.value.includes('Operation') )
          handleSelectItem("Operation")
        else if(options.value.includes("Manager"))
          handleSelectItem("Manager")
        else
          handleSelectItem('Maintenance')
    }

    
    
  //   route.path.includes("manager")
  //     ? (selectedText.value = "Manager")
  //     : route.path.includes("maintenance")
  //     ? (selectedText.value = "Maintenance")
  //     : (selectedText.value = "Operation");
  //   handleSelectItem(selectedText.value);
  });

  

  return {
    openOptions,
    _class,
    handleRing,
    selectedText,
    hov,
    otherOptions,
    handleSelectItem,
    dark,
    isExpanded,
    handleLeaveOption,
    route,
    width,
    height,
    BothWidth,
    updateSize,
    primary,
    TOTAL_MODULES_ACCESS
  };
}

