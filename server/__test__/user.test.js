const app = require('../app.js');
const request = require('supertest');
const { sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt.js');
const { signToken } = require('../helpers/jwt.js');
const { queryInterface } = sequelize

const new_user = {
    fullName: "jelly serah",
    email: "jelly@mail.com",
    password: "jelly11",
    phoneNumber: "86585851841",
    address: "cikampek"
}

const new_user_2 = {
    fullName: "abdul",
    email: "ninja2@mail.com",
    password: "ninja2",
    role: "Admin",
    phoneNumber: "318319838912",
    address: "cikarang"
}

const new_user_3 = {
    fullName: "potter",
    email: "potter@mail.com",
    password: "potter12",
    phoneNumber: "085174571",
    address: "gondangdia"
}

let access_token;

describe("POST /login", () => {
    describe("Succes Login", () => {
        test("should return status 200 and object of access_token", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    email: new_user_2.email,
                    password: new_user_2.password
                })

            expect(status).toBe(200);
            expect(body).toHaveProperty("access_token", expect.any(String));
        })
    })

    describe("Failed Login", () => {
        test("should return status 400 when email is required", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    password: new_user_2.password
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "email is required");
        })

        test("should return status 400 when password is required", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    email: new_user_2.email
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "password is required");
        })

        test("should return status 400 when invalid email format", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    email: !new_user_2.email,
                    password: new_user_2.password
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "email is required");
        })

        test("should return status 400 when password not match", async () => {
            let { status, body } = await request(app)
                .post("/login")
                .send({
                    email: new_user_2.email,
                    password: !new_user_2.password
                })
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "password is required");
        })
    })
})

describe("POST /register", () => {
    describe("Succes Register", () => {
        test("should return status 201 and object of new user", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .set("Authorization", "Bearer " + access_token)
                .send(new_user)

            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("fullName", new_user.fullName);
            expect(body).toHaveProperty("email", new_user.email);
            expect(body).toHaveProperty("phoneNumber", new_user.phoneNumber);
            expect(body).toHaveProperty("address", new_user.address);
        })
    })

    describe("Failed Register", () => {
        test("should return status 400 when email is required", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .set("Authorization", "Bearer " + access_token)
                .send({
                    fullName: new_user.fullName,
                    password: new_user.password,
                    phoneNumber: new_user.phoneNumber,
                    address: new_user.address,
                })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "email is required");
        })

        test("should return status 400 when password is required", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .set("Authorization", "Bearer " + access_token)
                .send({
                    fullName: new_user.fullName,
                    email: new_user.email,
                    phoneNumber: new_user.phoneNumber,
                    address: new_user.address,
                })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "password is required");
        })

        test("should return status 400 when email is not empty string", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .set("Authorization", "Bearer " + access_token)
                .send({
                    fullName: new_user.fullName,
                    email: "",
                    password: new_user.password,
                    phoneNumber: new_user.phoneNumber,
                    address: new_user.address,
                })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "email is required");
        })

        test("should return status 400 when password is not empty string", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .set("Authorization", "Bearer " + access_token)
                .send({
                    fullName: new_user.fullName,
                    email: new_user.email,
                    password: "",
                    phoneNumber: new_user.phoneNumber,
                    address: new_user.address,
                })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "password is required");
        })

        test("should return status 400 when email is already registered", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .set("Authorization", "Bearer " + access_token)
                .send({
                    fullName: new_user_3.fullName,
                    email: new_user_2.email,
                    password: new_user.password,
                    phoneNumber: new_user.phoneNumber,
                    address: new_user.address,
                })

            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "email must be unique");
        })

        test("should return status 400 when not acces_token", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .send(new_user)
      
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 400 when random acces_token", async () => {
            let { status, body } = await request(app)
                .post("/register")
                .set("Authorization", "Bearer " + "randomtoken")
                .send(new_user)
      
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })
    })
})

beforeAll(async () => {
    await queryInterface.bulkInsert('Users', [{
        fullName:new_user_2.fullName,
        email:new_user_2.email,
        password: hashPassword(new_user_2.password),
        role:new_user_2.role,
        phoneNumber:new_user_2.phoneNumber,
        address:new_user_2.address,
        createdAt: new Date(),
        updatedAt: new Date(),
    }])

    access_token = signToken({ id: 1 });
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
      })
})