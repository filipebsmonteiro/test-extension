import browser from "webextension-polyfill";
import PageActionsService from "@/services/content-script/PageActionsService";
import CommunicationService from "@/services/communication/CommunicationService";
import Response from "@/services/communication/Response";

// eslint-disable-next-line no-undef
if (_ENV && _ENV.mode && _ENV.mode === `development`) {
  console.clear();
  console.log(`content-script/main.js Loaded!`);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const communication = new CommunicationService(request);
  const response = new Response(sendResponse);

  const actions = new PageActionsService(response);
  actions[communication.Request.action](communication.Request.toObject());
  communication.Response = actions.Response;

  communication.Response.sendResponse();

  return true;
});
