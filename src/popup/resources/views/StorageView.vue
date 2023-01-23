<script setup>
import { onMounted, ref } from "vue";
import MessageBroker from "@app/mensageria/MessageBroker";

let fields = ref([]),
  isLoading = ref(false);

const loadFields = async () => {
  fields.value = await MessageBroker.sendRequestToActiveTab({
    controller: `BrowserController`,
    method: `getStorage`,
    args: { key: `*` },
  }).then(({ data }) => data);
};
onMounted(() => loadFields());

const removeField = async (key) => {
  isLoading.value = true;
  await MessageBroker.sendRequestToActiveTab({
    controller: `BrowserController`,
    method: `removeStorage`,
    args: { key },
  });
  loadFields();
  isLoading.value = false;
};
</script>

<template>
  <div class="flex justify-between">
    <button class="btn-xs rounded" @click="loadFields">
      Recarregar Storage
    </button>
    <button
      :class="{
        'btn-xs rounded': true,
        loading: isLoading,
      }"
      :disabled="isLoading"
      @click="removeField(`*`)"
    >
      Limpar todo Storage
    </button>
  </div>

  <p v-if="fields.length === 0" class="flex justify-center m-4">
    Nenhuma informação gravada para esse domínio
  </p>
  <div v-else class="overflow-x-auto mt-2">
    <table class="table w-full">
      <thead>
        <tr>
          <th></th>
          <th>Chave</th>
          <th>Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field in fields" :key="field.key">
          <td>
            <span
              :class="{
                'btn btn-xs btn-outline btn-error rounded-pill': true,
                loading: isLoading,
              }"
              @click="removeField(field.key)"
            >
              <font-awesome-icon :icon="['fas', 'trash']" />
            </span>
          </td>
          <td>{{ field.key }}</td>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="sass">
.badge
    padding-left: 0rem
</style>
