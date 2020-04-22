const puppeteer = require('puppeteer');
const { expect } = require('chai');
const _ = require('lodash');
const globalVariables = _.pick(global, ['browser', 'expect']);

// puppeteer配置
const options = {
  headless: false,
  timeout: 10000,
  executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'//找到chorme浏览器
};

// 启动浏览器
before (async function () {
  global.expect = expect;
  global.browser = await puppeteer.launch(options);
});

// 测试之后运行，主要是用来关闭测试打开的浏览器
after (function () {
  browser.close();

  global.browser = globalVariables.browser;
  global.expect = globalVariables.expect;
});