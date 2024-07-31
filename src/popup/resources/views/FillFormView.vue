<script setup>
import { onMounted, ref } from "vue";
import MessageBroker from "@app/mensageria/MessageBroker";

let fields = ref([]),
  isFilling = ref(false);

const loadFields = async () => {
  fields.value = await MessageBroker.sendRequestToActiveTab({
    controller: `FormController`,
    method: `loadFields`,
  }).then(({ data }) => data)
  .catch(() => []);
};
onMounted(() => loadFields());

const fillFields = async () => {
  isFilling.value = true;
  await MessageBroker.sendRequestToActiveTab({
    controller: `FormController`,
    method: `fillFields`,
  })
  .catch(() => {});
  loadFields();
  isFilling.value = false;
};

const scrollTo = (elementId) => {
  MessageBroker.sendRequestToActiveTab({
    controller: `PageController`,
    method: `scrollToElement`,
    args: {
      id: elementId,
      behavior: `smooth`,
      block: `center`,
    },
  })
  .catch(() => {});
};
</script>

<template>
  <div class="flex justify-between">
    <button class="btn-xs rounded" @click="loadFields">
      Recarregar Campos
    </button>
    <button
      :class="{
        'btn-xs rounded': true,
        loading: isFilling,
      }"
      :disabled="isFilling"
      @click="fillFields"
    >
      Preencher Campos
    </button>
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
        <tr v-for="field in fields" :key="field.id">
          <td>
            <span class="badge badge-sm badge-outline">
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
