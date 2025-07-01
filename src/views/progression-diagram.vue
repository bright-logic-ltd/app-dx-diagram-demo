<script setup lang="ts">
import 'devexpress-diagram/dist/dx-diagram.min.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import {
  DxDiagram,
  DxNodes,
  DxEdges,
  DxHistoryToolbar,
  DxViewToolbar,
  DxToolbox,
  DxContextMenu,
} from 'devextreme-vue/diagram';
// @ts-expect-error: no types available for 'devexpress-diagram'
import { DiagramCommand } from 'devexpress-diagram';
import { DxSwitch } from 'devextreme-vue/switch';
import { DiagramNodeItem } from '../types/DiagramNodeItem';
import service from './diagram-data';
import { nextTick, onMounted, ref } from 'vue';
import { DiagramLinkItem } from '../types/DiagramLinkItem';
import { PropertyChainItem } from '../types/PropertyChainItem';
import { DiagramUtils } from '../utils/DiagramUtils';

const styleExprNode = (item: DiagramNodeItem) => {
  return {
    fill: item.backgroundColour || '#FFFFFF',
    stroke: '#000000',
  };
};

const diagramRef = ref();
const diagramUtils = new DiagramUtils();
const diagramNodeDataSource = ref<DiagramNodeItem[]>([]);
const diagramLinksDataSource = ref<DiagramLinkItem[]>([]);
const propertyChainItems = ref<PropertyChainItem[]>([]);
const originalPropertyChainItems = ref<PropertyChainItem[]>([]);
const dxSwitchValue = ref(true);

onMounted(async () => {
  await fetchPropertyChainData();
  inactiveToggleValueChange();
});

const fetchPropertyChainData = async () => {
  try {
    originalPropertyChainItems.value = service.getTasks();
  } catch (err) {
    originalPropertyChainItems.value = [];
    console.log(err);
  }
};

const updateDiagram = (propertyChainItems: PropertyChainItem[]) => {
  diagramUtils.updateNodesDataSource(propertyChainItems);
  diagramUtils.updateLinksDataSource(propertyChainItems);

  // Access the data sources
  diagramNodeDataSource.value = [...diagramUtils.nodesDataSource.value];
  diagramLinksDataSource.value = [...diagramUtils.linksDataSource.value];

  updateDiagramLayout();
};

const updateDiagramLayout = () => {
  nextTick(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const diagramComponent = diagramRef.value as any;
    if (diagramComponent) {
      // Give it a very small delay even here, just in case
      setTimeout(() => {
        diagramComponent.commandManager
          .getCommand(DiagramCommand.AutoLayoutTreeVerticalBottomToTop)
          .execute();
      }, 50);
    }
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onInitialized = (e: any) => {
  const diagram = e.component._diagramInstance;

  diagramRef.value = diagram;
  // Apply bottom-to-top layout after initialization
  setTimeout(() => {
    diagram.commandManager
      .getCommand(DiagramCommand.AutoLayoutTreeVerticalBottomToTop)
      .execute();
  }, 100);
};
const inactiveToggleValueChange = async () => {
  if (!dxSwitchValue.value) {
    propertyChainItems.value = originalPropertyChainItems.value
      .filter((item) => !item.isInactive)
      .map((item) => ({ ...item }));
  } else {
    propertyChainItems.value = [...originalPropertyChainItems.value];
  }

  updateDiagram(propertyChainItems.value);
  updateDiagramLayout();
};
</script>

<template>
  <div class="switch-container">
    <DxSwitch
      v-model:value="dxSwitchValue"
      @valueChanged="inactiveToggleValueChange"
    />
  </div>
  <DxDiagram
    id="diagram"
    @initialized="onInitialized"
    units="in"
    :simple-view="true"
    :readOnly="false"
  >
    <DxNodes
      :data-source="diagramNodeDataSource"
      :key-expr="'key'"
      :text-expr="'text'"
      :type-expr="'type'"
      :width-expr="'width'"
      :height-expr="'height'"
      :style-expr="styleExprNode"
    />

    <DxEdges
      :data-source="diagramLinksDataSource"
      :key-expr="'key'"
      :from-expr="'from'"
      :to-expr="'to'"
    />
    <DxHistoryToolbar :visible="false" />
    <DxViewToolbar :visible="true" />
    <DxToolbox :visibility="'hidden'" />
    <DxContextMenu :enabled="false" />
  </DxDiagram>
</template>
<style scoped lang="scss">
.switch-container {
  display: flex;
  justify-content: center;
  padding: 10px;
}
</style>
