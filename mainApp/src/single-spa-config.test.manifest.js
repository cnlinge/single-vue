
import * as singleSpa from 'single-spa'; //导入single-spa
import axios from 'axios'

/*
* getManifest：远程加载manifest.json 文件，解析需要加载的js
* */
  // entrypoints 对象
  // {
  //   "app":{
  //     "chunks":[
  //       "chunk-vendors",
  //       "app"
  //     ],
  //     "assets":[
  //       "js/chunk-vendors.3810ea93.js",
  //       "js/chunk-vendors.3810ea93.js.map",
  //       "js/app.17e2f4be.js",
  //       "js/app.17e2f4be.js.map"
  //     ],
  // }
const getManifest = async (url, bundle) => {
  return new Promise((resolve) => {
    return axios.get(url).then(({data}) => { // 获取manifest文件
      const { entrypoints } = data;
      const assets = entrypoints[bundle].assets;
      const promises = [] // 根据manifest文件 的资源路径加载资源
      for (let i = 0; i < assets.length; i++) {
        promises.push(runScript('http://127.0.0.1:8887/child1App/dist/' + assets[i]))
      }
      return Promise.all(promises).then(() => {
        resolve()
      })
    }) 
  });
} 

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
      // if ('development' === process.env.NODE_ENV) {
      //   await runScript('http://localhost:8083/js/chunk-vendors.js');
      //   await runScript('http://localhost:8083/js/app.js')
      //   return window.singleVueChild1;
      // } else {
      //   await getManifest('http://127.0.0.1:8083/manifest.json', 'app')
        await getManifest('http://127.0.0.1:8887/child1App/dist/manifest.json', 'app')
        return window.singleVueChild1
      // }
    },
    location => location.pathname.startsWith('/child1-app') // 配置微前端模块前缀
);
// 是对应的路由匹配的时候才加载 js文件
singleSpa.registerApplication( //注册微前端服务
  'singleVueChild2', 
  async () => {
    if ('development' === process.env.NODE_ENV) {
      await runScript('http://localhost:8084/js/chunk-vendors.js');
      await runScript('http://localhost:8084/js/app.js')
      return window.singleVueChild2;
    } else {
      await getManifest('http://127.0.0.1:8084/manifest.json', 'app')
      return window.singleVueChild2
    }
    // 加载bundle文件, 此处的singleVueChild2 是在webpack打包时设置的library名称
  },
  location => location.pathname.startsWith('/child2-app') // 配置微前端模块前缀
);
singleSpa.start(); // 启动
