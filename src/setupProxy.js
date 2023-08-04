const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api',{
      target: "http://localhost:8001",
      // target : "https://7a7huweena.execute-api.ap-northeast-2.amazonaws.com",
      changeOrigin: true,
    })
  );
};