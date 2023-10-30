import BaseService from '../common/BaseService';
import { RequestPost, ResponsePost } from './model/board';

export default class BoardService extends BaseService {
  async loadPosts(): Promise<ResponsePost[]> {
    const method = 'GET';
    const url = '/board';
    const params = null;
    const body = null;

    try {
      return await this.fnRest(method, url, params, body);
    } catch (error) {
      throw error;
    }
  }

  async loadPost(id: string): Promise<ResponsePost> {
    const method = 'GET';
    const url = '/board/' + id;
    const params = null;
    const body = null;

    try {
      return await this.fnRest(method, url, params, body);
    } catch (error) {
      throw error;
    }
  }

  async savePost(post: RequestPost): Promise<ResponsePost> {
    const method = 'POST';
    const url = '/board';
    const params = null;
    const body = post;

    try {
      return await this.fnRest(method, url, params, body);
    } catch (error) {
      throw error;
    }
  }

  async destroyPost(id: string): Promise<ResponsePost> {
    const method = 'DELETE';
    const url = `/board/${id}`;
    const params = null;
    const body = null;

    try {
      return await this.fnRest(method, url, params, body);
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id: string, post: RequestPost): Promise<ResponsePost> {
    const method = 'PUT';
    const url = `/board/${id}`;
    const params = null;
    const body = post;

    try {
      return await this.fnRest(method, url, params, body);
    } catch (error) {
      throw error;
    }
  }
}
