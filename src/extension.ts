import { commands, ExtensionContext, window } from "vscode";
import { MyTreeDataProvider } from "./myTreeDataProvider";

export function activate(context: ExtensionContext) {
  const treeViewProvider = new MyTreeDataProvider();
  const treeView = window.createTreeView("myTreeView", {
    treeDataProvider: treeViewProvider,
  });

  let disposable = commands.registerCommand(
    "treeview-extension.deleteItem",
    async () => {
      // Workaround for bug
      await treeView.reveal(treeViewProvider.parent, {
        select: true,
        focus: true,
      });
      treeViewProvider.deleteItem();
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}
