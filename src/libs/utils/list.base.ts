import { ConflictException } from '../exceptions';

export abstract class BaseList<T> {
  private items: T[];

  constructor(items?: T[]) {
    this.items = items || [];
  }

  abstract compareItems(firstItem: T, secondItem: T): boolean;

  private isAlreadyAdded(item: T): boolean {
    if (this.items.filter((element: T) => this.compareItems(element, item)).length !== 0) {
      throw new ConflictException('Item already added');
    }

    return false;
  }

  public getItems(): T[] {
    return this.items;
  }

  public add(newItem: T): void {
    if (!this.isAlreadyAdded(newItem)) {
      this.items.push(newItem);
    }
  }

  public remove(item: T): void {
    this.items = this.items.filter((element: T) => !this.compareItems(element, item));
  }
}
