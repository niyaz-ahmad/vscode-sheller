// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
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
			// TODO: select entire lines in range of current line
			lines = editor.document.lineAt(editor.selection.active.line).text.trim() + "\n";
			

			// var firstLine = editor.document.lineAt(0);
			// var lastLine = editor.document.lineAt(editor.document.lineCount - 1);
			// var textRange = new vscode.Range(firstLine.range.start, lastLine.range.end);

			// let invalidRange = new Range(0, 0, textDocument.lineCount /*intentionally missing the '-1' */, 0);
			// let fullRange = textDocument.validateRange(invalidRange);
			// editor.edit(edit => edit.replace(fullRange, newText));
			
		}else{
			lines = editor.document.getText(selection).trim()+"\n";
			// TODO: select entire lines in range of selection
		}
		if(lines!==""){
			vscode.window.activeTerminal.sendText(lines)
		}
		vscode.window.showInformationMessage('lines: `'+lines+'`');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
