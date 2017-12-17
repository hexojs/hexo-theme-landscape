var rUrl = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/;

/**
 * Fancybox tag
 *
 * Syntax:
 *   {% fancybox [classes] /path/to/image [/path/to/thumbnail] [title] %}
 */

hexo.extend.tag.register('fancybox', function (args) {
    var classes = [];
    const argc = args.length;
    for (var i = 0; i < argc; i++) {
        const arg = args.shift();
        if (rUrl.test(arg) || arg[0] === '/' /* absolute path */) {
            args.unshift(arg);
            break;
        }

        // assume this is a HTML class
        classes.push(arg);
    }
    var original = args.shift(),
        thumbnail = '';

    if (args.length && rUrl.test(args[0])) {
        thumbnail = args.shift();
    }

    const classesStr = classes.length > 0 ? ' ' + classes.join(' ') : '';
    var title = args.join(' ');

    return '<div class="fancybox-tag' + classesStr + '">' +
        '<a class="fancybox" href="' + original + '" title="' + title + '">' +
        '<img src="' + (thumbnail || original) + '" alt="' + title + '">' +
        '</a>' +
        (title ? '<span class="caption">' + title + '</span>' : '') +
        '</div>';
});