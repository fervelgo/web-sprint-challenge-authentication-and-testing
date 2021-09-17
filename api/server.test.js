const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

afterAll(async () => {
  await db.destroy()
})

//Register endpoint tests
describe('[POST] api/auth/register', () => {
  test('responds with the new user', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Locuaz', password: 'Locua$1234' })
    expect(res.body).toMatchObject({username: 'Locuaz' })
  }, 600)
  test('responds with a 422 status on missing username', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: '' })
    expect(res.status).toBe(422)
  }, 600)
})

//Login endpoint tests

describe('[POST] api/auth/login', () => {
  test('responds with the welcome message on successful login', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Locuaz', password: 'Locua$1234' })
    expect(res.body).toMatchObject({message: "welcome, Locuaz!"})
  }, 600)
  test('responds with a 401 if unsuccessful', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: '', password: '' })
    expect(res.status).toBe(401)
  }, 600)
})

//Jokes endpoint tests

describe('[GET] api/jokes', () => {
  test('responds with the jokes object', async () => {
    const res = await request(server)
      .post('/api/jokes')
      .send({ username: 'Locuaz', password: 'Locua$1234' })
    expect(res.status).toBe(200)
  }, 600)
  // test('responds with a 401 if token invalid', async () => {
  //   const res = await request(server)
  //     .post('/api/jokes')
  //     .send({ username: '', password: '' })
  //     expect(res.status).toBe(200)
  // }, 600)
})