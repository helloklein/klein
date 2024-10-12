import{_ as s,c as n,o as a,a as l}from"./app.4feed8ca.js";const d=JSON.parse('{"title":"Vue中的动态类名（:class）、动态样式(:style)","description":"Vue中的动态类名（:class）、动态样式(:style)","frontmatter":{"title":"Vue中的动态类名（:class）、动态样式(:style)","description":"Vue中的动态类名（:class）、动态样式(:style)","aside":false,"date":"2023-01-15T00:00:00.000Z","tags":["vue"]},"headers":[{"level":2,"title":"动态类名（:class）的一些用法","slug":"动态类名-class-的一些用法","link":"#动态类名-class-的一些用法","children":[]},{"level":2,"title":"动态样式(:style)的一些用法","slug":"动态样式-style-的一些用法","link":"#动态样式-style-的一些用法","children":[]}],"relativePath":"posts/Vue中的动态类名以及动态样式.md"}'),e={name:"posts/Vue中的动态类名以及动态样式.md"},p=l(`<h2 id="动态类名-class-的一些用法" tabindex="-1">动态类名（:class）的一些用法 <a class="header-anchor" href="#动态类名-class-的一些用法" aria-hidden="true">#</a></h2><p>1、三元表达式判断</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">:class=&quot;address.length &gt; 0 ? &#39;city&#39; : &#39;city-gray&#39;&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">:class=&quot;{ &#39;is-active&#39;: form.avatar == i }&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">:class=&quot;[</span></span>
<span class="line"><span style="color:#A6ACCD;">      sizeClass ? &#39;el-warning--&#39; + sizeClass : &#39;&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      {</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;is-no-spacing&#39;: this.noSpacingClass,</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">:class=&quot;[flexLeft ? &#39;expand-left&#39; : &#39;expand-middle&#39;]&quot;</span></span>
<span class="line"></span></code></pre></div><p>2、单独组件中</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">HTML中</span></span>
<span class="line"><span style="color:#A6ACCD;">:class=&quot;[\`startTheme-\${themeConfig.label}\`]&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">Style中</span></span>
<span class="line"><span style="color:#A6ACCD;">.startTheme-green { color: green; }</span></span>
<span class="line"><span style="color:#A6ACCD;">.startTheme-red { color: red; }</span></span>
<span class="line"></span></code></pre></div><h2 id="动态样式-style-的一些用法" tabindex="-1">动态样式(:style)的一些用法 <a class="header-anchor" href="#动态样式-style-的一些用法" aria-hidden="true">#</a></h2><p>1、基础用法</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">:style=&quot;{</span></span>
<span class="line"><span style="color:#A6ACCD;">      width: itemWidth + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      height: itemHeight + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      left: left + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">      top: top + &#39;px&#39;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    }&quot;</span></span>
<span class="line"></span></code></pre></div><p>2、结合计算属性一起使用</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">:style=&quot;{</span></span>
<span class="line"><span style="color:#A6ACCD;">      opacity,</span></span>
<span class="line"><span style="color:#A6ACCD;">    }&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">computed: {</span></span>
<span class="line"><span style="color:#A6ACCD;">      opacity() {</span></span>
<span class="line"><span style="color:#A6ACCD;">          if (this.loading) return 0.69;</span></span>
<span class="line"><span style="color:#A6ACCD;">          return 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">      },</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"></span></code></pre></div><p>3、三元表达式</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">:style=&quot;{ &#39;padding-top&#39;: search ? &#39;44px&#39; : &#39;&#39; }&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">:style=&quot;$parent.value === id ? activeStyle : {}&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">computed: {</span></span>
<span class="line"><span style="color:#A6ACCD;">    activeStyle() {</span></span>
<span class="line"><span style="color:#A6ACCD;">      return {</span></span>
<span class="line"><span style="color:#A6ACCD;">        color: this.$parent.activeColor,</span></span>
<span class="line"><span style="color:#A6ACCD;">      };</span></span>
<span class="line"><span style="color:#A6ACCD;">    },</span></span>
<span class="line"><span style="color:#A6ACCD;">},</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">:style=&quot;&#39;background: url(&#39; + require(\`./img/bgCheck_\${tabCheck === index ? 1 : 0}.png\`) +&#39;)no-repeat&#39;&quot;</span></span>
<span class="line"></span></code></pre></div><p>4、动态配置背景颜色、背景图片</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">&lt;div</span></span>
<span class="line"><span style="color:#A6ACCD;">      class=&quot;main__header&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      :style=&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;background: &#39; +</span></span>
<span class="line"><span style="color:#A6ACCD;">        \`\${themeConfig.themeColor}\` +</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39; url(&#39; +</span></span>
<span class="line"><span style="color:#A6ACCD;">        require(\`@/assets/themeCofing/\${themeConfig.label}/personalInfo/header_bg.png\`) +</span></span>
<span class="line"><span style="color:#A6ACCD;">        &#39;)no-repeat center / contain;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">      &quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">&gt;&lt;/div&gt;</span></span>
<span class="line"></span></code></pre></div>`,14),t=[p];function o(c,i,r,C,A,y){return a(),n("div",null,t)}const D=s(e,[["render",o]]);export{d as __pageData,D as default};
