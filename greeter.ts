class Student {
  fullName: string;
  constructor(
    public firstName: string, //use of public on arguments to the constructor is a shorthand that allows us to automatically create properties with that name.
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  middleInitial: string;
  lastName: string;
}

const greeter = (person: Person) => {
  return "Hello, " + person.firstName + " " + person.lastName;
};

let user = new Student("Jane", "M.", "Pao");

document.body.textContent = greeter(user);
