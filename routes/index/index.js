const Router = require('koa-router');
const getUser = require('../../db/user');
const { faker } = require('@faker-js/faker');

const router = new Router();

let multipleUsersArray = [];

const timerId = setInterval(() => {
  multipleUsersArray = faker.helpers.multiple(getUser, {count: 2});

}, 5000);

// setTimeout(() => { clearInterval(timerId) }, 50000);




router.get('/messages/unread', async (ctx) => {
  ctx.response.set('Access-Control-Allow-Origin', '*');


  const response = {
    status: 'ok',
    timestamp: Date.now(),
    messages: multipleUsersArray,
  };

  ctx.response.body = JSON.stringify(response)

});

module.exports = router;


