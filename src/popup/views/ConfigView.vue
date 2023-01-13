<script setup>
import { onMounted, ref, watch } from "vue";
import PopupService from "@/services/popup/PopupService";

let darkMode = ref(
  document.querySelector(`html`).getAttribute(`data-theme`) === `dark`
);
watch(darkMode, (newValue) =>
  document
    .querySelector(`html`)
    .setAttribute(`data-theme`, newValue ? `dark` : `corporate`)
);

let lang = ref(`pt_BR`);
watch(lang, (newValue) => PopupService.setOnStorage(`language`, newValue));

let domain = ref(``);
watch(domain, (newValue) =>
  PopupService.setOnStorage(`email.domain`, newValue)
);

onMounted(() => {
  PopupService.getFromStorage(`language`).then(({ data }) => {
    lang.value = data || lang.value;
  });
  PopupService.getFromStorage(`email.domain`).then(({ data }) => {
    domain.value = data || domain.value;
  });
});

const languages = [
  { value: `af_ZA`, label: `Afrikaans` },
  { value: `ar`, label: `Arabic` },
  { value: `az`, label: `Azerbaijani` },
  { value: `cz`, label: `Czech` },
  { value: `de`, label: `German` },
  { value: `de_AT`, label: `German (Austria)` },
  { value: `de_CH`, label: `German (Switzerland)` },
  { value: `el`, label: `Greek` },
  { value: `en`, label: `English` },
  { value: `en_AU`, label: `English (Australia)` },
  { value: `en_AU_ocker`, label: `English (Australia Ocker)` },
  { value: `en_BORK`, label: `English (Bork)` },
  { value: `en_CA`, label: `English (Canada)` },
  { value: `en_GB`, label: `English (Great Britain)` },
  { value: `en_GH`, label: `English (Ghana)` },
  { value: `en_IE`, label: `English (Ireland)` },
  { value: `en_IND`, label: `English (India)` },
  { value: `en_NG`, label: `Nigeria (English)` },
  { value: `en_US`, label: `English (United States)` },
  { value: `en_ZA`, label: `English (South Africa)` },
  { value: `es`, label: `Spanish` },
  { value: `es_MX`, label: `Spanish (Mexico)` },
  { value: `fa`, label: `Farsi` },
  { value: `fi`, label: `Finnish` },
  { value: `fr`, label: `French` },
  { value: `fr_BE`, label: `Français (Belgique)` },
  { value: `fr_CA`, label: `French (Canada)` },
  { value: `fr_CH`, label: `French (Switzerland)` },
  { value: `ge`, label: `Georgian` },
  { value: `he`, label: `Hebrew` },
  { value: `hr`, label: `Hrvatski` },
  { value: `hu`, label: `Hungarian` },
  { value: `hy`, label: `Armenian` },
  { value: `id_ID`, label: `Indonesian` },
  { value: `it`, label: `Italian` },
  { value: `ja`, label: `Japanese` },
  { value: `ko`, label: `Korean` },
  { value: `lv`, label: `Latvian` },
  { value: `mk`, label: `Macedonian` },
  { value: `nb_NO`, label: `Norwegian` },
  { value: `ne`, label: `Nepalese` },
  { value: `nl`, label: `Dutch` },
  { value: `nl_BE`, label: `Dutch (Belgium)` },
  { value: `pl`, label: `Polish` },
  { value: `pt_BR`, label: `Portuguese (Brazil)` },
  { value: `pt_PT`, label: `Portuguese (Portugal)` },
  { value: `ro`, label: `Romanian` },
  { value: `ru`, label: `Russian` },
  { value: `sk`, label: `Slovakian` },
  { value: `sv`, label: `Swedish` },
  { value: `tr`, label: `Turkish` },
  { value: `uk`, label: `Ukrainian` },
  { value: `ur`, label: `Urdu` },
  { value: `vi`, label: `Vietnamese` },
  { value: `zh_CN`, label: `Chinese` },
  { value: `zh_TW`, label: `Chinese (Taiwan)` },
  { value: `zu_ZA`, label: `Zulu (South Africa)` },
];
</script>

<template>
  <div class="p-2 rounded-box">
    <label class="label flex justify-between flex-row w-full">
      <span class="label-text">{{ darkMode ? `Dark` : `Light` }} Mode</span> 
      <input type="checkbox" class="toggle toggle-md" v-model="darkMode" />
    </label>
    <hr />
    <label class="label flex justify-between flex-row w-full">
      <span class="label-text">Language</span>
      <select v-model="lang" class="select select-bordered select-sm max-w-xs">
        <option
          v-for="language in languages"
          :value="language.value"
          :key="language.value"
        >
          {{ language.label }}
        </option>
      </select>
    </label>
    <hr />
    <label class="label flex justify-between flex-row w-full">
      <span class="label-text">Email Domain</span>
      <input
        v-model="domain"
        type="text"
        placeholder="type domain"
        class="input input-bordered input-sm max-w-xs"
      />
    </label>
  </div>
</template>

<style lang="sass">
.toggle
  border-radius: 5rem
</style>
