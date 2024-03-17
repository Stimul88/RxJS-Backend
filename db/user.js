const { faker } = require('@faker-js/faker');

function  getUser() {
  return {
    id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: `Hello from ${faker.person.firstName()} ${( faker.person.lastName() || '')}`,
    body: faker.lorem.text(),
    received: Date.now(),
  }
}

module.exports = getUser

