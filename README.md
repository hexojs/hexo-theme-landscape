# Landscape

[![NPM version](https://badge.fury.io/js/hexo-theme-landscape.svg)](https://www.npmjs.com/package/hexo-theme-landscape)

A brand new default theme for [Hexo].

- [Preview](https://hexojs.github.io/hexo-theme-landscape/)

## Installation

### Install

If you're using Hexo 5.0 or later, the simplest way to install is through npm:

```
npm i hexo-theme-landscape
```

Install via git:

```bash
git clone --depth 1 https://github.com/hexojs/hexo-theme-landscape themes/landscape
```

If you would like to enable the RSS, the [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed) plugin is also required.

### Enable

Modify `theme` setting in `_config.yml` to `landscape`.

```diff
_config.yml
- theme: some-theme
+ theme: landscape
```

### Update

Install the latest version through npm:

```sh
npm install hexo-theme-landscape@latest
```

Or update to the latest master branch via git:

```bash
cd themes/landscape
git pull
```

## Configuration

The configuration file for the theme is `_config.yml` in the repository. As the default theme for Hexo, hexo-theme-landscape is installed via npm during the `hexo init` site creation process, so it is generally located in the `node_modules/hexo-theme-landscape` directory. If you install it via `git clone` or other methods, it might be located in the `themes/landscape` directory.

It is important to note that to prevent your modifications to the theme configuration file from being lost or overwritten during theme upgrades, **we do not recommend directly modifying this default configuration file**. You can copy the theme's `_config.yml` to your blog's root directory as `_config.landscape.yml` and configure it according to the documentation of configuration options therein (see [Alternate Theme Config](https://hexo.io/docs/configuration#Alternate-Theme-Config)).

The following will also detail the usage of some options.

## Features

### FancyBox

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

### Header links

You can add links to the header area with icons.

```yml
links:
  github: https://github.com/your_github_account
  twitter: https://twitter.com/your_twitter_account
  telegram: https://t.me/your_telegram_account
```

[Hexo]: https://hexo.io/
[Fancybox]: https://github.com/fancyapps/fancyBox
