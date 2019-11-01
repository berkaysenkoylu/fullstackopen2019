exports.dummy = (blogs) => {
    return 1;
}

exports.totalLikes = (blogs) => {
    const likesArr = blogs.map(blog => {
        return checkObjectValidity(blog) ? blog.likes : 0;
    });

    const reducer = (sum, item) => {
        return sum + item
    }

    return likesArr.length === 0 ? 0 : likesArr.reduce(reducer, 0);
}

exports.favoriteBlog = (blogs) => {
    let maxLikes = 0;
    let favorite_blog = null;

    blogs.forEach((blog) => {
        if(checkObjectValidity(blog)) {
            if(blog.likes > maxLikes) {
                maxLikes = blog.likes;
                favorite_blog = blog;
            }
        }
    });

    return favorite_blog;
}

exports.authorWithMostBlogs = (blogs) => {
    let authorGlossary = {};
    let mostBlogs = { author: "", blogs: 0 }

    blogs.forEach(blog => {
        if(checkObjectValidity(blog)) {
            if(blog.author in authorGlossary){
                authorGlossary[blog.author] += 1;
            }
            else {
                authorGlossary[blog.author] = 1;
            }
        }
    });

    Object.keys(authorGlossary).forEach(author_ => {
        if(authorGlossary[author_] > mostBlogs.blogs) {
            mostBlogs.author = author_;
            mostBlogs.blogs = authorGlossary[author_];
        }
    })

    return mostBlogs;
}

exports.mostLikes = (blogs) => {
    let maxLikes = 0;
    let mostLikedAuthor = { author: "", likes: 0 };

    blogs.forEach((blog) => {
        if(checkObjectValidity(blog)) {
            if(blog.likes > maxLikes) {
                maxLikes = blog.likes;
                mostLikedAuthor.author = blog.author;
                mostLikedAuthor.likes = blog.likes;
            }
        }
    });

    return mostLikedAuthor;
}

const checkObjectValidity = (blog) => {
    return (blog.likes !== undefined && blog.likes) && (blog.author !== undefined && blog.author) && 
            (blog.url !== undefined && blog.url) && (blog.likes !== undefined && blog.likes);
}