## LLMS Resources

This directory is a resource of directions to reference locally for your LLMS. Each file is devoted to a specific topic that can be combined with a prompt.

## Example Prompts

### Creating a new Preset Recipe

This prompt will bootstrap a new slot recipe API and set some initial styles and variants that will need to be replaced to match the Cerberus Figma design. **This is just a starting point. Do not ship this code as-is.**

- This prompt does _not_ setup the component API which relies on a recipe existing.
- This prompt might not expose the API. Depending on the LLM you are using, it may skip this step.

#### Running the prompt

> First, add the `.llms/create-preset-recipe.md` file to your conversation context.

```bash
Using the `create-preset-recipe` guide, create a new slot recipe named `<arkComponent>`
```

---

### Creating a new React component API

This prompt will bootstrap a new component API directory and setup most of your primitives and parts. **This is just a starting point. Do not ship this code as-is.**

- This prompt does _not_ setup the recipe and assumes you have already created and exposed it.
- This prompt does _not_ expose the API. You are expected to include that manually when it is ready.

#### Running the prompt

> First, add the `.llms/create-react-component.md` file to your conversation context.

```bash
Using the `create-react-component` guide, create a new component named `ark-ui-api-name`
```

---

### Creating a new component API doc page

This prompt will bootstrap a new component API docs page and setup the route meta. **This is just a starting point. Do not ship this code as-is.**

- This prompt does _not_ create examples or low-level API content.
- This assumes the API already exists.

#### Running the prompt

> First, add the `.llms/create-doc-component-page.md` file to your conversation context.

```bash
Using the `create-doc-component-page` guide, create a new component page named `component-name` to showcase our React ComponentName component
```
