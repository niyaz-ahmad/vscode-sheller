// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { start } = require('repl');
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "sheller" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('sheller.run', function () {
		// The code you place here will be executed every time your command is executed

		lines = 'Hello World from sheller!'
		var editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; // No open text editor
		}

		var selection = editor.selection;
		var lines = ""
		
		if(selection.isEmpty){
			lines = editor.document.lineAt(editor.selection.active.line).text.trim() + "\n";

			// var firstLine = editor.document.lineAt(0);
			// var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			// var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

			// let invalidRange = new Range(0, 0, textDocument.lineCount /*intentionally missing the '-1' */, 0);
			// let fullRange = textDocument.validateRange(invalidRange);
			// editor.edit(edit => edit.replace(fullRange, newText));
			
		}else{
			// selection.with()
			var arrayLines = editor.document.getText(selection).trim().split('\n') ;
			var countLines = arrayLines.length;
			switch ( countLines ) {
				case 0:
					break;
				case 1: 
					arrayLines[0] = editor.document.lineAt(selection.start.line).text
					break;
				default:
					arrayLines[0] = editor.document.lineAt(selection.start.line).text
					arrayLines[countLines-1] = editor.document.lineAt(selection.end.line).text;
					break;
			}
			lines = arrayLines.join('\n') + "\n";
		}

		if(lines!=="\n"){
			vscode.window.activeTerminal.sendText(lines)
			vscode.window.showInformationMessage('Executing: `'+ lines +'`');
		}else{
			vscode.window.showInformationMessage('Nothing to execute');

		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
