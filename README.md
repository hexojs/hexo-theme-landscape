# Landscape

A brand new default theme for [Hexo].

- [Preview](https://hexojs.github.io/hexo-theme-landscape/)

## Installation

### Install

``` bash
$ git clone --depth 1 https://github.com/hexojs/hexo-theme-landscape themes/landscape
```

**Landscape requires Hexo 2.4 and above.** If you would like to enable the RSS, the [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) plugin is also required.

### Enable

Modify `theme` setting in `_config.yml` to `landscape`.

``` diff
_config.yml
- theme: some-theme
+ theme: landscape
```

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
banner: images/banner.jpg

# Content
excerpt_link: Read More
fancybox: true
recent_posts_limits: 5

# Sidebar
sidebar: right
widgets:
- category
- tag
- tagcloud
- archives
- recent_posts

# Miscellaneous
google_analytics:
favicon: /favicon.png
twitter:

# social links, the key is used to find the font in fontawesome 4.7.0(https://fontawesome.com/v4.7.0/), e.g. github means <span class="fa fa-github"></span>, the value is the link
# social:
#  github: https://github.com/your_github_account
#  twitter: https://twitter.com/your_twitter_account
#  telegram: https://t.me/youryour_telegram_account

```

- **menu** - Navigation menu
- **rss** - RSS link
- **banner** - Path of title banner image of page top
- **excerpt_link** - "Read More" link at the bottom of excerpted articles. `false` to hide the link.
- **fancybox** - Enable [Fancybox]
- **recent_posts_limits** - How many posts display in Home page.
- **sidebar** - Sidebar style. You can choose `left`, `right`, `bottom` or `false`.
- **widgets** - Widgets displaying in sidebar
- **google_analytics** - Google Analytics ID
- **favicon** - Favicon path
- **twitter** - Twiiter ID

## Features

### Fancybox

Landscape uses [Fancybox] to showcase your photos. You can use Markdown syntax or fancybox tag plugin to add your photos.

```
![img caption](img url)

{% fancybox img_url [img_thumbnail] [img_caption] %}
```

### Sidebar

You can put your sidebar in left side, right side or bottom of your site by editing `sidebar` setting.

Landscape provides 5 built-in widgets:

- category
- tag
- tagcloud
- archives
- recent_posts

All of them are enabled by default. You can edit them in `widget` setting.

### Social Links

You can add your social media links like this:

```
social:
  github: https://github.com/your_github_account
  twitter: https://twitter.com/your_twitter_account
  telegram: https://t.me/youryour_telegram_account
```

They will appear at the top right conner of the page alongside rss feeds and search icon. Landscape use fontawesome version [*4.7.0*](https://fontawesome.com/v4.7.0/), and the key in each key-value pair is used to find the icon, e.g. github means `<span class="fa fa-github"></span>`, the value is the link. Your can search for avalilable icons and their names [here](https://fontawesome.com/v4.7.0/icons/). Note that the twitter-id you set at top level of _config.yml like:

```
twitter: twitter_id
```

is currently *not* used to generate a social link icon.

[Fancybox]: https://github.com/fancyapps/fancyBox
