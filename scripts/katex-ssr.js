'use strict';

var katex = require('katex');

// from splitAtDelimiters.js
const findEndOfMath = function (delimiter, text, startIndex) {
    // Adapted from
    // https://github.com/Khan/perseus/blob/master/src/perseus-markdown.jsx
    let index = startIndex;
    let braceLevel = 0;

    const delimLength = delimiter.length;

    while (index < text.length) {
        const character = text[index];

        if (braceLevel <= 0 &&
            text.slice(index, index + delimLength) === delimiter) {
            return index;
        } else if (character === "\\") {
            index++;
        } else if (character === "{") {
            braceLevel++;
        } else if (character === "}") {
            braceLevel--;
        }

        index++;
    }

    return -1;
};

const splitAtDelimiters = function (startData, leftDelim, rightDelim, display) {
    const finalData = [];

    for (let i = 0; i < startData.length; i++) {
        if (startData[i].type === "text") {
            const text = startData[i].data;

            let lookingForLeft = true;
            let currIndex = 0;
            let nextIndex;

            nextIndex = text.indexOf(leftDelim);
            if (nextIndex !== -1) {
                currIndex = nextIndex;
                finalData.push({
                    type: "text",
                    data: text.slice(0, currIndex),
                });
                lookingForLeft = false;
            }

            while (true) {
                if (lookingForLeft) {
                    nextIndex = text.indexOf(leftDelim, currIndex);
                    if (nextIndex === -1) {
                        break;
                    }

                    finalData.push({
                        type: "text",
                        data: text.slice(currIndex, nextIndex),
                    });

                    currIndex = nextIndex;
                } else {
                    nextIndex = findEndOfMath(
                        rightDelim,
                        text,
                        currIndex + leftDelim.length);
                    if (nextIndex === -1) {
                        break;
                    }

                    finalData.push({
                        type: "math",
                        data: text.slice(
                            currIndex + leftDelim.length,
                            nextIndex),
                        rawData: text.slice(
                            currIndex,
                            nextIndex + rightDelim.length),
                        display: display,
                    });

                    currIndex = nextIndex + rightDelim.length;
                }

                lookingForLeft = !lookingForLeft;
            }

            finalData.push({
                type: "text",
                data: text.slice(currIndex),
            });
        } else {
            finalData.push(startData[i]);
        }
    }

    return finalData;
};

// from auto-render.js
const splitWithDelimiters = function (text, delimiters) {
    let data = [{type: "text", data: text}];
    for (let i = 0; i < delimiters.length; i++) {
        const delimiter = delimiters[i];
        data = splitAtDelimiters(
            data, delimiter.left, delimiter.right,
            delimiter.display || false);
    }
    return data;
};

const renderMathInText = function (text, optionsCopy) {
    const data = splitWithDelimiters(text, optionsCopy.delimiters);
    const fragments = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].type === "text") {
            fragments.push(data[i].data)
        } else {
            const math = data[i].data;
            // Override any display mode defined in the settings with that
            // defined by the text itself
            optionsCopy.displayMode = data[i].display;
            try {
                var result = katex.renderToString(math, optionsCopy);
                fragments.push(result);
            } catch (e) {
                if (!(e instanceof katex.ParseError)) {
                    throw e;
                }
                optionsCopy.errorCallback(
                    "KaTeX auto-render: Failed to parse `" + data[i].data +
                    "` with ",
                    e
                );
                fragments.push(data[i].rawData);
            }
        }
    }

    return fragments.join("");
};

// TODO cheerio to get <pre/> then process
hexo.extend.filter.register('before_post_render', function (data) {
    let isSuccess = true;
    let modifiedContent = renderMathInText(data.content, {
        delimiters: [{left: "$$", right: "$$", display: true}, {left: "$", right: "$", display: false}],
        errorCallback: function (message, e) {
            // TODO
            isSuccess = false;
            console.error(message)
        }
    });
    data.content = modifiedContent;
});