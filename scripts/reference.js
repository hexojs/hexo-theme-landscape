function r_wrap(ctx) {
    return function referenceTag(args, content) {
        const __ = ctx.theme.i18n.__(ctx.theme.i18n.languages); // i18n
        var renderedText = ctx.render.renderSync({text: content, engine: 'markdown'});
        if (renderedText.lastIndexOf('<ul>', 0) === 0 && renderedText.indexOf('</ul>\n', renderedText.length - 6) >= 0) {
            return '<section class="references">' +
                '<h1>' + __('references') + '</h1>' +
                renderedText +
                '</section>';
        } else {
            throw Error("Invalid usage.");
        }
    };
}

hexo.extend.tag.register('__reference', r_wrap(hexo), {ends: true});