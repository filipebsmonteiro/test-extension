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
}
</script>

<template>
  <div style="overflow: scroll;">
    <!-- <img src="../../public/icon-with-shadow.svg" /> --->
    <button class="flex" @click="loadFields">Recarregar Campos</button>
    <button class="flex" @click="fillFields">Preencher Campos</button>

    <p>Lista de Campos</p>
    <p v-if="fields.length === 0">Nenhum input Detectado na página</p>
    <table v-else>
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

<style>
.flex {
  padding: 1rem;
}

html,
body {
  width: 300px;
  height: 400px;
  padding: 0;
  margin: 0;
}

body {
  background-color: rgb(36, 36, 36);
}

body > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

img {
  width: 200px;
  height: 200px;
}

h1, p, table {
  color: white;
  margin: 0;
}

h1 {
  font-size: 18px;
  font-weight: bold;
}

p {
  color: white;
  opacity: 0.7;
}

code {
  font-size: 12px;
  padding: 2px 4px;
  background-color: #ffffff24;
  border-radius: 2px;
}
</style>
