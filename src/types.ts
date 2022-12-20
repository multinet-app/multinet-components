import { TableRow } from 'multinet';

export interface Node extends TableRow {
  type: string;
  neighbors: string[];
  degreeCount: number;
  children?: Node[];
  parentPosition?: number;
  [propName: string]: unknown;
}

export interface Edge extends TableRow {
  _from: string;
  _to: string;
  [propName: string]: unknown;
}

export interface Network {
  nodes: Node[];
  edges: Edge[];
}

export interface LoadError {
  message: string;
  href: string;
}
