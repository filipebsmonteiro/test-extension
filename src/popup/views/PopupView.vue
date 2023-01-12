<script setup>
import { faker } from "@faker-js/faker/locale/pt_BR";
import { onMounted, ref } from "vue";
import PopupService from "@/services/popup/PopupService";
import { cpf, cnpj } from "@/faker/generators";

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
  fields.value.map((field) => {
    field = { ...field, name: field.name.toLowerCase() };
    let payload = {
      action: `setProp`,
      params: {
        id: field.id,
        prop: `value`,
        value: null,
        events: [`change`, `input`],
      },
    };

    if (field.type === `email` || [`email`, `e-mail`].includes(field.name))
      payload.params.value = faker.internet.email(
        undefined,
        undefined,
        `avenuecode.com`
      );

    if ([`nome`, `nome completo`].includes(field.name))
      payload.params.value = faker.name.fullName();

    if ([`telefone`, `celular`, `phone`].includes(field.name))
      payload.params.value = faker.phone.number();

    if ([`cpf`, `cpf/cnpj`].includes(field.name)) payload.params.value = cpf();

    if (`cnpj` === field.name) payload.params.value = cnpj();

    PopupService.sendRequestToTab(payload);
  });

  loadFields();
};
</script>

<template>
  <div class="btn-group">
    <button class="btn-xs" @click="loadFields">Recarregar Campos</button>
    <button class="btn-xs" @click="fillFields">Preencher Campos</button>
  </div>

  <p v-if="fields.length === 0" class="flex justify-center m-4">
    Nenhum input Detectado na página
  </p>
  <div v-else>
    <table class="table w-full mt-2">
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

<style lang="scss">
.btn-group {
  @apply flex justify-between;
}
</style>
