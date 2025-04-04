const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogs[0]);
  };
  

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    const authorCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1;
        return acc;
    }, {});

    const mostBlogsAuthor = Object.keys(authorCount).reduce((a, b) =>
        authorCount[a] > authorCount[b] ? a : b
    );

    return {
        author: mostBlogsAuthor,
        blogs: authorCount[mostBlogsAuthor]
    };
};

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null;
    const authorLikes = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
    }, {});
    const mostLikesAuthor = Object.keys(authorLikes).reduce((a, b) =>
        authorLikes[a] > authorLikes[b] ? a : b
    );
    return {
        author: mostLikesAuthor,
        likes: authorLikes[mostLikesAuthor]
    }
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}

