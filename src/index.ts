import en from "./locale/en";
import type { Editor, Frame, Frames } from "grapesjs";
import loadBlocks from './blocks';

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
  /**
   * URL for fetching Tailwind
   * @see https://tailwindcss.com/docs/installation/play-cdn
   * @default https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4
   */
  tailwindCdn?: string;
};

export default (editor: Editor, opts: TailwindDaisyUIPluginOptions = {}) => {
  const options: Required<TailwindDaisyUIPluginOptions> = {
    ...{
      i18n: {},
      // default options
      daisyUICssCdn: "https://cdn.jsdelivr.net/npm/daisyui@5",
      daisyUIThemeCssCdn: "",
      tailwindCdn: "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4",
      // tailwindConfig: {},
    },
    ...opts,
  };

  // Add blocks
  loadBlocks(editor, options);

  // Load i18n files
  editor.I18n.addMessages({
    en,
    ...options.i18n,
  });

  const loadTailwindDaisyUI = async (frame: Frame) => {
    const iframe = frame.view?.getEl();

    if (!iframe) return;

    const {
      daisyUICssCdn,
      daisyUIThemeCssCdn,
      tailwindCdn,
    } = options;

    const script = document.createElement("script");
    script.src = tailwindCdn;

    const linkCss = [daisyUICssCdn, daisyUIThemeCssCdn];
    const linkEls: HTMLLinkElement[] = [];

    for (const link of linkCss) {
      if (link.length) {
        const linkEl = document.createElement("link");
        linkEl.rel = "stylesheet";
        linkEl.type = "text/css";
        linkEl.href = link;
        linkEls.push(linkEl);
      }
    }

    // checks iframe is ready before loading Tailwind CSS - issue with firefox
    const f = setInterval(() => {
      const doc = iframe.contentDocument;
      if (doc?.readyState && doc.readyState === "complete") {
        doc.head.appendChild(script);
        for (const linkEl of linkEls) {
          doc.head.appendChild(linkEl);
        }
        clearInterval(f);
      }
    }, 100);
  };

  editor.Canvas.getModel().on("change:frames", (m, frames: Frames) => {
    // biome-ignore lint/complexity/noForEach: forEach function overrided by Grapesjs
    frames.forEach((frame) =>
      frame.once("loaded", () => loadTailwindDaisyUI(frame))
    );
  });
};
