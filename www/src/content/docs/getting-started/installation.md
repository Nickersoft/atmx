---
title: Installation
description: Setup your project in one command
sidebar:
  order: 1
---

Similar to how shadcn generates a `components.json` file, atmx relies on a `utils.json` file to manage its code snippets and requires this file to run.

To start, run the following from the root of your repo:

```bash
npx atmx init
```

*For alternatives to using npx, see the [CLI docs](/cli).*

During initialization, you'll be asked a series of questions regarding where you wish to store different categories of code (helpers, hooks, etc.). For now, all of these fields are required, even if you aren't using React or Svelte.

If your project is using TypeScript and contains a `tsconfig.json`, atmx's `ts` setting will automatically be set to `true`. Otherwise, you'll be asked if you wish to use TypeScript. **Note that selecting yes will _not_ set up TypeScript for you in your repo if it is not already.**

## Configuring aliases

Once you have set aliases in your `utils.json`, you'll need to update your project aliases to point to the correct paths. If you are using [NextJS](https://nextjs.org), aliases should work out-of-the-box, as Next automatically aliases `@/` to `src/*`. 

If not, be sure to add the following to your `tsconfig.json` (if using TypeScript):

```json {4-9}
{
  "compilerOptions": {
    // ...
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
    // ...
  }
}
```

Otherwise, add a similar alias to your bundler. For example, [here](https://vitejs.dev/config/shared-options.html#resolve-alias) is how you would configure aliases in Vite.