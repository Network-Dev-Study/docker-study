import axios, { Method } from 'axios';
import { RequestPost, ResponsePost } from '../board/model/board';
import BaseService from './BaseService';

jest.mock('axios');
const baseService = new BaseService();

describe('BaseService 테스트', () => {
  describe('fnRest()', () => {
    test('응답이 성공인 경우 해당 데이터를 반환한다.', async () => {
      const method = 'POST';
      const url = '/board';
      const params = null;
      const requestBody: RequestPost = {
        title: '새로운 게시글입니다.',
        content: '안녕하세요~',
      };

      const newPost: ResponsePost = {
        id: '1',
        author: '로사',
        creation_date: new Date().toLocaleDateString(),
        update_date: null,
        ...requestBody,
      };
      const response = { data: newPost };

      (axios.request as jest.MockedFunction<typeof axios.get>).mockResolvedValue(response);

      const data = await baseService.fnRest(method, url, params, requestBody);
      expect(data).toEqual(newPost);
    });
  });

  describe('checkHttpMethod()', () => {
    test('GET에 대한 HTTP 메서드는 GET이다.', () => {
      const method: Method = 'GET';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('GET');
    });

    test('get에 대한 HTTP 메서드는 GET이다.', () => {
      const method: Method = 'get';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('GET');
    });

    test('POST에 대한 HTTP 메서드는 POST이다.', () => {
      const method: Method = 'POST';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('POST');
    });

    test('post에 대한 HTTP 메서드는 POST이다.', () => {
      const method: Method = 'post';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('POST');
    });

    test('PUT에 대한 HTTP 메서드는 PUT이다.', () => {
      const method: Method = 'PUT';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('PUT');
    });

    test('put에 대한 HTTP 메서드는 PUT이다.', () => {
      const method: Method = 'put';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('PUT');
    });

    test('DELETE에 대한 HTTP 메서드는 DELETE이다.', () => {
      const method: Method = 'DELETE';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('DELETE');
    });

    test('delete에 대한 HTTP 메서드는 DELETE이다.', () => {
      const method: Method = 'delete';
      const result = baseService.checkHttpMethod(method);
      expect(result).toBe('DELETE');
    });

    test('처리하지 않은 HTTP 메서드는 에러를 발생시킨다.', () => {
      const method = 'unknown';
      expect(() => baseService.checkHttpMethod(method)).toThrow();
    });
  });
});
