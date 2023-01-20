<script setup>
// import browser from "webextension-polyfill";
import { onMounted } from "vue";

onMounted(() => import(`@content/application/mensageria/MessageListener`));

// send To Background
// browser.runtime.sendMessage(`Message From Content Script`);
</script>
