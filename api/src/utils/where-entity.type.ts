import { BaseEntity, FindOptionsWhere, ObjectLiteral } from 'typeorm';

export type WhereEntity<Entity extends ObjectLiteral> =
  | FindOptionsWhere<Entity>
  | FindOptionsWhere<Entity>[];
