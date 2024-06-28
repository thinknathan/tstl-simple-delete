# tstl-simple-delete

[![CI](https://github.com/thinknathan/tstl-simple-delete/actions/workflows/ci.yml/badge.svg)](https://github.com/thinknathan/tstl-simple-delete/actions/workflows/ci.yml) ![GitHub License](https://img.shields.io/github/license/thinknathan/tstl-simple-delete)

TypeScriptToLua plugin that replaces calls to the TSTL `delete` function with a statement setting a value to `nil`.

This repo offers an alternate implementation to the `simplifyDelete` option in [gb-tstl-utils](https://www.npmjs.com/package/gb-tstl-utils).

:exclamation: Use this and any code transformation plugin with caution. Mistakes are possible.

## Example

`__TS__Delete(x, y)` becomes `x[y] = nil`

## Installation

Requires TSTL >= 1.22.0.

1. Install this plugin

```bash
yarn add tstl-simple-delete -D
# or
npm install tstl-simple-delete --save-dev
```

2. Add `tstl-simple-delete` to `tstl.luaPlugins` in `tsconfig.json`

```diff
{
	"tstl": {
		"luaPlugins": [
+			{
+				"name": "tstl-simple-delete"
+			}
		],
	}
}
```

## License

CC0
