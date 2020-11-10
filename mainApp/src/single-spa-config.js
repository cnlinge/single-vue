// single-spa-config.js
import * as singleSpa from 'single-spa'; //导入single-spa
// import axios from 'axios'

/*runScript：一个promise同步方法。可以代替创建一个script标签，然后加载服务*/
const runScript = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  });
};
singleSpa.registerApplication( //注册微前端服务
  'singleVueChild1', 
    async () => {
      await runScript('http://localhost:8083/js/chunk-vendors.js');
      await runScript('http://localhost:8083/js/app.js')
      return window.singleVueChild1;
    },
    location => location.pathname.startsWith('/child1-app') // 配置微前端模块前缀
);
// 是对应的路由匹配的时候才加载 js文件
singleSpa.registerApplication( //注册微前端服务
  'singleVueChild2', 
  async () => {
    await runScript('http://localhost:8084/js/chunk-vendors.js');
    await runScript('http://localhost:8084/js/app.js'); 
    return window.singleVueChild2; // 加载bundle文件, 此处的singleVueChild2 是在webpack打包时设置的library名称
  },
  location => location.pathname.startsWith('/child2-app') // 配置微前端模块前缀
);
singleSpa.start(); // 启动
