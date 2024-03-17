const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body').default;

const router = require('./routes');

const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));



app.use(async (ctx, next) => {
  if(ctx.request.method !== 'OPTIONS') {
    await next();

    return;
  }

  ctx.response.set('Access-Control-Allow-Methods', 'DELETE, PUT, PATCH, GET, POST');
  ctx.response.set('Access-Control-Allow-Origin', '*');
  ctx.response.set('Access-Control-Request-Method', '*');
  ctx.response.set('Access-Control-Allow-Headers', '*');

  ctx.response.status = 204;

  await next();
})


//TODO: write code here

app.use(router());

const port = process.env.PORT || 8080;
const server = http.createServer(app.callback());

server.listen(port);


