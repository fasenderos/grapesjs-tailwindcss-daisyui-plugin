import type { Editor } from "grapesjs";
import grapesjsTailwindcss from "grapesjs-tailwindcss-plugin";
import loadBlocks from "./loadBlocks";
import loadComponents from "./loadComponents";
import en from "./locale/en";

export type TailwindDaisyUIPluginOptions = {
  /**
   * I18n object containing languages, [more info](https://grapesjs.com/docs/modules/I18n.html#configuration).
   * @default {}
   */
  i18n?: Record<string, unknown>;
  /**
   * URL for fetching daisyUI
   * @see https://daisyui.com/docs/cdn/
   * @default https://cdn.jsdelivr.net/npm/daisyui@5
   */
  daisyUICssCdn?: string;
  /**
   * URL for fetching daisyUI Themes
   * @see https://daisyui.com/docs/cdn/
   * @default empty-string
   */
  daisyUIThemeCssCdn?: string;
};

export default (editor: Editor, opts: TailwindDaisyUIPluginOptions = {}) => {
  // @ts-ignore this is a custom flag
  if (!editor.__grapesjsTailwindcssPluginLoaded) {
    grapesjsTailwindcss(editor);
    // @ts-ignore this is a custom flag
    editor.__grapesjsTailwindcssPluginLoaded = true; // flag to avoid multiple plugin load
  }

  const options: Required<TailwindDaisyUIPluginOptions> = {
    ...{
      i18n: {},
      // default options
      daisyUICssCdn: "https://cdn.jsdelivr.net/npm/daisyui@5",
      daisyUIThemeCssCdn: "",
    },
    ...opts,
  };
  // Load i18n files
  editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  // Add DaisyUI Components
  loadComponents(editor, options);

  // Add blocks
  loadBlocks(editor, options);

  const addLinkElement = (link: string, iframe: HTMLIFrameElement) => {
    if (link.length) {
      const linkEl = document.createElement("link");
      linkEl.rel = "stylesheet";
      linkEl.type = "text/css";
      linkEl.href = link;
      iframe.contentDocument?.head.appendChild(linkEl);
    }
  };

  editor.on("canvas:frame:load:body", ({ el }: { el: HTMLIFrameElement }) => {
    const { daisyUICssCdn, daisyUIThemeCssCdn } = options;
    addLinkElement(daisyUICssCdn, el);
    addLinkElement(daisyUIThemeCssCdn, el);
  });
};
