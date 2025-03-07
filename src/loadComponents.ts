import type { Editor } from "grapesjs";
import type { TailwindDaisyUIPluginOptions } from "./index";
import components from "./components";

export default (
  editor: Editor,
  options: Required<TailwindDaisyUIPluginOptions>
) => {
  for (const key in components) {
    if (Object.prototype.hasOwnProperty.call(components, key)) {
      // @ts-ignore
      const component = components[key];
      component(editor, options);
    }
  }
};
