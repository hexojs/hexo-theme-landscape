'use strict';

const cheerio = require('cheerio');
const highlightSelector = 'figure.highlight';
const omitLineClass = 'omit-line';

hexo.extend.filter.register('after_post_render', function (data) {
    var $ = cheerio.load(data.content, {decodeEntities: true});

    var highlights = $(highlightSelector);
    highlights.filter(function (index, element) {
        const line_numbers = $(this).find('td.gutter span.line');
        return line_numbers && line_numbers.length === 1 && $(line_numbers[0]).text() === '0'
    }).each(function () {
        $(this).addClass(omitLineClass)
    });
    highlights.filter(function (index, element) {
        const next = $(this).next();
        return next && $(next).is(highlightSelector) && $(next).hasClass(omitLineClass);
    }).each(function () {
        $(this).addClass('pre-' + omitLineClass);
    });
    highlights.filter(function (index, element) {
        const prev = $(this).prev();
        return prev && $(prev).is(highlightSelector) && $(prev).hasClass(omitLineClass);
    }).each(function () {
        $(this).addClass('post-' + omitLineClass);
    });

    data.content = $.html();
});