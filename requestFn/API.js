const requestFn = require('../requestFn/myRequest');

const API = {
  category: '/cats/lv2/statistics' // 小说分类
};

const HTTP = {
  getCategory() {
    return requestFn.MyRequest({
      url: API.category,
      method: 'GET'
    })
  }
}

module.exports = HTTP;