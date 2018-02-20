const koa = require('koa');
const serve = require('koa-static');

const app = new koa();
app.use(serve('.'));

app.listen(8080);