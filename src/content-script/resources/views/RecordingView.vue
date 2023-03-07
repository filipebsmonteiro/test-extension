<script setup>
import { onMounted, onBeforeUnmount, toRaw } from "vue";
import {
  mapClasses,
  mapStyles,
  parseElement,
  useElementsStore,
} from "@content/resources/stores/elements";

// const { elements, loadElements } = useElementsStore();
const elementsStore = useElementsStore();

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
// const callback = (mutationList, observer) => {
const observerCallback = (mutationList) => {
  if (mutationList.some((m) => m.type === `childList`))
    elementsStore.loadElements();

  mutationList = mutationList.filter((m) => m.type === `attributes`);

  for (const mutation of mutationList) {
    const target = elementsStore.elements.find(
      (e) => e.htmlElement === mutation.target
    );
    if (target) {
      console.log(`Element has been modified :>> `, target);
    }
  }
};
const observer = new MutationObserver(observerCallback);

const addListeners = (element) => {
  switch (element.tag) {
    case `a`:
    case `button`:
      element.htmlElement.addEventListener(`click`, (evt) =>
        record(element, evt)
      );
      break;
    case `input`:
    case `select`:
      element.htmlElement.addEventListener(`change`, (evt) =>
        record(element, evt)
      );
      element.htmlElement.addEventListener(`input`, (evt) =>
        record(element, evt)
      );
      // switch (type) {
      //   case `select`:
      //     element.htmlElement.addEventListener(`click`, record);
      //     break;
      // }
      break;
  }

  if (element.children.length > 0)
    element.children.map((child) => addListeners(child));
};

const record = (element, evt) => {
  console.log(`element :>> `, element);
  console.log(`evt :>> `, evt);
};

onMounted(async () => {
  await elementsStore.loadElements();

  toRaw(elementsStore.elements).map((element) => addListeners(element));

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
});
</script>

<template>
  <RouterLink :to="`/home`" class="btn btn-error text-white absolute bottom-0">
    Stop Record
  </RouterLink>
</template>
