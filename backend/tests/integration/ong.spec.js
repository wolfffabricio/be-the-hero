const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Teste 23",
                email: "fabricionewn@hotmail.com",
                whatsapp: "51996191625",
                city: "Viamão",
                uf: "RS"  
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});