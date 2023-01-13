<script setup>
import { onMounted, ref } from "vue";
import PopupService from "@/services/popup/PopupService";
// import { cpf, cnpj } from "@/faker/generators";
import FillFormService from "@/services/popup/FillFormService";

let fields = ref({ input: [], select: [] });
const loadFields = async () => {
  fields.value.input = await PopupService.getElementsByTagName(`input`).then(
    ({ data }) =>
      data.filter((f) => f.type !== `checkbox` && f.isVisible && f.id && f.name)
  );

  fields.value.select = await PopupService.getElementsByTagName(`select`).then(
    ({ data }) => data.filter((f) => f.isVisible && f.id)
  );
};
onMounted(() => loadFields());

const fillFields = async () => {
  const FillForm = await FillFormService.build();
  fields.value.input.map((field) => {
    field = { ...field, name: field.name.toLowerCase() };
    FillForm.fillField(field);
  });

  fields.value.select.map((select) => {
    FillForm.fillSelect(select);
  });

  loadFields();
};
</script>

<template>
  <div class="flex justify-between">
    <button class="btn-xs rounded" @click="loadFields">
      Recarregar Campos
    </button>
    <button class="btn-xs rounded" @click="fillFields">Preencher Campos</button>
  </div>

  <p
    v-if="[...fields.input, ...fields.select].length === 0"
    class="flex justify-center m-4"
  >
    Nenhum input Detectado na página
  </p>
  <div v-else class="overflow-x-auto mt-2">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Nome</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="field in [...fields.input, ...fields.select]"
          :key="field.id"
        >
          <td>{{ field.type }}</td>
          <td>{{ field.name }}</td>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
