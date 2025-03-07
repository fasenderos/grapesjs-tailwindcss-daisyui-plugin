import type { Editor } from "grapesjs";
import type { TailwindDaisyUIPluginOptions } from "../../index";
import { COMPONENTS } from "../../constants";
import { button } from "../../daisyUI";
import { componentFactory } from "../../utils";

export default (
  editor: Editor,
  options: Required<TailwindDaisyUIPluginOptions>
) => {
  componentFactory(editor, COMPONENTS.BUTTON.id, button.html);
};
