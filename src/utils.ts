import type { Component, Editor } from "grapesjs";
import { DAISYUI_PREFIX, PLUGIN_NAME } from "./constants";

export const getI18nName = (editor: Editor, key: string): string => {
  return editor.I18n.t(`${PLUGIN_NAME}.${key}`);
};

export const isComponent = (el: HTMLElement, id: string): boolean => {
  return (
    ((el.attributes as unknown as Record<string, string>)?.daisyui ?? false) ===
    id
  );
};

export const getId = (id: string) => {
  return `${DAISYUI_PREFIX}-${id}`;
};

export const componentFactory = (
  editor: Editor,
  componentId: string,
  html: string
): Component => {
  const domc = editor.DomComponents;
  const id = getId(componentId);
  const result = domc.addType(id, {
    isComponent: (el) => isComponent(el, id),
    model: {
      defaults: {
        components: html,
      },
      attributes: {
        [DAISYUI_PREFIX]: id,
      },
    },
  });
  return result.getById(id);
};
