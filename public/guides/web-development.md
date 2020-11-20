# Web Development

Welcome, this is a mixed guide of how to on web development! In this guide, we will be having pages related to web js, css and html!<br/>
Start this guide from the next page!

---

# Highlight.js

Many people uses code blocks in their site without syntax highlighting which is not good for viewers to understand the codes and will not be neat to look over up. So we use [highlight.js](https://highlightjs.org/), even this website code blocks are colored with the same highlightjs.

> There are some alternatives for highlightjs, one of them is [Prismjs](https://prismjs.com/).

## Setting up

So for the sake of this guide, we will be taking this code block which needs to be colored.

```html
<code class="js">
    <pre>
       console.log('Hello World');
    </pre>
</code>
```

## Adding highlightjs

You need to add the highlightjs script tag below to your document head

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/highlight.min.js" integrity="sha512-8DnqlIcZT5O7kn55WxWs0PnFyhwCqVEnsDpyHqcadSNtP0eqae406JmIoo2cXT5A42jnlcCw013sdkmK3mEJcQ==" crossorigin="anonymous"></script>
```

> You can get a variety of highlightjs cdn [here](https://cdnjs.com/libraries/highlight.js/)

Then you need to add highlightjs css link tag

```html
<link href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.3.2/styles/default.min.css" rel="stylesheet"/>
```

> There are variety of highlightjs css for syntax highlighting, you can view up all of them [here](https://highlightjs.org/static/demo/). It will be better to use custom css for syntax highlighting...

## Highlighting

Now you need to use some js here in the script tag

```html
<script>
    window.addEventListener('load', () => {
        document.querySelectorAll('code pre').forEach(hljs.highlightBlock); // This will highlight the element
    });
</script>
```
