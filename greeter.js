var Student = /** @class */ (function () {
    function Student(firstName, //use of public on arguments to the constructor is a shorthand that allows us to automatically create properties with that name.
    middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeter(person) {
    return ("Hello, " + person.firstName + " " + person.middleInitial + person.lastName);
}
var user = new Student("Jane", "M.", "Pao");
document.body.textContent = greeter(user);
