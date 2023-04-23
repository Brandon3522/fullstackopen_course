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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
