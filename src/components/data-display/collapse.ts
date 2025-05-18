import type { Editor, TraitOption, TraitProperties } from "grapesjs";
import { COMPONENTS, DAISYUI_PREFIX } from "../../constants";
import {
  getI18nName,
  getId,
  getTraitSelectOption,
  isComponent,
} from "../../utils";

export default (editor: Editor) => {
  const options = {
    icon: {
      type: "select",
      label: getI18nName(editor, "traits.icon"),
      prefix: "collapse",
      values: [
        { id: "", label: getI18nName(editor, "traits.default") },
        "arrow",
        "plus",
      ],
    },
    border: {
      type: "checkbox",
      label: getI18nName(editor, "traits.border"),
      valueTrue: "bg-base-100 border-base-300 border",
    },
  };

  const domc = editor.DomComponents;
  const id = getId(COMPONENTS.COLLAPSE.id);
  domc.addType(id, {
    isComponent: (el) => isComponent(el, id),
    model: {
      defaults: {
        tagName: "div",
        components: [
          { tagName: "input", attributes: { type: "checkbox" } },
          {
            tagName: "div",
            attributes: {
              class: "collapse-title font-semibold",
            },
            components: [
              { type: "text", content: "How do I create an account?" },
            ],
          },
          {
            tagName: "div",
            attributes: {
              class: "collapse-content text-sm",
            },
            components: [
              {
                type: "text",
                content:
                  'Click the "Sign Up" button in the top right corner and follow the registration process.',
              },
            ],
          },
        ],
        traits: [
          "id",
          ...Object.entries(options).map(([key, option]) => {
            let traitOption: TraitProperties = {
              type: option.type,
              name: key,
              label: option.label,
            };

            switch (option.type) {
              case "select":
                // @ts-ignore
                if (option.values) {
                  const options: TraitOption[] = [];
                  // @ts-ignore
                  for (const o of option.values) {
                    if (typeof o === "string") {
                      options.push(
                        getTraitSelectOption(
                          o,
                          getI18nName(editor, `traits.${o}`),
                        ),
                      );
                    } else options.push(o);
                  }
                  traitOption.options = options;
                } else traitOption = {};
                break;
              case "checkbox":
                // @ts-ignore
                if (option.valueTrue) {
                  // @ts-ignore
                  traitOption.valueTrue = option.valueTrue;
                }
                break;
              default:
                break;
            }

            return traitOption;
          }),
        ],
        attributes: {
          [DAISYUI_PREFIX]: id,
          class: "collapse",
        },
      },
      init() {
        for (const [key, option] of Object.entries(options)) {
          this.on(`change:attributes:${key}`, () =>
            this.handleAttributeChange(option, key),
          );
        }
      },
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      handleAttributeChange(option: any, attribute: string) {
        const value = this.getAttributes()[attribute];
        if (option.type === "select") {
          const prefix = `${option.prefix ? `${option.prefix}-` : ""}`;
          for (const v of option.values) this.removeClass(`${prefix}${v}`);
          if (value) this.addClass(`${prefix}${value}`);
        } else if (option.type === "checkbox") {
          this.handleAttributeChange(
            {
              type: "select",
              values: option.valueTrue.split(" "),
            },
            attribute,
          );
        }
      },
    },
  });
};
