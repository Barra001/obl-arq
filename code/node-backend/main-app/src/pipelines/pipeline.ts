export class Pipeline<T> {
  filters: ((element: T) => Promise<T> | T)[];
  constructor(filters = [] as ((element: T) => Promise<T> | T)[]) {
    this.filters = filters;
  }
  use(filter: (element: T) => Promise<T> | T): void {
    this.filters.push(filter);
  }
  async run(input: T): Promise<T> {
    for (const aFilter of this.filters) {
      input = await aFilter(input);
    }
    return input;
  }
}
