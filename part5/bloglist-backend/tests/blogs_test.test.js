const list_helper = require('../utils/list_helper');

const blogList = [
    {
        "_id": "5da990f9eae4e72fd406f1ca",
        "__v": 0
    },
    {
        "_id": "5da9924b03c46b30086355a8",
        "title": "Demo Title",
        "author": "John Doe",
        "url": "https://www.youtube.com/",
        "likes": 20,
        "__v": 0
    },
    {
        "_id": "5da9a45736f5f62024286834",
        "title": "Demo Title 2",
        "author": "John Allen",
        "url": "https://www.youtube.com/22",
        "likes": 18,
        "__v": 0
    },
    {
        "_id": "5da9a46136f5f62024286835",
        "title": "Demo Title 3",
        "author": "John Doe",
        "url": "https://www.youtube.com/33",
        "likes": 22,
        "__v": 0
    },
    {
        "_id": "5da9a46136f5f62024286835",
        "title": "Demo Title 3",
        "author": "Johnny Hopkins",
        "url": "https://www.youtube.com/33",
        "likes": 28,
        "__v": 0
    },
    {
        "_id": "5da9a46136f5f62024286835",
        "title": "Demo Title 3",
        "author": "Catherina MacMalicious",
        "url": "https://www.youtube.com/33",
        "likes": 28,
        "__v": 0
    },
    {
        "_id": "5da9a46136f5f62024286835",
        "title": "Demo Title 3",
        "url": "https://www.youtube.com/33",
        "likes": 28,
        "__v": 0
    }
]; 

test('dummy returns one', () => {
    const blogs = [];

    const result = list_helper.dummy(blogs);

    expect(result).toBe(1)
});

describe('total number of likes', () => {

    test('when list has two blog entries and only one has likes attribute', () => {
        const result = list_helper.totalLikes(blogList);

        expect(result).toBe(116);
    })
});

describe('most favorite blog entry', () => {

    test('finds the blog entry with most likes out of a blog list', () => {
        const result = list_helper.favoriteBlog(blogList);

        const expectedResult = {
            "_id": "5da9a46136f5f62024286835",
            "title": "Demo Title 3",
            "author": "Johnny Hopkins",
            "url": "https://www.youtube.com/33",
            "likes": 28,
            "__v": 0
        };

        expect(result).toStrictEqual(expectedResult);
    });
});

describe('Author with the most blog count', () => {

    test('finds the blog author with the most blog count', () => {
        const result = list_helper.authorWithMostBlogs(blogList);

        const expectedResult = {
            author: "John Doe",
            blogs: 2
        };

        expect(result).toStrictEqual(expectedResult);
    });
});

describe('Author with the most blog count', () => {

    test('finds the blog author with the most likes', () => {
        const result = list_helper.mostLikes(blogList);

        const expectedResult = {
            author: "Johnny Hopkins",
            likes: 28
        };

        expect(result).toStrictEqual(expectedResult);
    });
});