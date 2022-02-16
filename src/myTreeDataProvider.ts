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
    collapsibleState: TreeItemCollapsibleState,
    public parent: MyTreeItem | null
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

  public parent: MyTreeItem;
  private children: MyTreeItem[] = [];

  constructor() {
    this.parent = new MyTreeItem(
      "outer",
      TreeItemCollapsibleState.Collapsed,
      null
    );
    this.children.push(
      new MyTreeItem("inner", TreeItemCollapsibleState.None, this.parent)
    );
  }

  /** @override */
  getTreeItem(element: MyTreeItem): TreeItem | Thenable<TreeItem> {
    return element;
  }

  /** @override */
  getChildren(element?: MyTreeItem): ProviderResult<MyTreeItem[]> {
    if (element) {
      return this.children;
    }
    return [this.parent];
  }

  /** @override */
  getParent(element?: MyTreeItem): ProviderResult<MyTreeItem> {
    return element?.parent;
  }

  refreshParent() {
    this.onDidChangeTreeDataEmitter.fire(this.parent);
  }

  deleteItem() {
    this.children.pop();
    this.refreshParent();
  }
}
