// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager {
    constructor(name, id, email,) {
        super(name, id, email, extension);
        this.extension = extension;
        this.role = 'Manager'
    }
    get gitHub() {
        return this.extension;
    }
}

module.exports = Manager;



