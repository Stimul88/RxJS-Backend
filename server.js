const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body').default;
const { faker } = require('@faker-js/faker');


const app = new Koa();

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));


function  getUser() {
  return {
    id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: `Hello from ${faker.person.firstName()} ${( faker.person.lastName() || '')}`,
    body: faker.lorem.text(),
    received: Date.now(),
  }
}


let multipleUsersArray = [];

const timerId = setInterval(() => {
  multipleUsersArray = faker.helpers.multiple(getUser, {count: 2});

}, 5000);

// setTimeout(() => { clearInterval(timerId) }, 50000);



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

app.use(async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');


  const response = {
    status: 'ok',
    timestamp: Date.now(),
    messages: multipleUsersArray,
  };

  ctx.response.body = JSON.stringify(response)

});


//TODO: write code here


const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

server.listen(port);