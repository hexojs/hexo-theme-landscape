# Landscape

A brand new default theme for [Hexo].

- [Preview](http://zespia.tw/hexo-theme-landscape/)

## Installation

### Install

``` bash
$ git clone https://github.com/tommy351/hexo-theme-landscape.git themes/landscape
```

**Landscape requires Hexo 2.4 and above.**

### Enable

Modify `theme` setting in `_config.yml` to `landscape`.

### Update

``` bash
cd themes/landscape
git pull
```

## Configuration

``` yml
# Header
menu:
  Home: /
  Archives: /archives
rss: /atom.xml

# Content
excerpt_link: Read More
fancybox: true

# Sidebar
sidebar: right
widgets:
- category
- tag
- tagcloud
- recent_posts

# Miscellaneous
google_analytics:
favicon: favicon.png
twitter:
google_plus:
```

- **menu** - Navigation menu
- **rss** - RSS link
- **excerpt_link** - "Read More" link at the bottom of excerpted articles. `false` to hide the link.
- **fancybox** - Enable [Fancybox]
- **sidebar** - Sidebar style. You can choose `left`, `right`, `bottom` or `false`.
- **widgets** - Widgets displaying in sidebar
- **google_analytics** - Google Analytics ID
- **favicon** - Favicon path
- **twitter** - Twiiter ID
- **google_plus** - Google+ ID

## Features

### Fancybox

### Gallery Post

### Link Post

[Hexo]: http://zespia.tw/hexo/
[Fancybox]: http://fancyapps.com/fancybox/