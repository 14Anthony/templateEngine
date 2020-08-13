const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//change const to let
// let addEE = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// array of questions for user
const questions = [
    {
        type: "input",
        name: "name",
        message: "Whats is your name",
    },

    {
        type: "input",
        name: "id",
        message: "Please enter your employee Id",
    },

    {
        type: "input",
        name: "email",
        message: "Please enter your email address",
    },

    {
        type: "list",
        name: "role",
        message: "Choose one 1 title for your Role",
        choices: ["Manager", "Engineer", "Intern", "Other"],
        filter: function (val) {
            return val.toLowerCase();
        },
    },

    {
        type: "input",
        name: "gitHub",
        message: "Please enter your GitHub username",
        when: function (answers) {
            console.log(answers.role);
            if (answers.role.includes("engineer")) {
                return true;
            }
        },
    },
    {

        type: "input",
        name: "school",
        message: "Please enter your school.",
        //inquirer docs.
        when: function (answers) {
            console.log(answers.role);
            if (answers.role.includes("intern")) {
                return true;
            }
        },
    },
    {

        type: "input",
        name: "extension",
        message: "Please enter your phone number extension",
        //inquirer docs.
        when: function (answers) {
            console.log(answers.role);
            if (answers.role.includes("manager")) {
                return true;
            }
        },

        //Git hub inquirer...travis...
        validate: function (value) {
            var pass = value.match(
                /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
            );
            if (pass) {
                return true;
            }
            return "Please enter a valid phone number";
        },
    },

    {
        type: "confirm",
        name: "addAnother",
        message: "Would you like to enter another team Member?"
    }
];


// function to initialize program
function init(addEE = []) {
    inquirer
        .prompt(questions)
        .then((answers) => {
            if (answers.role.includes("Manager")) {
                let manager = new Manager(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.extension,
                    answers.role
                );
                //console.log(manager);
                addEE.push(manager);
                console.log(addEE);
            }
            if (answers.role.includes("Engineer")) {
                let engineer = new Engineer(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.gitHub,
                    answers.role
                );
                //console.log(engineer);
                addEE.push(engineer);
            }
            if (answers.role.includes("Intern")) {
                let intern = new Intern(
                    answers.name,
                    answers.id,
                    answers.email,
                    answers.school,
                    answers.role
                );
                //console.log(intern);
                addEE.push(intern);

            }

            if (answers.addAnother) {
                init(addEE);
            } else {
                //render function

                console.log(addEE);
                fs.writeFileSync(outputPath, render(addEE) + "\n", function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Commit logged!");
                    }
                });
                //end the CLI and push the information to proper documents
            }
        })
        .catch((error) => {
            if (error.isTtyError) {
                // console.log("couldn't be rendered in the current environment");
            } else {
                // console.log("Something else when wrong");
            }
        });
}

// function call to initialize program
init();
// render(addEE);