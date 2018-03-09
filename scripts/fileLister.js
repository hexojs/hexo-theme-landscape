'use strict';

/**
* Syntax:
*   <%- fileLister path extension action %>
*
*   List files from theme and user site.
*   It looks in:
*       /themes/<themeName>/source/<path>
*       /source/<path>
*
*   For files that end with <extension>
*   Filtering out any file that start with '_'
*
*   It then applies the function `action(file)` for every file that matches.
*
*   Example usage is to combine theme and user style sheets into header file.
*/

hexo.extend.helper.register('fileLister', function(path, extension, action) {

    var fs = require("fs");

    var sitePath    = "." + this.config.root + "/source/" + path;
    var siteResult  = fs.readdirSync(sitePath);

    var themePath   = "." + this.config.root + "/themes/" + this.config.theme + "/source/" + path;
    var themeResult = fs.readdirSync(themePath);

    /*
     * Combine results from theme and user site.
     */
    var list = themeResult.concat(siteResult).filter(file => file.endsWith(extension) && !file.startsWith("_"));
    var text = list.map(action);
    var output = text.join("\n");
    return output;
});


