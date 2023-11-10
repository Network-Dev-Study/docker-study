import BoardService from './BoardService';
import { RequestPost, ResponsePost } from './model/board';

const boardService = new BoardService();

describe('BoardService 테스트', () => {
  const responsePost: ResponsePost = {
    id: '1',
    title: '게시글입니다.',
    content: '반갑습니다.',
    author: '로사',
    creation_date: new Date().toLocaleDateString(),
    update_date: null,
  };

  describe('loadPosts()', () => {
    test('응답이 성공적이라면, 게시글 목록을 반환한다.', async () => {
      boardService.fnRest = jest.fn().mockResolvedValue([responsePost]);

      const data = await boardService.loadPosts();
      expect(data).toEqual([responsePost]);
    });
  });

  describe('loadPost()', () => {
    test('응답이 성공적이라면, 게시글을 반환한다.', async () => {
      boardService.fnRest = jest.fn().mockResolvedValue(responsePost);

      const data = await boardService.loadPost('1');
      expect(data).toEqual(responsePost);
    });
  });

  describe('savePost()', () => {
    test('응답이 성공적이라면, 저장된 게시글을 반환한다.', async () => {
      const newPost: RequestPost = {
        title: '새로운 게시글입니다.',
        content: '하이!',
      };
      const response = {
        ...responsePost,
        ...newPost,
      };

      boardService.fnRest = jest.fn().mockResolvedValue(response);

      const data = await boardService.savePost(newPost);
      expect(data).toEqual(response);
    });
  });

  describe('destroyPost()', () => {
    test('응답이 성공적이라면, 삭제된 게시글을 반환한다.', async () => {
      const postId = '1';

      boardService.fnRest = jest.fn().mockResolvedValue(responsePost);

      const data = await boardService.destroyPost(postId);
      expect(data).toEqual(responsePost);
    });
  });

  describe('updatePost()', () => {
    test('응답이 성공적이라면, 업데이트된 게시글을 반환한다.', async () => {
      const postId = '1';
      const requestPost: ResponsePost = {
        title: '업데이트된 게시글입니다.',
        content: '반가워요',
        id: '',
        author: '',
        creation_date: '',
        update_date: ''
      };
      const response = {
        ...responsePost,
        requestPost,
      };

      boardService.fnRest = jest.fn().mockResolvedValue(response);

      const data = await boardService.updatePost(postId, requestPost);
      expect(data).toEqual(response);
    });
  });
});
