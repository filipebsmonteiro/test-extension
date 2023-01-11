import browser from "webextension-polyfill";
import ParserService from "@/services/ParserService";

// eslint-disable-next-line no-undef
if (_ENV && _ENV.mode && _ENV.mode === `development`) {
  console.clear();
  console.log("Hello from the content!");
}

function validateRequest(request) {
  if (!request.action) throw new Error(`Action can't be Empty!`);
  if (!request.to) throw new Error(`Destination can't be Empty!`);

  return {
    action: request.action,
    fun: request.fun ? request.fun : () => null,
    params: request.params ?? null,
    parser: request.parser ?? null,
    to: request.to,
  };
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const Request = validateRequest(request);
  let Response = { data: null, message: null, status: 200 };

  if (Request.to === `back`) {
    browser.runtime.sendMessage(Request).then(
      (Response) => sendResponse(Response),
      (Error) => console.error("Error :>> ", Error)
    );
  }

  switch (Request.action) {
    case `console`:
      console[Request.fun](Request.params);
      Response.message = `Success`;
      // console.log(`%c OBAAAAA`, "color:green;");
      break;
    case `document`:
      Response.message = `Success`;
      Response.data = document[Request.fun](Request.params);
      Response.data = Request.parser
        ? ParserService[Request.parser](Response.data)
        : Response.data;
      break;
    case `input`:
      Response.message = `Success`;
      const input = document.getElementById(Request.params.id);
      Request.params.prop
        ? (input[Request.params.prop] = Request.params.value)
        : null;
      Request.params.events && Array.isArray(Request.params.events)
        ? Request.params.events.map((evt) =>
            input.dispatchEvent(new Event(evt))
          )
        : null;
      break;
    case `function`:
      try {
        Response.message = `Success`;
        Response.data = Request.fun.call(Request.params, document);
      } catch (error) {
        console.error(error);
        Response.status = 500;
        Response.message = error.message;
      }
      break;

    default:
      Response.status = 404;
      Response.message = `Request.action not implemented!`;
      break;
  }
  sendResponse({ ...Response });

  return true;
});
