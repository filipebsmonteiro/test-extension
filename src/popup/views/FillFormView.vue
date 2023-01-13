<script setup>
import { onMounted, ref } from "vue";
import PopupService from "@/services/popup/PopupService";
// import { cpf, cnpj } from "@/faker/generators";
import FillFormService from "@/services/popup/FillFormService";

let fields = ref([]);

const loadFields = () => {
  PopupService.getElementsByTagName(`input`).then(({ data }) => {
    fields.value = data.filter(
      (f) => f.type !== `checkbox` && f.isVisible && f.id && f.name
    );
  });
};
onMounted(() => loadFields());

const fillFields = async () => {
  const FillForm = await FillFormService.build();
  fields.value.map((field) => {
    field = { ...field, name: field.name.toLowerCase() };

    FillForm.fillField(field);
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

  <p v-if="fields.length === 0" class="flex justify-center m-4">
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
        <tr v-for="field in fields" :key="field.id">
          <td>{{ field.type }}</td>
          <td>{{ field.name }}</td>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
