const helper = require('./users_test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const User = require('../models/user');

const api = supertest(app);

// COMMAND I USE TO RUN TESTS: jest --runInBand -t 'user test' --verbose --forceExit

// Please note that despite the fact that I used the proposed configuration, I couldn't
// make jest stop after tests. I kept getting warning: 'Jest did not exit one second after the test run has completed'
// That's why I had to start using '--forceExit'.

describe('Testing User Controllers', () => {

    // For debugging
    // test('user test fetching correct amount of users', async () => {
    //     const response = await User.find();

    //     // MANUALLY INCREMENT AFTER RUNNING TESTS (EVERY TEST ADD 1 ADDITIONAL)
    //     expect(response.length).toBe(4);
    // });

    describe('creating users', () => {
        test('user test not being able to create users => (fewer than 3 chars for password)', async () => {
            const newUser = new User({
                username: 'john',
                name: 'johhny doe',
                password: '12'
            });
    
            const response = await api.post('/api/users/signup').send(newUser);
    
            expect(JSON.parse(response.text).message).toBe('Password must be at least 3 characters long');
        });
    
        test('user test not being able to create users => (non unique username)', async () => {
            const newUser = new User({
                username: 'John',
                name: 'johhny doe',
                password: '123456'
            });
    
            const response = await api.post('/api/users/signup').send(newUser);
    
            expect(JSON.parse(response.text).message).toBe('Username already exists');
            expect(response.error.status).toBe(500);
        });

        test('user test not being able to create users => (fewer than 3 characters for username)', async () => {
            const newUser = new User({
                username: 'Bo',
                name: 'johhny doe',
                password: '123456'
            });
    
            const response = await api.post('/api/users/signup').send(newUser);
    
            expect(JSON.parse(response.text).message).toBe(`Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`);
            expect(response.error.status).toBe(500);
        });

        test('user test creating a user is successfull if certain conditions are met', async () => {

            // DONT FORGET TO CHANGE THIS AFTER TEST IF MORE TESTS ARE TO BE CONDUCTED
            const newUser = new User({
                username: 'Antonin',
                name: 'Antonin Dolohov',
                password: '123456'
            });
    
            const response = await api.post('/api/users/signup').send(newUser);
    
            expect(JSON.parse(response.text).message).toBe('User has been created');
            expect(response.status).toBe(200);
        });
    });

    describe('logging users in', () => {

        test('user test correct user credentials will result in success', async () => {
            const userCredentials = {
                username: 'John',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);

            expect(JSON.parse(response.status)).toBe(200);
        })

        test('user test incorrect user credentials will result in failure', async () => {
            const userCredentials = {
                username: 'John',
                password: '123123'
            }

            const response = await api.post('/api/users/login').send(userCredentials);

            expect(JSON.parse(response.text).message).toBe('Invalid username or password');
            expect(JSON.parse(response.status)).toBe(401);
        })
    });
});

afterAll(() => {
    mongoose.connection.close()
});