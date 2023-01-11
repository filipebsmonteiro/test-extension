<script setup>
import { onMounted, ref } from 'vue'
import PageService from '@/services/PageService'
import { cpf, cnpj } from '@/popup/generators'

let fields = ref([]);

onMounted(async () => {
  await PageService.getElementsByTagName(`input`)
    .then(({ data }) => {
      fields.value = data;
    });
})

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
          value: `teste@avenuecode.com`,
          events,
        } });
  
      if ([`nome`, `nome completo`].includes(field.name))
        PageService.sendRequest({ action: `input`, params: {
          id: field.id,
          prop: `value`,
          value: `Nome Teste AvenueCode`,
          events,
        } });
  
      if ([`telefone`, `celular`, `phone`].includes(field.name))
        PageService.sendRequest({ action: `input`, params: {
          id: field.id,
          prop: `value`,
          value: `11909090909`,
          events,
        } });
  
      if (`cpf` === field.name)
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
  <div>
    <!-- <img src="../../public/icon-with-shadow.svg" /> --->
    <h1>Preencher Campos</h1>

    <button class="flex" @click="fillFields">Preencher</button>

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
