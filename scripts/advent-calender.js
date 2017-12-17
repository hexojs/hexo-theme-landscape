'use strict';

function isUrl(s) {
    return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[.\!\/\\w]*))?)/.test(s)
}

function isPositiveInteger(s) {
    return /^\+?[1-9][\d]*$/.test(s);
}

/**
 * Advent Calender tag
 *
 * Syntax:
 *   {% __advent_calender <calender title> <calender url> <day of this article> | [<yesterday title> <yesterday url>] | [<tomorrow title> <tomorrow url>] %}
 */
function ac_wrap(ctx) {
    return function adventCalenderTag(args, content) {
        const __ = ctx.theme.i18n.__(ctx.theme.i18n.languages); // i18n

        var buf = [[], [], []];
        var i = 0;
        while (args.length > 0) {
            if (i >= 3) {
                throw new Error("Too many '|' separators.");
            }
            if (args[0] === '|') {
                i++;
                args.shift();
                continue;
            }

            buf[i].push(args.shift());
        }
        if (i !== 2) {
            throw new Error("Invalid number of '|' separators.");
        }
        const calenderInfo = buf[0];
        if (calenderInfo.length < 3) {
            throw new Error("Too few arguments for calender info.");
        }
        const yesterdayInfo = buf[1];
        if (yesterdayInfo.length < 2 && yesterdayInfo.length !== 0) {
            throw new Error("Invalid number of arguments for yesterday article.");
        }
        const tomorrowInfo = buf[2];
        if (tomorrowInfo.length < 2 && tomorrowInfo.length !== 0) {
            throw new Error("Invalid number of arguments for tomorrow article.");
        }

        const dayStr = calenderInfo.pop();
        if (!isPositiveInteger(dayStr)) {
            throw new Error("Day should be positive integer.");
        }
        const day = Number(dayStr);
        if (day <= 0 || 25 < day) {
            throw new Error("Day should be in from 1st to 25th.");
        }
        const calenderUrl = calenderInfo.pop();
        if (!isUrl(calenderUrl)) {
            throw new Error("Calender URL is wrong format.");
        }
        const calenderTitle = calenderInfo.join(' ');

        var result = '<nav class="advent-calender">' +
            '<header><a href="' + calenderUrl + '">' + calenderTitle + '</a><span class="day">' +
            __("nth_day", day) + '</span></header>';

        if (yesterdayInfo.length >= 2) {
            if (day <= 1) {
                throw new Error("Should not be yesterday article on 1st day article.");
            }
            // yesterday article exist
            const yesterdayUrl = yesterdayInfo.pop();
            if (!isUrl(yesterdayUrl)) {
                throw new Error("Yesterday article URL is wrong format.");
            }
            const yesterdayTitle = yesterdayInfo.join(' ');
            result += '<div class="yesterday"><span class="day">' + __("nth_day", day - 1) + '</span>' +
                '<a href="' + yesterdayUrl + '">' + yesterdayTitle + '</a></div>';
        }

        if (tomorrowInfo.length >= 2) {
            if (day >= 25) {
                throw new Error("Should not be tomorrow article on 25th day article.");
            }
            // tomorrow article exist
            const tomorrowUrl = tomorrowInfo.pop();
            if (!isUrl(tomorrowUrl)) {
                throw new Error("Tomorrow article URL is wrong format.");
            }
            const tomorrowTitle = tomorrowInfo.join(' ');
            result += '<div class="tomorrow"><span class="day">' + __("nth_day", day + 1) + '</span>' +
                '<a href="' + tomorrowUrl + '">' + tomorrowTitle + '</a></div>';
        }

        result += '</nav>';

        return result;
    };
}

hexo.extend.tag.register('__advent_calender', ac_wrap(hexo));