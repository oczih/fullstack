const { test, after, beforeEach, describe, afterAll } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose');
const supertest = require('supertest')
const User = require('../models/user');
const app = require('../App');
const api = supertest(app);
const bcrypt = require('bcryptjs');

const saltRounds = 10;

beforeEach(async () => {
    await User.deleteMany({});

    const passW1 = await bcrypt.hash("naaais", saltRounds);
    const passW2 = await bcrypt.hash("kiiisujapaljon", saltRounds);

    const existingUsers = [
        {
            username: "jaakkojuhana",
            name: "Jaakko Roikka",
            passwordHash: passW1,
        },
        {
            username: "jaakkokaks",
            name: "Jaakko Kaks",
            passwordHash: passW2,
        }
    ];

    await User.insertMany(existingUsers);
});

test('Mongo users[] length equals existingUsers[] length', async () => {
    const usersFromMongo = await User.find({});
    assert.strictEqual(usersFromMongo.length, 2)
});
test('Too short username', async () => {
    const usersBefore = await User.find({});
    const newUser = {
        username: "ei",
        name: "Eino",
        password: "12345"

    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const usersAfter = await User.find({});
    assert.strictEqual(usersAfter.length, usersBefore.length)
})

test('Too short password', async () => {
    const tooShortPW = {
        username: "arvom",
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
