export interface ResponsePost {
  id: string;
  title: string;
  content: string;
  author: string;
  creation_date: string;
  update_date: string | null;
}

export interface RequestPost {
  title: string;
  content: string;
}
