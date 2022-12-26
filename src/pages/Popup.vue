<script setup>
import { onMounted } from 'vue'
import { cpf } from '../generate'

function getLabel(htmlElement) {
  let name = null;
  if (htmlElement.name) return htmlElement.name;
  
  let element = htmlElement;
  for (let i = 0; i < 10; i++) {
    element = element.previousSibling
    if (element.tagName === `LABEL`) return element.innerHTML;
  }
  
  return name
}

let fields = [];
onMounted(() => {
  console.log('document :>> ', document);
  const elements = document.getElementsByTagName(`input`);
  console.log('elements :>> ', elements);
  [...elements].map(elmnt => fields.push({
    html: elmnt,
    type: elmnt.type,
    name: getLabel(elmnt),
    value: elmnt.value
  }))
})

const fillFields = () => {
  alert(`WHAT`)
  console.log('fields :>> ', fields);
  fields.map(field => {
    if (
      field.type === `email` ||
      [`email`, `e-mail`].includes(field.name.toLowerCase())
    ) field.html.value = `teste@avenucode.com`;

    if ([`nome`, `nome completo`].includes(field.name.toLowerCase())) {
      field.html.value = `Nome Teste AvenuCode`
    };

    if (`cpf` === field.name.toLowerCase()) {
      field.html.value = cpf();
    };

    if (`cnpj` === field.name.toLowerCase()) {
      field.html.value = cnpj();
    };
  })
}
</script>

<template>
  <div>
    <!-- <img src="../../public/icon-with-shadow.svg" /> --->
    <h1>Preencher Campos</h1>

    <button class="flex" @click="fillFields">Preencher</button>

    <p>Lista de Campos</p>
    <p v-if="!fields.length">Nenhum input Detectado na página</p>
    <table v-else>
      <thead>
        <tr v-for="field in fields">
          <td>Tipo</td>
          <td>Nome</td>
          <td>Label</td>
          <td>Valor</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field in fields">
          <td>{{ field.type }}</td>
          <td>{{ field.name }}</td>
          <td>{{ field.label }}</td>
          <td>{{ field.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
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

h1 {
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin: 0;
}

p {
  color: white;
  opacity: 0.7;
  margin: 0;
}

code {
  font-size: 12px;
  padding: 2px 4px;
  background-color: #ffffff24;
  border-radius: 2px;
}
</style>
