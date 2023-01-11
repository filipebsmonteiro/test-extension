<script setup>
import { faker } from '@faker-js/faker/locale/pt_BR';
import { onMounted, ref } from 'vue'
import PageService from '@/services/PageService'
import { cpf, cnpj } from '@/popup/generators'

let fields = ref([]);

const loadFields = () => {
    PageService.getElementsByTagName(`input`)
      .then(({ data }) => {
        fields.value = data.filter(f => f.type !== `checkbox`);
      })
      .catch(error => {
        PageService.sendRequest({ action: `console`, fun: `error`, params: error.message });
      });
}

onMounted(() => loadFields())

const fillFields = async () => {
  try {
    fields.value.map(field => {
      // PageService.sendRequest({ action: `console`, fun: `log`, params: field });
      if (!field.id || !field.name) return;
      field = { ...field, name: field.name.toLowerCase() };
      const events = [`change`, `input`];

      if (field.type === `email` || [`email`, `e-mail`].includes(field.name))
        PageService.sendRequest({ action: `input`, params: {
          id: field.id,
          prop: `value`,
          value: faker.internet.email(undefined, undefined, `avenuecode.com`),
          events,
        } });
  
      if ([`nome`, `nome completo`].includes(field.name))
        PageService.sendRequest({ action: `input`, params: {
          id: field.id,
          prop: `value`,
          value: faker.name.fullName(),
          events,
        } });
  
      if ([`telefone`, `celular`, `phone`].includes(field.name))
        PageService.sendRequest({ action: `input`, params: {
          id: field.id,
          prop: `value`,
          value: faker.phone.number(),
          events,
        } });
  
      if ([`cpf`, `cpf/cnpj`].includes(field.name))
        PageService.sendRequest({ action: `input`, params: {
          id: field.id,
          prop: `value`,
          value: cpf(),
          events,
        } });
  
      if (`cnpj` === field.name)
        PageService.sendRequest({ action: `input`, params: {
          id: field.id,
          prop: `value`,
          value: cnpj(),
          events,
        } });
    })
  } catch (error) {
    PageService.sendRequest({ action: `console`, fun: `error`, params: error.message });
  }

  loadFields();
}
</script>

<template>
    <div class="btn-group">
      <button @click="loadFields">Recarregar Campos</button>
      <button @click="fillFields">Preencher Campos</button>
    </div>

    <p
      v-if="fields.length === 0"
      class="flex justify-center m-4">
      Nenhum input Detectado na página
    </p>
    <div v-else>
      <!-- <p>Lista de Campos</p> -->
      <table class="mt-2">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Nome</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="field in fields">
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
