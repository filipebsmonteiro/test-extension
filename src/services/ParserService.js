export default class ParserService {
    constructor() {}

    static getName(htmlElement) {
        let name = null;
        if (htmlElement.name) return htmlElement.name;
        
        let element = htmlElement;
        for (let i = 0; i < 10; i++) {
            element = element?.previousSibling
            if (element && element.tagName === `LABEL`) return element.innerHTML;
        }
        
        return name
    } 

    static HTMLCollectionToFields(collection) {
        return Array.from(collection).map(elmnt => ({
            html: elmnt,
            type: elmnt.type,
            name: this.getName(elmnt),
            value: elmnt.value
        }))
    }
}