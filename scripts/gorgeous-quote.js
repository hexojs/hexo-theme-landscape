'use strict';

const titlecase = require('titlecase');

const rFullCiteWithTitle = /(\S.*)\s+(https?:\/\/)(\S+)\s+(.+)/i;
const rFullCite = /(\S.*)\s+(https?:\/\/)(\S+)/i;
const rAuthorTitle = /([^,]+),\s*([^,]+)/;
const rAuthor = /(.+)/;

/**
 * Gorgeous Quote tag
 *
 * Syntax:
 *   {% __gorgeous_quote <title> | <subtitle> | [author[, source]] [link] [source_link_title] %}
 *   Quote string
 *   {% end__gorgeous_quote %}
 */
function gq_wrap(ctx) {
    return function gorgeousQuoteTag(args, content) {
        if (args.length <= 0) {
            throw new Error("Too few arguments. (Before read <title>)");
        }
        var quoteTitleTokens = [];
        while (args.length > 0 && args[0] !== '|') {
            quoteTitleTokens.push(args.shift());
        }
        if (args.length <= 0) {
            throw new Error("Too few arguments. (Before read <subtitle>)");
        }
        args.shift(); // Eject head '|'
        var quoteSubtitleTokens = [];
        while (args.length > 0 && args[0] !== '|') {
            quoteSubtitleTokens.push(args.shift());
        }
        if (args.shift() !== '|') {
            throw new Error("Too few arguments. ('|' must exists whether rest of arguments exist or not)");
        }

        var str = args.join(' ');
        var author = '';
        var source = '';
        var title = '';
        var footer = '';
        var result = '';
        var match;

        if (str) {
            if (rFullCiteWithTitle.test(str)) {
                match = str.match(rFullCiteWithTitle);
                author = match[1];
                source = match[2] + match[3];
                title = ctx.config.titlecase ? titlecase(match[4]) : match[4];
            } else if (rFullCite.test(str)) {
                match = str.match(rFullCite);
                author = match[1];
                source = match[2] + match[3];
            } else if (rAuthorTitle.test(str)) {
                match = str.match(rAuthorTitle);
                author = match[1];
                title = ctx.config.titlecase ? titlecase(match[2]) : match[2];
            } else if (rAuthor.test(str)) {
                match = str.match(rAuthor);
                author = match[1];
            }

            if (author) footer += '<strong>' + author + '</strong>';

            if (source) {
                var link = source.replace(/^https?:\/\/|\/(index.html?)?$/g, '');
                footer += '<cite><a href="' + source + '">' + (title ? title : link) + '</a></cite>';
            } else if (title) {
                footer += '<cite>' + title + '</cite>';
            }
        }
        result += '<blockquote>';
        result += '<header><h1>' + quoteTitleTokens.join(' ') + '</h1><p>' + quoteSubtitleTokens.join(' ') + '</p></header>';
        result += '<div>' + ctx.render.renderSync({text: content, engine: 'markdown'}) + '</div>';
        if (footer) result += '<footer>' + footer + '</footer>';
        result += '</blockquote>';

        return result;
    };
}

hexo.extend.tag.register('__gorgeous_quote', gq_wrap(hexo), {ends: true});