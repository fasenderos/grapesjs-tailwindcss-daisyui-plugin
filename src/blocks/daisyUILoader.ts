import type { Editor } from "grapesjs";
import type { TailwindDaisyUIPluginOptions } from "../index";

import { button, tab } from "./daisyUI";

const getSvgHtml = (svg: HTMLElement) => {
  if (typeof window === "undefined") return "";
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  return svg.outerHTML;
};

type BlockOption = {
  id: string;
  class?: string;
  label: string;
  content: string;
  category: string;
};

const blocks: BlockOption[] = [
  /** Actions */
  {
    id: "button",
    label: "Button",
    content: button.html,
    category: "Actions",
  },

  /** Navigation */
  {
    id: "tab",
    label: "Tab",
    content: tab.html,
    category: "Navigation",
  },
];

export default (
  editor: Editor,
  options: Required<TailwindDaisyUIPluginOptions>
) => {
  const bm = editor.Blocks;

  for (const block of blocks) {
    bm.add(block.id, {
      label: block.label, // getSvgHtml(editor.$(block.label).get(0)),
      attributes: { class: `${block.class} block-full-width` },
      content: block.content,
      category: {
        id: block.category,
        label: block.category,
        open: false,
      },
    });
  }
};
