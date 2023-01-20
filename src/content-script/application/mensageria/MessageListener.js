import browser from "webextension-polyfill";
import Factory from "@app/request/Factory";
import Controllers from "@content/application/mensageria/ControllerRegister";

browser.runtime.onMessage.addListener(async (data, sender) => {
  const request = Factory.create(data);
  request.origin = sender;
  const controller = await Controllers[request.controller].build();

  return controller[request.method](request.args);
});
