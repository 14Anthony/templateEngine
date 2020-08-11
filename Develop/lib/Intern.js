// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Intern {
    constructor(name, id, email, github) {
        super(name, id, email, github);
        this.school = school;
        this.role = 'Intern'
    }
    get gitHub() {
        return this.school;
    }
}

module.exports = Intern;