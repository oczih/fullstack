const { test, after, beforeEach, describe, afterAll } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose');
const supertest = require('supertest')
const User = require('../models/user');
const app = require('../app');
const api = supertest(app);
const bcrypt = require('bcryptjs');
const helper = require('./test_helper')


const getInitialUsers = async () => {
    return [
      {
        username: "mrpassword",
        name: "Mr Password",
        passwordHash: await bcrypt.hash("passwordslol", 10),
      },
      {
        username: "mrsalasana",
        name: "Mr Salasana",
        passwordHash: await bcrypt.hash("passwordslol2312", 10),
      },
    ];
  };
beforeEach(async () => {
    await User.deleteMany({});
    const existingUsers = await getInitialUsers();
    await User.insertMany(existingUsers);
});

test('username is less than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
        username: 'ro',
        name: 'lolsda',
        password: 'salainen',
    }

    await api 
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/ )


    const usersAtEnd = await helper.usersInDb()
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
})


test('Too short password', async () => {
    const tooShortPW = {
        username: "arvzxc",
        name: "Arvo",
        password: "ok"
    }

    await api
      .post('/api/users/')
      .send(tooShortPW)
      .expect(400)
})
after(async () => {
  await mongoose.connection.close()
})
