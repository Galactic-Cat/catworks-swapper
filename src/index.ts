export default class Swapper {
    /** Internal variable for storing the path to html files. */
    htmlPath: string
    /** Internal variable for storing the root element for swapper. */
    rootElement: Element

    /**
     * Constructor.
     * @param htmlPath path to folder contiaining html files for swapping.
     * @param rootElement element to swap out contents of.
     * @param firstSwap optional swap to execute after initialization
     */
    constructor(htmlPath: string, rootElement: string, firstSwap?: string) {
        if (htmlPath[htmlPath.length - 1] !== '/')
            htmlPath += '/'
        this.htmlPath = htmlPath
        this.rootElement = document.querySelector(rootElement)
        if (typeof firstSwap === 'string')
            this.swap(firstSwap)
        this.updateTargets()
    }

    /**
     * Updates target of click eventlisteners.
     * @param element Optionol element to only update children of.
     */
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

    /**
     * Swaps contents of root element for specified html file.
     * @param target Name of html file (must be present in htmlFile directory) (file extension may be omitted)
     * @param callback Function to call after swap has finished succesfully.
     */
    swap(target: string, callback?: Function) {
        let targetPath: string
        if (target.indexOf('.html') !== target.length - 6)
            targetPath = this.htmlPath + target + '.html'
        else
            targetPath = this.htmlPath + target
        
        let xmlhttp = new XMLHttpRequest()
        xmlhttp.overrideMimeType('document/html')
        xmlhttp.open('GET', targetPath)
        // On load end
        xmlhttp.onloadend = () => {
            if (xmlhttp.status === 200) {
                this.rootElement.innerHTML = xmlhttp.responseText
                this.updateTargets()
                if (callback !== null && callback !== undefined)
                    callback()
            } else
                console.warn(`[ Swapper ] Failed to swap to '${target}'. With error: '${xmlhttp.statusText}'.`)
        }
        // On error
        xmlhttp.onerror = () => {
            console.warn(`[ Swapper ] Failed to swap to '${target}'. With error: '${xmlhttp.statusText}'.`)
        }
        xmlhttp.send()
    }
}