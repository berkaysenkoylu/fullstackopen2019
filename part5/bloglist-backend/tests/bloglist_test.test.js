// Part 4(b)

const helper = require('./test_helper');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const Blog = require('../models/blog');

const api = supertest(app);

// COMMAND I USE TO RUN TESTS: jest --runInBand -t 'bloglist test' --verbose --forceExit

// Please note that despite the fact that I used the proposed configuration, I couldn't
// make jest stop after tests. I kept getting warning: 'Jest did not exit one second after the test run has completed'
// That's why I had to start using '--forceExit'.

// CLEAN BEFORE TESTS
beforeEach(async () => {
    await Blog.deleteMany();

    for(let blogPost of helper.initialBlogPosts) {
        let newPost = new Blog({
            title: blogPost.title,
            author: blogPost.author,
            url: blogPost.url,
            likes: blogPost.likes,
            user: blogPost.user
        });
        
        await newPost.save();
    }

    initialBlogPosts = await Blog.find();
});

// Test for GET request's return type
describe('Fetching blog posts', () => {
    test('bloglist test blogs will be returned as json', async () => {
        await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
    });
    
    // Test if the app returns the correct amount of blog posts
    test('bloglist test blog post amount is correct', async () => {
        const response = await Blog.find();
        
        expect(response.length).toBe(helper.initialBlogPosts.length);
    
    });
    
    // Test if individual blog posts have unique id property
    test('bloglist test blog posts have unique id propery', async () => {
        const response = await Blog.find();
        // let counter = 0;
    
        // response.forEach(resp => {
        //     if(resp._id && resp._id !== undefined && resp._id !== null) {
        //         counter++;
        //     }
        // });
    
        // expect(counter).toBe(4);
    
        response.forEach(async (resp) => {
            await expect(resp._id).toBeDefined()
        });
    });

    describe('adding a new blog post', () => {
        // Test to verify POST request
        test('bloglist test a new and valid blog post can be added', async () => {

            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;

            const newBlogPost = new Blog({
                title: 'John Doe',
                author: 'John Test',
                url: 'test.com',
                likes: 0
            });
    
            await api.post('/api/blogs').set("Authorization", "Bearer " + token).send(newBlogPost);
    
            // Fetch the blogposts from db
            const bloglist = await Blog.find();
            expect(bloglist.length).toBe(helper.initialBlogPosts.length + 1);
        });
    
        // Test to verify if POST request lacks likes property, it defaults to 0
        test('bloglist test a new and valid blog post can be added even if likes propert is missing', async () => {
            
            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;

            const newBlogPost = new Blog({
                title: 'Johnny Doedoe',
                author: 'John Test',
                url: 'test.com'
            });
    
            await api.post('/api/blogs').set("Authorization", "Bearer " + token).send(newBlogPost);
    
            // Fetch the blogposts from db
            const bloglist = await Blog.find();
            expect(bloglist.length).toBe(helper.initialBlogPosts.length + 1);
        });
    
        // Test to verify if POST request lacks 'title' and 'url' property, it defaults to 0
        test('bloglist test if the title and url properties are missing from the request data, response is 400', async () => {
            
            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;

            const newBlogPost = new Blog({
                author: 'John Test',
                likes: 0
            });
    
            await api.post('/api/blogs').set("Authorization", "Bearer " + token).send(newBlogPost).expect(400);
        });
    });

    describe('deleting a post', () => {
        // Test if a user can delete a post of his/hers
        test('bloglist test delete a post with a given id', async () => {

            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;
            
            const reqId = initialBlogPosts[0]._id;
            
            await api.delete(`/api/blogs/${reqId}`).set("Authorization", "Bearer " + token).expect(200);
        });

        // Test if a post can be deleted, given the wrong id
        test('bloglist test don\'t delete a post with a wrong id', async () => {

            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;

            const reqId = "5daee5c91cab613588c7b090";
            await api.delete(`/api/blogs/${reqId}`).set("Authorization", "Bearer " + token).expect(404);
        });

        // Test if a user can delete someone else's post
        test('bloglist test user can\'t delete someone else\'s post', async () => {

            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;

            const reqId = initialBlogPosts[1]._id;;
            await api.delete(`/api/blogs/${reqId}`).set("Authorization", "Bearer " + token).expect(401);
        });
    });

    describe('updating a post', () => {

        test('bloglist test update a post with a given id', async () => {

            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;


            const reqId = initialBlogPosts[2]._id;

            const newBlogPost = new Blog({
                title: 'John Doe Edited',
                author: 'John Test Edited',
                url: 'test.com/edited',
                likes: 12
            });

            await api.put(`/api/blogs/${reqId}`).set("Authorization", "Bearer " + token).send(newBlogPost).expect(200);
        });

        test('bloglist test user cannot update someone else\'s post ', async () => {

            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;


            const reqId = initialBlogPosts[1]._id;

            const newBlogPost = new Blog({
                title: 'John Doe Edited',
                author: 'John Test Edited',
                url: 'test.com/edited',
                likes: 12
            });

            await api.put(`/api/blogs/${reqId}`).set("Authorization", "Bearer " + token).send(newBlogPost).expect(401);
        });

        test('bloglist test update a post with a wrong id', async () => {

            // LOGIN to get a token
            const userCredentials = {
                username: 'Frobella',
                password: '123456'
            }

            const response = await api.post('/api/users/login').send(userCredentials);
            const token = JSON.parse(response.text).token;

            const reqId = '5dac21446303f52c84dfa976';

            // Fetch the blog post first ???
            //const fetchedBlog = await api.get('/api/blogs/' + reqId);

            const newBlogPost = new Blog({
                title: 'John Doe Edited',
                author: 'John Test Edited',
                url: 'test.com/edited',
                likes: 12
            });

            await api.put(`/api/blogs/${reqId}`).set("Authorization", "Bearer " + token).send(newBlogPost).expect(404);
        });
    });
});

afterAll(() => {
    mongoose.connection.close()
});