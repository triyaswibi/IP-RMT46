const app = require('../../app.js');
const request = require('supertest');
const { sequelize } = require('../../models/index.js');
const { hashPassword } = require('../../helpers/bcrypt.js');
const { signToken } = require('../../helpers/jwt.js');
const { queryInterface } = sequelize

const category_data = {
    category: "Toyota",
}

const new_user_2 = {
    fullName: "abdul",
    email: "ninja2@mail.com",
    password: "ninja2",
    role: "Admin",
    phoneNumber: "318319838912",
    address: "cikarang"
}

let access_token;

beforeAll(async () => {
    await queryInterface.bulkInsert('Categories', [{
        category: category_data.category,
        createdAt: new Date(),
        updatedAt: new Date(),
    }])

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
    await queryInterface.bulkDelete('Categories', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })

    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})

describe("GET /category", () => {
    describe("Succes", () => {
        test("should return status 200 when read category", async () => {
            let { status, body } = await request(app)
                .get("/category")
                .set('Authorization', `Bearer ${access_token}`)

            expect(status).toBe(200);
            expect(body[0]).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("category", category_data.category);
        })
    })

    describe("Failed", () => {
        test("should return status 401 when user not login", async () => {
            let { status, body } = await request(app)
                .get("/category")
                .send(category_data)

            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 401 when user invalid access token", async () => {
            let { status, body } = await request(app)
                .get("/category")
                .set('Authorization', `Bearer ${"tokeninvalid"}`)
                .send(category_data)

            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })
    })
})