import type { Editor } from "grapesjs";
import type { TailwindDaisyUIPluginOptions } from "./index";

import { COMPONENTS } from "./constants";
import icons from "./icons";
import { getI18nName, getId } from "./utils";

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
  content: { type: string };
  category: { id: string; label: string };
  icon?: string;
};

const getDaisyUIBlock = (
  editor: Editor,
  component: {
    [P in keyof typeof COMPONENTS]: (typeof COMPONENTS)[P];
  }[keyof typeof COMPONENTS],
): BlockOption => {
  const id = getId(component.id);
  const icon = icons[component.id as keyof typeof icons];
  return {
    id,
    label: getI18nName(editor, `components.${component.id}`) ?? "",
    content: { type: id },
    category: {
      id: getId(component.category),
      label: getI18nName(editor, `categories.${component.category}`) ?? "",
    },
    icon,
  };
};

const getDaisyUIBlocks = (editor: Editor) => {
  const blocks: BlockOption[] = [];
  for (const key in COMPONENTS) {
    if (Object.prototype.hasOwnProperty.call(COMPONENTS, key)) {
      // @ts-ignore
      const component = COMPONENTS[key];
      const block = getDaisyUIBlock(editor, component);
      blocks.push(block);
    }
  }
  return blocks;
};

export default (
  editor: Editor,
  options: Required<TailwindDaisyUIPluginOptions>,
) => {
  const bm = editor.Blocks;
  const blocks = getDaisyUIBlocks(editor);
  for (const block of blocks) {
    bm.add(block.id, {
      label: block.label, // getSvgHtml(editor.$(block.label).get(0)),
      content: block.content,
      category: {
        id: block.category.id,
        label: block.category.label,
        open: false,
      },
      media: block.icon,
    });
  }
};
