<script setup>
import { onMounted, ref } from "vue";
import FormService from "@/services/popup/FormServices/FormService";

let fields = ref([]),
  rows = ref([]);
const loadFields = async () => {
  const Form = await FormService.build();
  fields.value = await Form.loadFields();
  rows.value = Object.keys(fields.value).reduce(
    (acc, key) => [...acc, ...fields.value[key]],
    []
  );
};
onMounted(() => loadFields());

const fillFields = async () => {
  const Form = await FormService.build();
  Form.fillFields(fields.value);
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
        <tr v-for="field in rows" :key="field.id">
          <td>
            {{ field.type }}
            
          </td>
          <td>{{ field.name }}</td>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
