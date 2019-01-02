/** Main class of CW-Swapper. Use this to start swapping. */
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
    constructor(htmlPath: string, rootElement: string, firstSwap?: string)

    /**
     * Updates target of click eventlisteners.
     * @param element Optionol element to only update children of.
     */
    updateTargets(element?: Element)

    /**
     * Swaps contents of root element for specified html file.
     * @param target Name of html file (must be present in htmlFile directory) (file extension may be omitted)
     * @param callback Function to call after swap has finished succesfully.
     */
    swap(target: string, callback: Function)
}