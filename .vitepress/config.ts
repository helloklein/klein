import { getPosts, getPostLength } from "./theme/serverUtils";
import { demoBlockPlugin } from 'vitepress-theme-demoblock'
import highlightjs from "markdown-it-highlightjs";
import { buildBlogRSS } from "./theme/rss";

async function config() {
  return {
    lang: "en-US",
    title: "klein",
    description: "Home of klein",
    // 配置折叠代码
    markdown: {
      config: (md) => {
      const { demoBlockPlugin } = require('vitepress-theme-demoblock')
      md.use(demoBlockPlugin)
      }
    },
    head: [
      [
        "link",
        {
          rel: "icon",
          // type: "image/svg",
          href: "/logo.jpg",
        },
      ],
      [
        "meta",
        {
          name: "author",
          content: "klein",
        },
      ],
      [
        "meta",
        {
          property: "og:title",
          content: "Home",
        },
      ],
      [
        "meta",
        {
          property: "og:description",
          content: "Home of klein",
        },
      ],
    ],
    
    // cleanUrls: "with-subfolders",
    lastUpdated: false,
    themeConfig: {
      // repo: "clark-cui/homeSite",
      logo: "/logo.jpg",
      docsDir: "/",
      // docsBranch: "master",
      posts: await getPosts(),
      pageSize: 5,
      postLength: await getPostLength(),
      nav: [
        {
          text: "🏡Blogs",
          link: "/",
        },
        {
          text: "🔖Tags",
          link: "/tags",
        },
        {
          text: "📃Archives",
          link: "/archives",
        },
        // {
        //   text: "🔥RSS",
        //   link: "https://clark-cui.top/feed.xml",
        // },
      ],
      markdown: {
        config: (md) => {
          md.use(highlightjs);
          md.use(demoBlockPlugin, {
            cssPreprocessor: 'scss'
        })
        },
        // 代码显示行数
        lineNumbers: true,
        theme: {
          light: 'vitesse-light',
          dark: 'vitesse-dark'
        },
      },
      socialLinks: [
        { icon: "github", link: "https://github.com/wuxiaozhu06" },
        // { icon: "twitter", link: "https://twitter.com/qingshuihe1" },
        // {
        //   icon: {
        //     svg: `<svg role="img" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="20">
        //     <path d="M874.666667 375.189333V746.666667a64 64 0 0 1-64 64H213.333333a64 64 0 0 1-64-64V375.189333l266.090667 225.6a149.333333 149.333333 0 0 0 193.152 0L874.666667 375.189333zM810.666667 213.333333a64.789333 64.789333 0 0 1 22.826666 4.181334 63.616 63.616 0 0 1 26.794667 19.413333 64.32 64.32 0 0 1 9.344 15.466667c2.773333 6.570667 4.48 13.696 4.906667 21.184L874.666667 277.333333v21.333334L553.536 572.586667a64 64 0 0 1-79.893333 2.538666l-3.178667-2.56L149.333333 298.666667v-21.333334a63.786667 63.786667 0 0 1 35.136-57.130666A63.872 63.872 0 0 1 213.333333 213.333333h597.333334z" ></path>
        //     </svg>`,
        //   },
        //   link: "mailto:rongchuancui@gmail.com",
        // },
      ],
    },
    buildEnd: buildBlogRSS,

  };
}
export default config();
