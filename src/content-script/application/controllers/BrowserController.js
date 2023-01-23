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
    const response =
      key === `*`
        ? Object.keys(localStorage).map((key) => ({
            key,
            value: localStorage.getItem(key),
          }))
        : localStorage.getItem(key);

    return ResponseFactory.createWithData(response);
  }

  removeStorage({ key }) {
    key === `*`
      ? Object.keys(localStorage).map((key) => localStorage.removeItem(key))
      : localStorage.removeItem(key);

    return ResponseFactory.create();
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
