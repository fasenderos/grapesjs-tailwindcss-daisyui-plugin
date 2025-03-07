import loadDaisyUIBlocks from "./daisyUILoader";

import type { Editor } from "grapesjs";
import type { TailwindDaisyUIPluginOptions } from "../index";

export default (
  editor: Editor,
  opts: Required<TailwindDaisyUIPluginOptions>
) => {
  loadDaisyUIBlocks(editor, opts);
};
