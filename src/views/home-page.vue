<script>
import "devextreme/data/odata/store";
import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxScrolling,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import { computed } from "vue";

export default {
  setup() {
    const includeWidth = computed(() => { return window.innerWidth < 768 ? '60px' : '100px' });
    const dataSourceConfig = [
      {
        "id": 5623,
        "hasPictures": false,
        "address": "Flat 2, Colebrook, High Street, Reading, RG8 9AR",
        "price": 0.0000,
        "beds": 1,
        "category": "For Sale",
        "marketDate": "2024-11-18T00:00:00",
        "marketDays": 90,
        "ownerId": 4501,
        "ownerName": "Grace Murphy",
        "ownerEmail": "test9029@brightlogic.co.uk",
        "ownerMobile": "0716200401",
        "lastViewed": "0001-01-01T00:00:00",
        "totalViewings": 0,
        "totalEmails": 0,
        "totalSmsTexts": 0,
        "totalWebViews": 0,
        "totalNegativeFeedback": 0,
        "totalPositiveFeedback": 0,
        "totalOffers": 0
      },
      {
        "id": 1197,
        "hasPictures": false,
        "address": "New Barn Court, Bakers Lane, Brightwell-Cum-Sotwell, Wallingford, OX10 0PX",
        "price": 0.0000,
        "beds": 4,
        "category": "To Let",
        "marketDate": "2024-11-18T00:00:00",
        "marketDays": 90,
        "ownerId": 6632,
        "ownerName": "Brennan Jennings",
        "ownerEmail": "test2878@brightlogic.co.uk",
        "ownerMobile": "0738840609",
        "lastViewed": "0001-01-01T00:00:00",
        "totalViewings": 0,
        "totalEmails": 106,
        "totalSmsTexts": 0,
        "totalWebViews": 0,
        "totalNegativeFeedback": 0,
        "totalPositiveFeedback": 0,
        "totalOffers": 1
      }
    ];
    return {
      includeWidth,
      dataSourceConfig,
    };
  },
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxScrolling,
    DxSearchPanel,
  }
};
</script>

<template>
  <div>
    <h2 class="content-block">With Cell Template</h2>
    <div class="container">
      <DxDataGrid class="dx-card wide-card" :data-source="dataSourceConfig" :key-expr="'id'" :show-borders="false"
        :focused-row-enabled="true" :column-auto-width="false" :column-hiding-enabled="true"
        :selection="{ mode: 'single' }" :hover-state-enabled="true" height="600px">
        <dx-filter-row :visible="false" />
        <DxScrolling mode="virtual" />
        <DxSearchPanel :visible="true" />

        <DxColumn data-field="include" :visible="displayIncludeColumn" caption="Include" :hiding-priority="8"
          :width="includeWidth" cell-template="includeCell" />
        <DxColumn data-field="hasPictures" caption="Picture" :hiding-priority="16" width="150px"
          cell-template='pictureCell' />
        <DxColumn data-field="address" caption="Address" :hiding-priority="2" width="200px"
          cell-template="propertyCell" />
        <DxColumn data-field="price" caption="Price" :hiding-priority="14" width="115px" />
        <DxColumn data-field="beds" caption="Beds" :hiding-priority="13" width="115px" />
        <DxColumn data-field="category" caption="Category" :hiding-priority="12" width="115px" />
        <DxColumn data-field="marketDate" caption="Market Date" :hiding-priority="11" data-type="date"
          format='dd/MM/yyyy' width="115px" />
        <DxColumn data-field="ownerName" caption="Owner" :hiding-priority="10" width="245px"
          cell-template="contactCell" />
        <DxColumn data-field="lastViewed" caption="Last Viewed" :hiding-priority="9" cell-template="lastViewedCell" />
        <DxColumn data-field="totalViewings" caption="Viewings" :hiding-priority="8" width="80px" />
        <DxColumn data-field="totalEmails" caption="Emails" :hiding-priority="7" width="75px" />
        <DxColumn data-field="totalSmsTexts" caption="SMS Texts" :hiding-priority="6" width="75px" />
        <DxColumn data-field="totalWebViews" caption="Website Views" :hiding-priority="5" width="75px"
          cell-template='websiteViewsCell' />
        <DxColumn data-field="totalPositiveFeedback" caption="Positive Feedback" :hiding-priority="4" width="85px" />
        <DxColumn data-field="totalNegativeFeedback" caption="Negative Feedback" :hiding-priority="3" width="85px" />
        <DxColumn data-field="totalOffers" caption="Offers" :hiding-priority="2" width="75px" />
      </DxDataGrid>
    </div>
  </div>
</template>

<style scoped lang="css">
.container {
  height: 100%;
  flex-direction: column;
  display: flex;
}

.include-cell {
  display: flex;
  justify-content: center;
}
</style>