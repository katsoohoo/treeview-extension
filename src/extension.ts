import { commands, ExtensionContext, window } from 'vscode';
import { MyTreeDataProvider } from './myTreeDataProvider';

export function activate(context: ExtensionContext) {
	const treeViewProvider = new MyTreeDataProvider();
	window.registerTreeDataProvider('myTreeDataProvider', treeViewProvider);
	let disposable = commands.registerCommand('myextension.deleteItem', () => {
		treeViewProvider.deleteItem();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
