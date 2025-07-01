import { ref, Ref } from 'vue';
import { DiagramNodeItem } from '../types/DiagramNodeItem';
import { DiagramLinkItem } from '../types/DiagramLinkItem';
import { PropertyChainItem } from '../types/PropertyChainItem';

export class DiagramUtils {
  private diagramNodeDataSource: Ref<DiagramNodeItem[]>;
  private diagramLinksDataSource: Ref<DiagramLinkItem[]>;

  constructor(
    initialNodes: DiagramNodeItem[] = [],
    initialLinks: DiagramLinkItem[] = []
  ) {
    this.diagramNodeDataSource = ref(initialNodes);
    this.diagramLinksDataSource = ref(initialLinks);
  }

  public mapItems(items: PropertyChainItem[]): DiagramNodeItem[] {
    return items.map((item) => ({
      id: item.id,
      key: item.id.toString(),
      backgroundColour: item.backgroundColour,
      text: item.text.replace(/<b>(.*?)<\/b>/g, '$1').replace(/\r\n/g, '\n'),
      type: 'rectangle',
      width: 1.8,
      height: 1,
    }));
  }

  public updateNodesDataSource(propertyChainItems: PropertyChainItem[]): void {
    const items: DiagramNodeItem[] = this.mapItems(propertyChainItems);
    this.diagramNodeDataSource.value = items;
  }

  public updateLinksDataSource(propertyChainItems: PropertyChainItem[]): void {
    const items = propertyChainItems;

    // Create a Set of all valid IDs
    const validIds = new Set(items.map((item) => item.id));

    // Reset invalid linkedTo values to 0
    items.forEach((item) => {
      if (item.linkedTo !== 0 && !validIds.has(item.linkedTo)) {
        item.linkedTo = 0;
      }
    });

    // Create links only for valid linked items
    const links: DiagramLinkItem[] = items
      .filter((item) => item.linkedTo !== 0)
      .map((item) => ({
        id: item.id,
        key: item.id.toString(),
        from: item.linkedTo.toString(),
        to: item.id.toString(),
      }));

    this.diagramLinksDataSource.value = links;
  }

  // Getters for the data sources
  public get nodesDataSource(): Ref<DiagramNodeItem[]> {
    return this.diagramNodeDataSource;
  }

  public get linksDataSource(): Ref<DiagramLinkItem[]> {
    return this.diagramLinksDataSource;
  }
}
