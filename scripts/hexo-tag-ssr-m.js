const katex = require('katex');

const MACROS = {
    "\\boldsymbol": "\\mathbf{#1}" // temporary
};

hexo.extend.tag.register('m', function (args) {
    var math = args.join(' ');
    return katex.renderToString(math, {displayMode: false, macros: MACROS});
});

hexo.extend.tag.register('md', function (args, content) {
    var math = content;
    return katex.renderToString(math, {displayMode: true, macros: MACROS});
}, {ends: true});