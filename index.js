"use strict";
exports.__esModule = true;
var Swapper = /** @class */ (function () {
    /**
     * Constructor.
     * @param htmlPath path to folder contiaining html files for swapping.
     * @param rootElement element to swap out contents of.
     * @param firstSwap optional swap to execute after initialization
     */
    function Swapper(htmlPath, rootElement, firstSwap) {
        if (htmlPath[htmlPath.length - 1] !== '/')
            htmlPath += '/';
        this.htmlPath = htmlPath;
        this.rootElement = document.querySelector(rootElement);
        if (typeof firstSwap === 'string')
            this.swap(firstSwap);
        this.updateTargets();
    }
    /**
     * Updates target of click eventlisteners.
     * @param element Optionol element to only update children of.
     */
    Swapper.prototype.updateTargets = function (element) {
        var _this = this;
        if (element === null || element === undefined)
            element = this.rootElement;
        var _loop_1 = function (i) {
            var child = element.children[i];
            if (child.hasAttribute('swapper-swap')) {
                child.addEventListener('click', function () {
                    _this.swap(child.getAttribute('swapper-swap'));
                });
            }
            if (child.children.length > 0)
                this_1.updateTargets(child);
        };
        var this_1 = this;
        for (var i = 0; i < element.children.length; i++) {
            _loop_1(i);
        }
    };
    /**
     * Swaps contents of root element for specified html file.
     * @param target Name of html file (must be present in htmlFile directory) (file extension may be omitted)
     * @param callback Function to call after swap has finished succesfully.
     */
    Swapper.prototype.swap = function (target, callback) {
        var _this = this;
        var targetPath;
        if (target.indexOf('.html') !== target.length - 6)
            targetPath = this.htmlPath + target + '.html';
        else
            targetPath = this.htmlPath + target;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType('document/html');
        xmlhttp.open('GET', targetPath);
        // On load end
        xmlhttp.onloadend = function () {
            if (xmlhttp.status === 200) {
                _this.rootElement.innerHTML = xmlhttp.responseText;
                _this.updateTargets();
                if (callback !== null && callback !== undefined)
                    callback();
            }
            else
                console.warn("[ Swapper ] Failed to swap to '" + target + "'. With error: '" + xmlhttp.statusText + "'.");
        };
        // On error
        xmlhttp.onerror = function () {
            console.warn("[ Swapper ] Failed to swap to '" + target + "'. With error: '" + xmlhttp.statusText + "'.");
        };
        xmlhttp.send();
    };
    return Swapper;
}());
exports["default"] = Swapper;
