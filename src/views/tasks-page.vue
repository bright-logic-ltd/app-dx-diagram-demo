<script>
import 'devextreme/data/odata/store';
import { computed } from 'vue';
import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxScrolling,
  DxSearchPanel,
} from 'devextreme-vue/data-grid';

const priorities = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 },
];

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxScrolling,
    DxSearchPanel,
  },
  setup() {
    const includeWidth = computed(() => {
      return window.innerWidth < 768 ? '60px' : '600px';
    });
    const dataSourceConfig = {
      store: {
        version: 2,
        type: 'odata',
        key: 'Task_ID',
        url: 'https://js.devexpress.com/Demos/DevAV/odata/Tasks',
      },
      expand: 'ResponsibleEmployee',
      select: [
        'Task_ID',
        'Task_Subject',
        'Task_Start_Date',
        'Task_Due_Date',
        'Task_Status',
        'Task_Priority',
        'Task_Completion',
        'ResponsibleEmployee/Employee_Full_Name',
      ],
    };
    return {
      includeWidth,
      dataSourceConfig,
      priorities,
    };
  },
};
</script>
<template>
  <div class="grid-container">
    <h2 class="content-block">Tasks</h2>
    <div class="grid-wrapper">
      <dx-data-grid
        class="dx-card wide-card"
        :data-source="dataSourceConfig"
        :key-expr="'Task_ID'"
        :show-borders="false"
        :focused-row-enabled="true"
        :column-auto-width="false"
        :column-hiding-enabled="true"
        :selection="{ mode: 'single' }"
        :hover-state-enabled="true"
      >
        <dx-filter-row :visible="false" />
        <DxScrolling mode="virtual" />
        <DxSearchPanel :visible="true" />

        <dx-column data-field="Task_ID" width="90px" :hiding-priority="2" />
        <dx-column
          data-field="Task_Subject"
          caption="Subject"
          :width="includeWidth"
          :hiding-priority="8"
        />
        <dx-column
          data-field="Task_Status"
          caption="Status"
          width="190px"
          :hiding-priority="6"
        />
        <dx-column
          data-field="Task_Priority"
          caption="Priority"
          width="90px"
          :hiding-priority="5"
        />
        <dx-column
          data-field="ResponsibleEmployee.Employee_Full_Name"
          caption="Assigned To"
          width="190px"
          :allow-sorting="false"
          :hiding-priority="7"
        />
        <dx-column
          data-field="Task_Start_Date"
          caption="Start Date"
          data-type="date"
          width="190px"
          :hiding-priority="3"
        />
        <dx-column
          data-field="Task_Due_Date"
          caption="Due Date"
          data-type="date"
          width="190px"
          :hiding-priority="4"
        />
        <dx-column
          data-field="Task_Priority"
          caption="Priority"
          name="Priority"
          width="290px"
          :hiding-priority="1"
        />
        <dx-column
          data-field="Task_Completion"
          caption="Completion"
          width="290px"
          :hiding-priority="0"
        />
      </dx-data-grid>
    </div>
  </div>
</template>
<style scoped>
/* Ensure the container takes up the full height and width of the browser */
.grid-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Full viewport height */
  width: 100vw;
  /* Full viewport width */
  padding: 16px;
  /* Add some padding for better spacing */
  box-sizing: border-box;
  /* Include padding in the width/height calculation */
}

/* Header styling */
.content-block {
  margin-bottom: 16px;
  /* Add spacing below the header */
}

/* Grid wrapper to ensure the DataGrid takes up the remaining space */
.grid-wrapper {
  flex: 1;
  /* Take up remaining space */
  overflow: hidden;
  /* Prevent overflow */
}

/* Ensure the DataGrid takes up the full space of its container */
.dx-card.wide-card {
  height: 100%;
  /* Full height of the parent */
  width: 100%;
  /* Full width of the parent */
}

/* Responsive adjustments for smaller screens */
@media (max-width: 768px) {
  .grid-container {
    padding: 8px;
    /* Reduce padding on smaller screens */
  }

  .dx-card.wide-card {
    font-size: 14px;
    /* Adjust font size for better readability on mobile */
  }

  .dx-column {
    width: auto !important;
    /* Allow columns to adjust their width */
  }
}
</style>
