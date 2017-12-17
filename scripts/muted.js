function m_wrap(ctx) {
    return function mutedTag(args, content) {
        var renderedText = ctx.render.renderSync({text: content, engine: 'markdown'});
        if (renderedText.lastIndexOf('<p>', 0) === 0 && renderedText.indexOf('</p>\n', renderedText.length - 5) >= 0) {
            var originalText = renderedText.slice(3, -5); // `<p>hoge ABC</p>\n` -> `hoge ABC`
            return '<span class="muted">' + originalText + '</span>';

        } else {
            throw Error("Invalid usage.");
        }
    }
}

hexo.extend.tag.register('__muted', m_wrap(hexo), {ends: true});