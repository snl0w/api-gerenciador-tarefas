import { randomUUID } from 'node:crypto';

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface TaskProps {
  title: string;
  description?: string | null;
  status: TaskStatus;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(props: TaskProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      status: props.status ?? 'PENDING',
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public get title() {
    return this.props.title;
  }

  public set title(title: string) {
    this.props.title = title;
  }

  public get description() {
    return this.props.description;
  }

  public set description(description: string | null | undefined) {
    this.props.description = description;
  }

  public get status() {
    return this.props.status;
  }

  public set status(status: TaskStatus) {
    this.props.status = status;
    this.touch();
  }

  public get userId() {
    return this.props.userId;
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
