import type { Editor } from "grapesjs";
import components from "./components";
import type { TailwindDaisyUIPluginOptions } from "./index";

export default (
  editor: Editor,
  options: Required<TailwindDaisyUIPluginOptions>,
) => {
  for (const key in components) {
    if (Object.prototype.hasOwnProperty.call(components, key)) {
      // @ts-ignore
      const component = components[key];
      component(editor, options);
    }
  }
};
