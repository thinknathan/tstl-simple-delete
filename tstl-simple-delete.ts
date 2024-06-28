import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

/**
 * Looks for `__TS__Delete(x, y)` statements and replaces them with `x[y] = nil`
 * Additionally, removes `local __TS__Delete = ____lualib.__TS__Delete`
 */
function simpleDelete(file: tstl.EmitFile) {
	const fileCode = file.code;
	const modifiedCode = fileCode
		.replace(
			/(?<!function )__TS__Delete\((.*?),\s*([^\s,]+)\s*\)/g,
			(_, varName, propName) => `${varName}[${propName}] = nil`,
		)
		.replace(/local __TS__Delete = ____lualib.__TS__Delete[\s\S]*?/g, '');
	file.code = modifiedCode;
}

/**
 * Plugin definition for TypeScript-to-Lua
 */
const plugin: tstl.Plugin = {
	afterEmit: (
		_program: ts.Program,
		_options: tstl.CompilerOptions,
		emitHost: tstl.EmitHost,
		result: tstl.EmitFile[],
	) => {
		for (const file of result) {
			// Apply changes
			simpleDelete(file);
			// Write the changed code
			emitHost.writeFile(file.outputPath, file.code, false);
		}
	},
};

// Export the plugin for use in TypeScript-to-Lua
export default plugin;
