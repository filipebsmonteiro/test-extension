<script setup>
import { onMounted, ref } from "vue";
import FormService from "@/services/popup/FormServices/FormService";
import PopupService from "@/services/popup/PopupService";
import CommunicationService from "@/services/communication/CommunicationService";

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
onMounted(() => {
  loadFields();
  const communication = new CommunicationService({});
  communication.sendRunTimeRequest(`Message From Popup`);
});

const fillFields = async () => {
  const Form = await FormService.build();
  await Form.fillFields(fields.value);
  loadFields();
};

const scrollTo = (elementId) => {
  PopupService.sendRequestToTab({
    action: `scrollToElement`,
    params: {
      id: elementId,
      behavior: `smooth`,
      block: `center`,
    },
  });
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
          <th>Campo</th>
          <th>Nome</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field in rows" :key="field.id">
          <td>
            <span
              class="badge badge-sm badge-outline"
              @click="scrollTo(field.id)"
            >
              <span
                class="badge cursor-pointer badge-sm"
                @click="scrollTo(field.id)"
              >
                <font-awesome-icon :icon="['fas', 'location-dot']" />
              </span>
              {{ field.type }}
            </span>
          </td>
          <td>{{ field.name }}</td>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="sass">
.badge
    padding-left: 0rem
    .badge
      padding: .2rem
      margin-right: .5rem
</style>
