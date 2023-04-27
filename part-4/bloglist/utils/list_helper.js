const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (max, blog) => {
    return max.likes > blog.likes ? max : blog;
  };

  const favorite = blogs.reduce(reducer, 0);

  return blogs.length === 0 ? 0 : favorite;
};

// Find author with the most blogs,
// Return author and number of blogs
// Horribly inefficient !!!!!!!
const mostBlogs = (blogs) => {
  let maxAuthor = '';
  let numberOfBlogs = 0;
  let maxBlogs = 0;
  let currentAuthor = '';

  if (blogs.length === 0) {
    return 0;
  }

  for (const blog of blogs) {
    currentAuthor = blog.author;
    for (const blog of blogs) {
      if (currentAuthor === blog.author) {
        numberOfBlogs += 1;
      }
    }

    if (numberOfBlogs > maxBlogs) {
      maxBlogs = numberOfBlogs;
      maxAuthor = blog.author;
    }
    numberOfBlogs = 0;
  }

  for (const blog of blogs) {
    if (blog.author === maxAuthor) {
      numberOfBlogs += 1;
    }
  }

  const author = {
    author: maxAuthor,
    blogs: maxBlogs,
  };

  return author;
};

// Horribly inefficient !!!
// Find author with most likes,
// Return author and number of total likes
const mostLikes = (blogs) => {
  let numberOfLikes = 0;
  let maxLikes = 0;
  let maxAuthor = '';

  if (blogs.length === 0) {
    return 0;
  }

  for (const blog of blogs) {
    let currentAuthor = blog.author;
    for (const blog of blogs) {
      if (currentAuthor === blog.author) {
        numberOfLikes += blog.likes;
      }
    }

    if (numberOfLikes > maxLikes) {
      maxLikes = numberOfLikes;
      maxAuthor = blog.author;
    }
    numberOfLikes = 0;
  }

  const author = {
    author: maxAuthor,
    likes: maxLikes,
  };

  return author;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
