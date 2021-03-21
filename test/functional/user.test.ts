describe('Beach forecast functional tests', () => {
    it('should return an user or maybe users.', async () => {
        const { body, status } = await global.testRequest.get('/users');
        expect(status).toBe(200);
        expect(body).toEqual([
            {
                name: 'Antonio',
                job_role: 'Python Badass',
                birthdate: '2018-03-29T13:34:00.000',
                admission_date: '2018-03-29T13:34:00.000',
            },
        ]);
    });
});
