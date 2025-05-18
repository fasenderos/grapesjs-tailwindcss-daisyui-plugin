import type { Editor, TraitOption } from "grapesjs";
import { COMPONENTS, DAISYUI_PREFIX } from "../../constants";
import {
  getI18nName,
  getId,
  getTraitSelectOption,
  isComponent,
} from "../../utils";

export default (editor: Editor) => {
  const options = {
    buttonSize: {
      type: "select",
      label: getI18nName(editor, "traits.size"),
      prefix: "btn",
      values: [
        { id: "", label: getI18nName(editor, "traits.medium") },
        "xs",
        "sm",
        "lg",
        "xl",
      ],
    },
    buttonColor: {
      type: "select",
      label: getI18nName(editor, "traits.color"),
      prefix: "btn",
      values: [
        { id: "", label: getI18nName(editor, "traits.default") },
        "primary",
        "secondary",
        "accent",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
    buttonStyle: {
      type: "select",
      label: getI18nName(editor, "traits.style"),
      prefix: "btn",
      values: [
        { id: "", label: getI18nName(editor, "traits.normal") },
        "soft",
        "outline",
        "dash",
      ],
    },
  };

  const domc = editor.DomComponents;
  const id = getId(COMPONENTS.BUTTON.id);
  domc.addType(id, {
    isComponent: (el) => isComponent(el, id),
    model: {
      defaults: {
        tagName: "button",
        components: [{ type: "text", content: "Button" }],
        traits: [
          "id",
          ...Object.entries(options).map(([key, option]) => {
            const options: TraitOption[] = [];
            if (option.values) {
              for (const o of option.values) {
                if (typeof o === "string") {
                  options.push(
                    getTraitSelectOption(o, getI18nName(editor, `traits.${o}`)),
                  );
                } else options.push(o);
              }
            }
            return {
              type: option.type,
              name: key,
              label: option.label,
              options,
            };
          }),
        ],
        attributes: {
          [DAISYUI_PREFIX]: id,
          class: "btn",
        },
      },
      init() {
        for (const [key, option] of Object.entries(options)) {
          this.on(`change:attributes:${key}`, () =>
            this.handleAttributeChange(option.values, key, option.prefix),
          );
        }
      },
      handleAttributeChange(
        options: string[],
        attribute: string,
        prefix: string,
      ) {
        for (const option of options) this.removeClass(`${prefix}-${option}`);
        const value = this.getAttributes()[attribute];
        if (value?.length) this.addClass(`${prefix}-${value}`);
      },
    },
  });
};
