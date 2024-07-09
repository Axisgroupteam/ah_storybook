import { reactive, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import router from "@/router";
import useAbilityStore from "@/utils/abilityStore";
import { useAuthStore } from "@/new_design/auth/stores/auth";
import { useFleetTypeStore } from "@/new_design/components/tables/fleetType/stores/fleetTypeStore";

export const useDrawerMenu = () => {
  const abilityStore = useAbilityStore();

  const { isBulk, isAggregate, isWalkingFloor, isBlock } = storeToRefs(
    useFleetTypeStore()
  );
  const { isDispatcher, dark, profile } = storeToRefs(useAuthStore());

  
  const route = useRoute();
  const hover = ref("leave");

  const computedItems = computed(() => {
    const Manageritems = menuItems.value[0].items;
    const MaintenanceItems = menuItems.value[1].items;
    const OperationItems = menuItems.value[2].items;
    return {
      maintenance: MaintenanceItems.filter((item) =>
        checkAbilities([
          item.viewCondition,
          ...(item.viewCondition2 ? [item.viewCondition2] : []),
          "all",
        ])
      ).length,
      manager: Manageritems.filter((item) =>
        checkAbilities([
          item.viewCondition,
          ...(item.viewCondition2 ? [item.viewCondition2] : []),
          "all",
        ])
      ).length,
      operation: OperationItems.filter((item) =>
        checkAbilities([
          item.viewCondition,
          ...(item.viewCondition2 ? [item.viewCondition2] : []),
          "all",
        ])
      ).length,
    };
  });

  const menuItems = computed(() => [
    {
      title: "Manager",
      items: [
        {
          icon: "dashboard",
          title: "Dashboard",
          name: "mDashboard",
          viewCondition: "companyUsers", //modify
        },
        {
          icon: "administrator",
          title: "Administrator",
          name: "administrator",
          viewCondition: "companyUsers",
        },
        {
          icon: "manager",
          title: "Manager",
          name: "manager",
          viewCondition: "companyUsers",
        },
        {
          icon: "employee",
          name: "employee",
          title: "Employee",
          viewCondition: "user",
        },
        {
          icon: "dispatcher",
          title: "Dispatcher",
          name: "dispatcher",
          viewCondition: "companyUsers",
        },
        {
          icon: "technician",
          title: "Technician",
          name: "technician",
          viewCondition: "user",
        },
        {
          icon: "driver",
          title: "Driver",
          name: "driver",
          viewCondition: "user",
        },
        {
          icon: "customer",
          title: "Customer",
          name: "customer",
          viewCondition2: "customers",
        },
        {
          icon: "location",
          title: "Location",
          name: "location",
          viewCondition: "charge-location",
        },
        {
          icon: "vehicle",
          name: "vehicle",
          title: "Vehicle",
          viewCondition: "vehicle",
        },
        {
          icon: "trailer",
          title: "Trailer",
          name: "trailer",
          viewCondition: "driver",
        },
      ],
    },
    {
      title: "Maintenance",
      items: [
        {
          icon: "dashboard",
          title: "Dashboard",
          name: "dashboard",
          viewCondition: "maintenanceDashboard",
        },
        {
          icon: "planning",
          name: "workorders",
          title: "Planning",
          viewCondition: "workOrder",
          viewCondition2: "issues",
        },
        {
          icon: "site-inspection",
          name: "inspections",
          title: "Site Inspections",
          viewCondition: "inspectOrder",
        },
        {
          icon: "dot-anual-insp",
          name: "dot",
          title: "DOT Annual Insp",
          viewCondition: "inspectionsDot",
        },
        {
          icon: "pm-inspection",
          name: "pm",
          title: "PM Inspection",
          viewCondition: "inspectionPm",
        },
        {
          icon: "monthly-inspection",
          name: "mon",
          title: "Monthly Inspection",
          viewCondition: "inspections",
        },
        {
          icon: "forklift-inspection",
          name: "fl",
          title: "Forklift Inspection",
          viewCondition: "inspectionFL",
        },
        {
          icon: "service-task",
          name: "services",
          title: "Service Task",
          viewCondition: "serviceTask",
        },
        {
          icon: "equipment",
          name: "equipments",
          title: "Equipment",
          viewCondition: "equipment",
        },
        {
          icon: "part-inventory",
          name: "parts",
          title: "Parts & Inventory",
          viewCondition: "inventory-distribution",
          viewCondition2: "parts",
        },
        {
          icon: "provider",
          name: "provider",
          title: "Provider",
          viewCondition: "inventory-purchase",
        },
        {
          icon: "warehouse",
          name: "locations",
          title: "Warehouse",
          viewCondition: "maintenance-locations",
        },
        {
          icon: "accounting",
          name: "accountability",
          title: "Accounting",
          viewCondition: "accounting",
        },
        {
          icon: "documents",
          name: "documents",
          title: "Documents",
          viewCondition: "accounting",
        },
      ],
    },
    {
      title: "Operation",
      items: [
        {
          icon: "dashboard",
          title: "Dashboard",
          name: "operation-dashboard",
          viewCondition: "chargeDashboard",
        },
        {
          name: "Bulk",
          title: "Bulk",
          icon: "bulk",
          viewCondition: "charge",
        },
        {
          name: "Aggregate",
          title: "Aggregate",
          icon: "aggregate",
          viewCondition: "charge",
        },
        {
          name: "Walking Floor",
          title: "Walking Floor",
          icon: "walking-floor",
          viewCondition: "charge",
        },
        {
          name: "TMF",
          title: "TMF",
          icon: "tmf",
          viewCondition: "precast-project",
          viewContition2: "charge",
        },
        {
          name: "Precast",
          title: "Precast",
          icon: "precast",
          viewCondition: "precast-project",
          viewContition2: "charge",
        },
        {
          name: "Block",
          title: "Block",
          icon: "blocks",
          viewCondition: "charge",
        },
        {
          name: "statistics",
          title: "Statistics",
          icon: "statistics",
          viewCondition: "dev",
        },
        {
          name: "operation_documents",
          title: "Documents",
          icon: "documents",
          viewCondition: "charge",
        },
      ].filter(({ name }) =>
        isDispatcher.value
          ? (name === "Bulk" && isBulk.value) ||
            (name === "Aggregate" && isAggregate.value) ||
            (name === "Block" && isBlock.value) ||
            (name === "Walking Floor" && isWalkingFloor.value) ||
            (name !== "Block" &&
              name !== "Aggregate" &&
              name !== "Bulk" &&
              name !== "Walking Floor")
          : true
      ),
    },
  ]);

  const getMenuItems = () => {
    if (route.path.includes("/manager")) {
      return menuItems.value[0].items;
    } else if (route.path.includes("/maintenance")) {
      return menuItems.value[1].items;
    } else {
      return menuItems.value[2].items;
    }
  };

  const checkAbilities = (conditions: string[]) => {
    const actionsArray = ["view", "manage"];
    return (
      conditions.includes("dev") ||
      actionsArray.some((action) =>
        conditions.some((condition) =>
          abilityStore.abilities &&
          typeof abilityStore.abilities.can === "function"
            ? abilityStore.abilities.can(action, condition)
            : false
        )
      )
    );
  };

  const onlyWithPermission = ref([]);

  const getOnlyWithPermission = () => {
    onlyWithPermission.value = [];
    getMenuItems().map((item) => {
      if (
        checkAbilities([
          item.viewCondition,
          ...(item.viewCondition2 ? [item.viewCondition2] : []),
          "all",
        ])
      ) {
        onlyWithPermission.value.push(item);
      }
    });
    return onlyWithPermission.value;
  };

  onMounted(() => {
    if (
      route.fullPath.includes("/maintenance") &&
      computedItems.value.maintenance === 0
    ) {
      router.push("/manager");
      if (computedItems.value.manager === 0) {
        router.push("/operation");
      }
    }
    if (
      route.fullPath.includes("/manager") &&
      computedItems.value.manager === 0
    ) {
      router.push("/operation");
      if (computedItems.value.operation === 0) {
        router.push("/nonav");
      }
    }
  });

  return {
    getMenuItems,
    checkAbilities,
    route,
    hover,
    dark,
    getOnlyWithPermission,
  };
};
