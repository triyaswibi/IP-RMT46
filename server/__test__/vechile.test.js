const app = require('../app.js');
const request = require('supertest');
const { sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt.js');
const { signToken, verifyToken } = require('../helpers/jwt.js');
const { queryInterface } = sequelize
const fs = require('fs');
const path = require('path');
const filePath = path.resolve(__dirname, "../data/Car_modified.jpg");
const image = fs.createReadStream(filePath);

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

const category_data = {
    category: "Toyota",
}

const vechile_data = {
    name: "Toyota Fortuner",
    description: "SUV yang kokoh dan kuat, cocok untuk petualangan di jalanan dan medan off-road.",
    imgUrl: "https://img.freepik.com/premium-photo/urban-chic-stylish-image-featuring-gray-toyota-fortuner-amidst-clean-white-background_1086226-1027.jpg",
    price: 400000000,
    categoryId: 1,
    authorId: 4
}

const updateVechileData = {
    name: "Toyota Innova",
    description: "Updated title and description",
    imgUrl: "https://img.freepik.com/premium-photo/urban-chic-stylish-image-featuring-gray-toyota-fortuner-amidst-clean-white-background_1086226-1027.jpg",
    price: 400000000,
    categoryId: 1,
    authorId: 4
}

let access_token;
let access_token_2;

beforeAll(async () => {
    const data_admin = [{
        id: 1,
        username:new_user_2.username,
        email:new_user_2.email,
        password: hashPassword(new_user_2.password),
        role:"admin",
        phoneNumber:new_user_2.phoneNumber,
        address:new_user_2.address,
        createdAt: new Date(),
        updatedAt: new Date(),
    }]
    
    const data_staff = [{
        id: 2,
        username:new_user.username,
        email:new_user.email,
        password: hashPassword(new_user.password),
        role:"Staff",
        phoneNumber:new_user.phoneNumber,
        address:new_user.address,
        createdAt: new Date(),
        updatedAt: new Date(),
    }]

    await queryInterface.bulkInsert('Users', data_admin, {})
    await queryInterface.bulkInsert('Users', data_staff, {})

    access_token = signToken({ id: 1 });
    access_token_2 = signToken({ id: 2 });

    await queryInterface.bulkInsert('Categories', [{
        category: category_data.category,
        createdAt: new Date(),
        updatedAt: new Date(),
    }])

    await queryInterface.bulkInsert('Vechiles', [{
        name: vechile_data.name,
        description: vechile_data.description,
        imgUrl: vechile_data.imgUrl,
        price : vechile_data.price,
        categoryId: vechile_data.companyId,
        authorId: vechile_data.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
    }])
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

    await queryInterface.bulkDelete('Vechiles', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    })
})

describe("POST /vechile", () => {
    describe("Succes", () => {
        test("should return status 201 when read vechiles", async () => {
            let { status, body } = await request(app)
                .post("/vechile")
                .set('Authorization', `Bearer ${access_token}`)
                .send(vechile_data)

            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", vechile_data.name);
            expect(body).toHaveProperty("description", vechile_data.description);
            expect(body).toHaveProperty("imgUrl", vechile_data.imgUrl);
            expect(body).toHaveProperty("price", vechile_data.price);
            expect(body).toHaveProperty("categoryId", vechile_data.categoryId);
            expect(body).toHaveProperty("authorId", vechile_data.authorId);
        })
    })

    describe("Failed", () => {
        test("should return status 401 when  when user not login", async () => {
            let { status, body } = await request(app)
                .post("/vechile")
                .send(vechile_data)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 401 when user invalid access token", async () => {
            let { status, body } = await request(app)
                .post("/vechile")
                .set('Authorization', `Bearer ${"invalidtoken"}`)
                .send(vechile_data)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 400 when user invalid access token", async () => {
            let { status, body } = await request(app)
                .post("/vechile")
                .set('Authorization', `Bearer ${access_token}`)
                .send({name: "Indomie"})
                
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "description is required");
        })
    })
})

describe("GET /vechile", () => {
    describe("Succes", () => {
        test("should return status 200 when read vechile", async () => {
            let { status, body } = await request(app)
                .get("/vechile")
                .set('Authorization', `Bearer ${access_token}`)

            expect(status).toBe(200);
            expect(body[0]).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", vechile_data.name);
            expect(body).toHaveProperty("description", vechile_data.description);
            expect(body).toHaveProperty("imgUrl", vechile_data.imgUrl);
            expect(body).toHaveProperty("price", vechile_data.price);
            expect(body).toHaveProperty("categoryId", vechile_data.categoryId);
            expect(body).toHaveProperty("authorId", vechile_data.authorId);
        })
    })

    describe("Failed", () => {
        test("should return status 401 when  when user not login", async () => {
            let { status, body } = await request(app)
                .get("/vechile")
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 401 when user invalid access token", async () => {
            let { status, body } = await request(app)
                .get("/vechile")
                .set('Authorization', `Bearer ${"invalidtoken"}`)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })
    })
})

describe("GET /vechile/:id", () => {
    describe("Succes", () => {
        test("should return status 200 when vechile data with specified id", async () => {
            let { status, body } = await request(app)
                .get("/vechile/1")
                .set('Authorization', `Bearer ${access_token}`)

            expect(status).toBe(200);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", vechile_data.name);
            expect(body).toHaveProperty("description", vechile_data.description);
            expect(body).toHaveProperty("imgUrl", vechile_data.imgUrl);
            expect(body).toHaveProperty("price", vechile_data.price);
            expect(body).toHaveProperty("categoryId", vechile_data.categoryId);
            expect(body).toHaveProperty("authorId", vechile_data.authorId);
        })
    })

    describe("Failed", () => {
        test("should return status 401 when  when user not login", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .get("/vechile/" + id)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 401 when user invalid access token", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .get("/vechile/" + id)
                .set('Authorization', `Bearer ${"invalidtoken"}`)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 404 when user input the specified id does not exist", async () => {
            const id = 88;
            let { status, body } = await request(app)
                .get("/vechile/" + id)
                .set('Authorization', `Bearer ${access_token}`)
                
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data not found");
        })
    })
})

describe("PUT /vechile/:id", () => {
    describe("Succes", () => {
        test("should return status 200 when updated vechile data", async () => {
            let { status, body } = await request(app)
                .put("/vechile/1")
                .set('Authorization', `Bearer ${access_token}`)
                .send(updateVechileData)

            expect(status).toBe(200);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("name", vechile_data.name);
            expect(body).toHaveProperty("description", vechile_data.description);
            expect(body).toHaveProperty("imgUrl", vechile_data.imgUrl);
            expect(body).toHaveProperty("price", vechile_data.price);
            expect(body).toHaveProperty("categoryId", vechile_data.categoryId);
            expect(body).toHaveProperty("authorId", vechile_data.authorId);
        })
    })

    describe("Failed", () => {
        test("should return status 401 when  when user not login", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .put("/vechile/" + id)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 401 when user invalid access token", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .put("/vechile/" + id)
                .set('Authorization', `Bearer ${"invalidtoken"}`)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 404 when user input the specified id does not exist", async () => {
            const id = 88;
            let { status, body } = await request(app)
                .put("/vechile/" + id)
                .set('Authorization', `Bearer ${access_token}`)
                
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data not found");
        })

        test("should return status 403 when user trying to input the specified id does not belong to", async () => {
            let { status, body } = await request(app)
                .put("/vechile/99")
                .set('Authorization', `Bearer ${access_token_2}`)
                
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", "Forbidden access");
        })
    })
})

describe("delete /vechile/:id", () => {
    describe("Succes", () => {
        test("should return status 200 and deleted vechile data", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .delete("/vechile/" + id)
                .set('Authorization', `Bearer ${access_token}`)

            expect(status).toBe(200);
            expect(body).toHaveProperty("msg" , "Vechile 1 deleted");
        })
    })

    describe("Failed", () => {
        test("should return status 401 when  when user not login", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .delete("/vechile/" + id)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 401 when user invalid access token", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .delete("/vechile/" + id)
                .set('Authorization', `Bearer ${"invalidtoken"}`)
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 404 when user input the specified id does not exist", async () => {
            const id = 88;
            let { status, body } = await request(app)
                .delete("/vechile/" + id)
                .set('Authorization', `Bearer ${access_token}`)
                
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data not found");
        })

        test("should return status 403 when user trying to input the specified id does not belong to", async () => {
            let { status, body } = await request(app)
                .delete("/vechile/3")
                .set('Authorization', `Bearer ${access_token_2}`)
                
                console.log(body)
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", "Forbidden access");
        })
    })
})

describe("PATCH /vechile/:id", () => {
    describe("Succes", () => {
        test("should return status 200 when updated vechile data", async () => {
            let { status, body } = await request(app)
                .patch("/vechile/"+ verifyToken(access_token).id +"/img_url")
                .set('Authorization', `Bearer ${access_token}`)
                .attach("imgUrl", image, "Car_modified.jpg")

            expect(status).toBe(200);
            expect(body).toHaveProperty("message" , `Image uploaded successfully`);
        }, 30000);
    })

    describe("Failed", () => {
        test("should return status 401 when  when user not login", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .patch("/vechile/" + id)
                .set('Authorization', `Bearer ${access_token}`)
                .attach("imgUrl", image, "Car_modified.jpg")
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 401 when user invalid access token", async () => {
            const id = 1;
            let { status, body } = await request(app)
                .patch("/vechile/" + id)
                .set('Authorization', `Bearer ${"invalidtoken"}`)
                .attach("imgUrl", image, "Car_modified.jpg")
                
            expect(status).toBe(401);
            expect(body).toHaveProperty("message", "Unauthenticated");
        })

        test("should return status 404 when user input the specified id does not exist", async () => {
            let { status, body } = await request(app)
                .patch("/vechile/88")
                .set('Authorization', `Bearer ${access_token}`)
                .attach("imgUrl", image, "Car_modified.jpg")
                
            expect(status).toBe(404);
            expect(body).toHaveProperty("message", "Data not found");
        })

        test("should return status 403 when user trying to input the specified id does not belong to", async () => {
            let { status, body } = await request(app)
                .patch("/vechile/3")
                .set('Authorization', `Bearer ${access_token_2}`)
                .attach("imgUrl", image, "Car_modified.jpg")
                
            expect(status).toBe(403);
            expect(body).toHaveProperty("message", "Forbidden access");
        })

        test("should return status 400 when user trying to input the specified id does not belong to", async () => {
            let { status, body } = await request(app)
                .patch("/vechile/3")
                .set('Authorization', `Bearer ${access_token_2}`)
                
            expect(status).toBe(400);
            expect(body).toHaveProperty("message", "Forbidden access");
        })
    })
})