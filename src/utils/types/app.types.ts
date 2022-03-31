export type Routes = {
  path: string;
  element: React.ReactElement;
  authed?: boolean;
}[];

export enum Languages {
  JAVASCRIPT = 'javascript',
  JAVA = 'java',
  C = 'c',
}

export type User = {
  id: number;
  name: string;
  email: string;
  company: string;
  password?: string;
  editor: {
    position: { x?: number; y?: number };
    color: string;
    // selection: { start: number; end: number };
  };
};

export type Message = {
  text: string;
  user: { name: string; id: number };
  date: string;
  type: string;
};
