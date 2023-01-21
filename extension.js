const { start } = require('repl');

const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Extension "sheller" is now active. Ctrl+Enter will send current/selected line/s to shell.');
	let disposable = vscode.commands.registerCommand('sheller.run', function () {
		var editor = vscode.window.activeTextEditor;
			if (!editor) {
				return; // No open text editor
		}
		var selection = editor.selection;
		var lines = null;
		
		if(selection.isEmpty){
			lines = editor.document.lineAt(editor.selection.active.line).text.trim() + "\n";
		}else{
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
			// vscode.window.showInformationMessage('Executing: `'+ lines +'`');
			vscode.window.activeTerminal.sendText(lines)
		}else{
			vscode.window.showInformationMessage('Nothing to execute');

		}
	});

	context.subscriptions.push(disposable);
}
function deactivate() {}
module.exports = {
	activate,
	deactivate
}
