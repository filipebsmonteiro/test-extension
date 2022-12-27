import browser from 'webextension-polyfill'

export default class PageService {
    tabs = [];
    
    constructor() {
        // this.initHandler();
    }

    static async loadTabs(query = { active: true, currentWindow: true }) {
        this._tabs = await browser.tabs.query(query)
    }

    static async sendRequest({ action, fun, params, parser, to = `content` }) {
        await this.loadTabs();

        if (this._tabs.length > 1) {
            return await Promise.all(
                this._tabs.map(tab => 
                    browser.tabs.sendMessage(tab.id, { action, fun, params, parser, to })
                )
            )
                // ).then(array => array)
        }

        return await browser.tabs.sendMessage(this._tabs[0].id, { action, fun, params, parser, to })
            // .then(response => array)
    }

    static async sendRequestOld({ action, fun, params, to = `content` }) {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true })
        const promisses = tabs.map(tab => 
            browser.tabs.sendMessage(tab.id, { action, fun, params, to })
        )

        if (promisses.length > 1) {
            return Promise.all(promisses).then(array => array)
        }

        return promisses[0].then(response => response)
    }

    static querySelector(selector) {
        return this.sendMessage({
            action: `function`,
            fun: function(selector) { return document.querySelector(selector) },
            params: selector
        })
    }

    static getElementById(selector) {
        return this.sendMessage({
            action: `function`,
            fun: function(selector) { return document.getElementById(selector) },
            params: selector
        })
    }

    static getElementsByTagName(selector) {
        return this.sendRequest({
            action: `document`,
            fun: `getElementsByTagName`,
            params: selector,
            parser: `HTMLCollectionToFields`
        })
    }

}