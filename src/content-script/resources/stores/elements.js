import { ref } from "vue";
import { defineStore } from "pinia";

export const mapAttributes = (element) => {
  let attributes = [];
  for (const attribute of element.attributes) {
    if (attribute.name !== `class`)
      attributes.push({ key: attribute.name, value: attribute.value });
  }
  return attributes;
};

export const mapClasses = (element) => {
  let classes = [];
  for (const clas of element.classList) {
    classes.push(clas);
  }
  return classes;
};

export const mapStyles = (element) => {
  if (element.hasAttribute(`style`))
    return element.getAttribute(`style`).split(`;`);
  return [];
};

export const isVisible = (element) => {
  const style = window.getComputedStyle(element);
  return (
    element.type !== `hidden` &&
    style.getPropertyValue(`display`) !== `none` &&
    style.getPropertyValue(`visibility`) !== `hidden` //&&
    // element.clientHeight > 0 &&
    // element.clientWidth > 0
  );
};

export const parseElement = (element) => ({
  attributes: mapAttributes(element),
  classes: mapClasses(element),
  children: [],
  htmlElement: element,
  innerHtml: element.children.length > 0 ? null : element.innerHtml,
  styles: mapStyles(element),
  tag: element.tagName.toLowerCase(),
  type: element.type,
});

const untrackableTags = [`style`, `script`, `meta`, `noscript`, `link`];
const mountChildrenNodes = (element) => {
  let generated = parseElement(element);

  for (const child of element.children) {
    if (untrackableTags.includes(child.tagName) || !isVisible(child)) continue;

    generated.children.push(mountChildrenNodes(child));
  }

  return generated;
};

export const useElementsStore = defineStore(`elements`, () => {
  let elements = ref([]);

  function addElement(element) {
    elements.value.push(element);
  }

  function cleanStorage() {
    elements.value = [];
  }

  async function loadElements() {
    this.cleanStorage();
    const body = mountChildrenNodes(document.body);
    body.children.map((element) => this.addElement(element));
  }

  return { elements, addElement, cleanStorage, loadElements };
});
