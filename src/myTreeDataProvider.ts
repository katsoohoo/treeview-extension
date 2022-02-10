import {
  Event,
  EventEmitter,
  ProviderResult,
  TreeDataProvider,
  TreeItem,
  TreeItemCollapsibleState,
} from "vscode";

class MyTreeItem extends TreeItem {
  public constructor(
    label: string,
    collapsibleState: TreeItemCollapsibleState
  ) {
    super(label, collapsibleState);
  }
}

export class MyTreeDataProvider implements TreeDataProvider<MyTreeItem> {
  private onDidChangeTreeDataEmitter: EventEmitter<
    MyTreeItem | undefined | null | void
  > = new EventEmitter<MyTreeItem | undefined | null | void>();
  readonly onDidChangeTreeData: Event<MyTreeItem | undefined | null | void> =
    this.onDidChangeTreeDataEmitter.event;

  private parent: TreeItem;
  private children: TreeItem[] = [];

  constructor() {
    this.parent = new MyTreeItem("outer", TreeItemCollapsibleState.Collapsed);
    this.children.push(new MyTreeItem("inner", TreeItemCollapsibleState.None));
  }

  getTreeItem(element: MyTreeItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  getChildren(element?: MyTreeItem): ProviderResult<MyTreeItem[]> {
    if (element) {
      return this.children;
    }
    return [this.parent];
  }

  refreshParent() {
    this.onDidChangeTreeDataEmitter.fire(this.parent);
  }

  deleteItem() {
    this.children.pop();
    this.refreshParent();
  }
}
