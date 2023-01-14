import browser from "webextension-polyfill";
import PageActionsService from "@/services/content-script/PageActionsService";
import CommunicationService from "@/services/communication/CommunicationService";

// eslint-disable-next-line no-undef
if (_ENV && _ENV.mode && _ENV.mode === `development`) {
  console.clear();
  console.log(`content-script/main.js Loaded!`);
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const communication = new CommunicationService(request, sendResponse);

  const params = communication.Request.toObject();
  const response = PageActionsService[params.action](params);

  communication.setResponseData(response);
  communication.sendResponse();

  return true;
});
