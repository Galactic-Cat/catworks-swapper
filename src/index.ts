export default class Swapper {
    htmlPath: string
    rootElement: Element

    constructor(htmlPath: string, rootElement: string, firstSwap?: string) {
        if (htmlPath[htmlPath.length - 1] !== '/')
            htmlPath += '/'
        this.htmlPath = htmlPath
        this.rootElement = document.querySelector(rootElement)
        if (typeof firstSwap === 'string')
            this.swap(firstSwap)
        this.updateTargets()
    }

    updateTargets(element?: Element) {
        if (element === null || element === undefined)
            element = this.rootElement
        
        for (let i = 0; i < element.children.length; i++) {
            let child = element.children[i]
            if (child.hasAttribute('swapper-swap')) {
                child.addEventListener('click', () => {
                    this.swap(child.getAttribute('swapper-swap'))
                })
            }
            if (child.children.length > 0)
                this.updateTargets(child)
        }
    }

    swap(target: string, callback?: Function) {
        let targetPath: string
        if (target.indexOf('.html') !== target.length - 6)
            targetPath = this.htmlPath + target + '.html'
        else
            targetPath = this.htmlPath + target
        
        let xmlhttp = new XMLHttpRequest()
        xmlhttp.overrideMimeType('document/html')
        xmlhttp.open('GET', targetPath)
        xmlhttp.onloadend = () => {
            if (xmlhttp.status === 200) {
                this.rootElement.innerHTML = xmlhttp.responseText
                this.updateTargets()
                if (callback !== null && callback !== undefined)
                    callback()
            } else
                console.warn(`[ Swapper ] Failed to swap to '${target}'. With error: '${xmlhttp.statusText}'.`)
        }
        xmlhttp.onerror = () => {
            console.warn(`[ Swapper ] Failed to swap to '${target}'. With error: '${xmlhttp.statusText}'.`)
        }
        xmlhttp.send()
    }
}