const { test, describe } = require('node:test')
const assert = require('node:assert')
const average = require('../utils/for_testing').average
const listHelper = require('../utils/list_helper')
const { url } = require('node:inspector')
const favoriteBlog = require('../utils/for_testing').favoriteBlog
const mostBlogs = require('../utils/for_testing').mostBlogs
const totalLikes = require('../utils/for_testing').totalLikes

describe('average', () => {
  test('of one value is the value itself', () => {
    assert.strictEqual(average([1]), 1)
  })

  test('of many is calculated right', () => {
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
  })

  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
})
describe('favoriteBlog', () => {
  const listWithThreeBlogs = [
      {
          _id: '5a422a851b54a676234d17f7',
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
          __v: 0
      },
      {
          _id: '5a422b891b54a656234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
      },
      {
          _id: '5a422b891b54a656234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
      }
  ];

  test('of empty array is null', () => {
      assert.strictEqual(listHelper.favoriteBlog([]), null);
  });

  test('of one blog is that blog', () => {
      assert.deepStrictEqual(listHelper.favoriteBlog([listWithThreeBlogs[0]]), listWithThreeBlogs[0]);
  });

  test('of many is calculated right', () => {
      assert.deepStrictEqual(listHelper.favoriteBlog(listWithThreeBlogs), listWithThreeBlogs[2]);
  });
});

describe('mostBlogs', () => {
  const listWithThreeBlogs = [
      {
          _id: '5a422a851b54a676234d17f7',
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
          __v: 0
      },
      {
          _id: '5a422b891b54a656234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
      },
      {
          _id: '5a422b891b54a656234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
      }
  ];

  test('returns the right author with most blogs', () => {
      const expected = {
          author: 'Edsger W. Dijkstra',
          blogs: 2
      };
      assert.deepStrictEqual(listHelper.mostBlogs(listWithThreeBlogs), expected);
  });
});

describe('mostLikes', () => {
  const listWithThreeBlogs = [
      {
          _id: '5a422a851b54a676234d17f7',
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
          __v: 0
      },
      {
          _id: '5a422b891b54a656234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
      },
      {
          _id: '5a422b891b54a656234d17f9',
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
          __v: 0
      }
  ];

  test('returns the right author with most likes', () => {
      const expected = {
          author: 'Edsger W. Dijkstra',
          likes: 17
      };
      assert.deepStrictEqual(listHelper.mostLikes(listWithThreeBlogs), expected);
  });
});