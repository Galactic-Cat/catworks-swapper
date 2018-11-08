# Catworks Swapper
A simple JS package to create swappable parts of a webpage. Extremely lightweight.
If you're a proffesional JS developer, maybe skip this one, it's undoubetly amateurish, maybe use React?

## Setting up
Firstly , import the Swapper class.
```javascript
import Swapper from 'catworks-swapper'
```
Then create the element, like you would.
You'll have to bind it to a DOM element, so:
```html
<html>
    <head>...</head>
    <body>
        <main id="root"></main>
    </body>
</html>
```
```javascript
var swapper = new Swapper('./path/to/html/files/', '#root')
```
As you can see swapper expects your html files to be present in a single folder.  
For instance
```
root/
    node_modules/
    pages/
        home.html
        about.html
    package.json
    index.html
```
Now setting your htmlPath to `'./pages/'`, you can swap to either _home_ or _about_ by using the swap method, namely:
```javascript
swapper.swap('home')
```
If you wish you can also provide a callback to swap, which fires if the swap was succesful.
```javascript
swapper.swap('home', () => { /* do something */ })
```

### That's all for now folks!
