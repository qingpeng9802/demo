// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "demo" is now active in the web extension host!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const documentSymbolProvider = vscode.languages.registerDocumentSymbolProvider(
    { language: 'plaintext' },
    {
      provideDocumentSymbols(document, token) {
        const t = performance.now();
        const docStr = document.getText();
        const matchRes = docStr.matchAll(/(\w+)/ig);
        const res: vscode.DocumentSymbol[] = [];
        for (const r of matchRes) {
          if (!r.index) {
            continue;
          }

          const range = new vscode.Range(document.positionAt(r.index), document.positionAt(r.index + r.length));
          res.push(new vscode.DocumentSymbol(r[1], '', vscode.SymbolKind.Function, range, range));
        }

        console.log(`Takes: ${performance.now() - t}ms`)
        return res;
      }
    }
  );
  context.subscriptions.push(documentSymbolProvider);

}

// this method is called when your extension is deactivated
export function deactivate() {}
