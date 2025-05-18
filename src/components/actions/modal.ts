import type { Editor } from "grapesjs";
import { COMPONENTS } from "../../constants";
import { modal } from "../../daisyUI";
import type { TailwindDaisyUIPluginOptions } from "../../index";
import { componentFactory } from "../../utils";

export default (
  editor: Editor,
  options: Required<TailwindDaisyUIPluginOptions>,
) => {
  componentFactory(editor, COMPONENTS.MODAL.id, modal.html);
};
