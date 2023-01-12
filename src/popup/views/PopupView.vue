<script setup>
import { faker } from "@faker-js/faker";
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

onMounted(() => {
  loadFields();
  PopupService.sendRequestToTab({
    action: `getStorage`,
    params: { storage: `local`, prop: `language` },
  }).then(({ data }) => {
    faker.locale = data || `pt_BR`;
  });

});

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
  <div class="flex justify-between">
    <button class="btn-xs rounded" @click="loadFields">Recarregar Campos</button>
    <button class="btn-xs rounded" @click="fillFields">Preencher Campos</button>
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
