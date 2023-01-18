<script setup>
import browser from "webextension-polyfill";
import PageActionsService from "@/services/content-script/PageActionsService";
import CommunicationService from "@/services/communication/CommunicationService";
import { onMounted } from "vue";
onMounted(() => console.log(`onMounted`));

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const communication = new CommunicationService(request, sendResponse);

  const params = communication.Request.toObject();
  const response = PageActionsService[params.action](params);

  communication.setResponseData(response);
  communication.sendResponse();

  return true;
});

// send To Background
browser.runtime.sendMessage(`Message From Content Script`);
</script>

<template>
  <div class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <span class="close">&times;</span>
      <p>Some text in the Modal..</p>
    </div>
  </div>
</template>
