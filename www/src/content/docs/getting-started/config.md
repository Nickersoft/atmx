---
title: Configuration
description: Simple config options to manage atmx
sidebar:
  order: 3
---

atmx uses a simple JSON configuration file called `utils.json` to manage its files. This file is generated during `atmx init` and shouldn't be removed, otherwise atmx may not work properly.

## `ts`

Denotes whether the project should use [TypeScript](https://typescript.org). This value is set automatically if atmx detects a `tsconfig.json` file in your repository. 

## `aliases`

Maps aliases for all installed code. A key is required for each atmx code type (hooks, helpers, etc.). These aliases will be used in all code atmx generates. In TypeScript aliases are typically defined using the [`paths` option](https://www.typescriptlang.org/tsconfig/#paths) in `tsconfig.json`. 

If you aren't using TypeScript, you'll need to configure aliases specific to your bundler. For example, Vite features a [resolve.alias](https://vitejs.dev/config/shared-options.html#resolve-alias) configuration option. 

## `index` (experimental)

Controls whether to generate an `index.(ts|js)` file in the root each directory. For example, instead of importing a method via:

```ts
import { group } from '@/helpers/group';
```

You could import via

```ts
import * as _ from '@/helpers';

// Later...

_.group(/* ... */)
```

Defaults to `false`.