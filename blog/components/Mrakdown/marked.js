import Tocify from './tocify.tsx'
import hljs from 'highlight.js'
import marked from 'marked'
import 'highlight.js/styles/monokai-sublime.css'

const tocify = new Tocify()

const renderer = new marked.Renderer();
renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

marked.setOptions({
renderer, //这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
gfm: true, //启动类似Github样式的Markdown,填写true或者false
pedantic: false, //只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
sanitize: false, //原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
tables: true, //支持Github形式的表格，必须打开gfm选项
breaks: false, //支持Github换行符，必须打开gfm选项，填写true或者false
smartLists: true, //优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
smartypants: false, //高亮显示规则 ，这里我们将使用highlight.js来完成
highlight: function (code) {
        return hljs.highlightAuto(code).value;
}
});
export {
    tocify,
    marked
}