const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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
        message: "Choose a title for your project",
        choices: ["Manager", "Engineer", "Intern", "Other"],
        filter: function (val) {
            return val.toLowerCase();
        },
    },

    {
        type: "input",
        name: "GitHubPage",
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
        name: "School",
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

        //Git hub inquirer...
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
        name: "Complete",
        message: "Confirm your answers are all true to the best of your knowledge."
    }
];

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// render(questions);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// function to write README file
// function writeToFile(fileName, data) {
//     let readMe = `
//   # ${data.title}
//   ### Description
//   ${data.description}


//   ### Installation

//   ${data.installDetails}
//   ### Usage
//   ${data.usageInformation}

//   ### Contributing

//   ${data.contribution}
//   ### Tests

//   ${data.testInformation}

//   ## Author

//   Github Repository - [${data.username}](https://github.com/${data.username})
//   Email - ${data.email}

//   ## License

//   This project is licensed under the ${data.license}
//   `;

//     fs.writeFile(`${fileName}.md`, readMe, function (err) {
//         if (err) throw err;
//         console.log("File has been saved to your current project directory!");
//     });
// }

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            writeToFile("README", answers);
            // Use user feedback for... whatever!!
        })
        .catch((error) => {
            if (error.isTtyError) {
                console.log(error);
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        });
}

// function call to initialize program
init();