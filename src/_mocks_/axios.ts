const mockPosts = [
    {
      id: 1,
      userId: 1,
      title: 'Test Post 1',
      body: 'Test Body 1',
    },
  ];
  
  const mockComments = [
    {
      id: 1,
      postId: 1,
      name: 'Test User',
      email: 'test@example.com',
      body: 'Test Comment',
    },
  ];
  
  export default {
    get: jest.fn((url) => {
      if (url === 'https://jsonplaceholder.typicode.com/posts') {
        return Promise.resolve({ data: mockPosts });
      } else if (url.includes('/posts/1')) {
        return Promise.resolve({ data: mockPosts[0] });
      } else if (url.includes('/comments')) {
        return Promise.resolve({ data: mockComments });
      }
      return Promise.reject(new Error('Not found'));
    }),
  };