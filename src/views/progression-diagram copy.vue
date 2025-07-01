<script setup lang="ts">
import 'devexpress-diagram/dist/dx-diagram.min.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import DxDiagram, { DxNodes, DxEdges } from 'devextreme-vue/diagram';
// @ts-expect-error: no types available for 'devexpress-diagram'
import { DiagramCommand } from 'devexpress-diagram';
import { DiagramNodeItem } from '../types/DiagramNodeItem';

const styleExprNode = (item: DiagramNodeItem) => {
  return {
    fill: item.backgroundColour || '#FFFFFF',
    stroke: '#000000',
  };
};

const diagramNodeDataSource = [
  {
    id: 3592,
    key: '3592',
    backgroundColour: '#A7EC9D',
    text: 'Aaaaa\nAaaaaa',
    type: 'rectangle',
    width: 2.8,
    height: 1.5,
  },
  {
    id: 1060,
    key: '1060',
    backgroundColour: '#A7EC9D',
    text: 'Parent Node (Duane Gordon)',
    type: 'rectangle',
    width: 2.8,
    height: 1.5,
  },
  {
    id: 1059,
    key: '1059',
    backgroundColour: '#A7EC9D',
    text: 'Child Node (Dick Bryant)',
    type: 'rectangle',
    width: 2.8,
    height: 1.5,
  },
];

const diagramLinksDataSource = [
  {
    id: 1059,
    key: '1059',
    from: '1060', // Parent (will be placed at bottom)
    to: '1059', // Child (will be placed at top)
  },
  {
    id: 1060,
    key: '1060',
    from: '3592', // Parent (will be placed at bottom)
    to: '1060', // Child (will be placed at top)
  },
];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onInitialized = (e: any) => {
  e.component._diagramInstance.commandManager
    .getCommand(DiagramCommand.AutoLayoutTreeVerticalBottomToTop) // <-- Key change
    .execute();
};
</script>

<template>
  <DxDiagram
    id="diagram"
    units="in"
    :simple-view="true"
    :read-only="true"
    @initialized="onInitialized"
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
  </DxDiagram>
</template>
