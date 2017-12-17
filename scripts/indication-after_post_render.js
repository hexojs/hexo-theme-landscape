'use strict';

const cheerio = require('cheerio');

hexo.extend.filter.register('after_post_render', function (data) {
    if (data.layout !== 'post' || !(this.theme.config.indications)) {
        return;
    }

    var $ = cheerio.load(data.content, {decodeEntities: true});

    var indicationKinds = this.theme.config.indications;
    indicationKinds.forEach(function (aClass) {
        var indicationTag = $('.' + aClass);
        if (indicationTag.length <= 0) {
            return;
        }
        indicationTag.each(function () {
            $(this.parent).append($.html(this));
        });
    });

    data.content = $.html();
});