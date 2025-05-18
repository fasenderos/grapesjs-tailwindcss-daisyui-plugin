export const CATEGORIES = {
  ACTIONS: "actions",
  DATA_DISPLAY: "data_display",
  NAVIGATION: "navigation",
};

export const COMPONENTS = {
  /** Actions */
  BUTTON: { id: "button", category: CATEGORIES.ACTIONS },
  DROPDOWN: { id: "dropdown", category: CATEGORIES.ACTIONS },
  MODAL: { id: "modal", category: CATEGORIES.ACTIONS },
  /** Data Display */
  COLLAPSE: { id: "collapse", category: CATEGORIES.DATA_DISPLAY },
  /** Navigation */
  TAB: { id: "tab", category: CATEGORIES.NAVIGATION },
};

export const DAISYUI_PREFIX = "daisyui";

export const PLUGIN_NAME = "grapesjs-tailwindcss-daisyui-plugin";
