import DefaultTheme from "vitepress/theme";
import Archives from "./components/Archives.vue";
import Tags from "./components/Tags.vue";
import MyLayout from "./components/MyLayout.vue";
import "./custom.scss";
import 'vitepress-theme-demoblock/dist/theme/styles/index.css'
import { useComponents } from './useComponents'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default {
  ...DefaultTheme,
  Layout: MyLayout,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.use(ElementPlus)
    const { app } = ctx;
    // register global components
    app.component("Archives", Archives);
    app.component("Tags", Tags);
    useComponents(app)
  },
};
