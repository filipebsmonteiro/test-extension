import { ref } from "vue";
import { defineStore } from "pinia";

export const useFieldsStore = defineStore(`fields`, () => {
  let fields = ref([]);

  function addField(field) {
    if (fields.value.every((f) => field.element !== f.element)) {
      fields.value.push(field);
      return;
    }

    updateField(field.id, field);
  }

  function cleanStorage() {
    fields.value = ref([]);
  }

  function getField(id) {
    return fields.value.find((field) => field.id === id);
  }

  function updateField(id, args) {
    fields.value = fields.value.map((field) =>
      field.id !== id ? field : { ...field, ...args }
    );
  }

  return { fields, addField, cleanStorage, getField, updateField };
});
