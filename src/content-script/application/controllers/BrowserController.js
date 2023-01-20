import ResponseFactory from "@app/response/Factory";

export default class BrowserController {
  constructor({ fromBuilder }) {
    if (!fromBuilder) throw new Error(`Cannot be called directly`);
  }

  static async build() {
    return new BrowserController({ fromBuilder: true });
  }

  setStorage({ key, value }) {
    localStorage.setItem(key, value);
    return ResponseFactory.create();
  }

  getStorage({ key }) {
    return ResponseFactory.createWithData(localStorage.getItem(key));
  }

  clearCache() {
    caches
      .keys()
      .then((keyList) => Promise.all(keyList.map((key) => caches.delete(key))));
  }

  reloadActivePage() {
    window.location.reload();
  }
}
