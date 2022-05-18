class Car {
  drive() {
      throw new Error("Method not implemented.");
  }
  public make: string;
  public model: string;
  #year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.#year = year;
  }

  printPrivate = (): number => {
    return this.#year;
  };
}   
const c = new Car("Honda", "Accord", 2017);
console.log(c.printPrivate());
