const Manager = require ("./lib/Manager");
const Engineer = require ("./lib/Engineer");
const Intern = require ("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require("./lib/pagehtml");

const teamMembers = [];

function newEmployee() {
    console.log("Build your team");
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employee',
            message: 'Which member would you like to add to your team?',
            choices: [
                'Manager',
                'Engineer',
                'Intern',
                'Done'
            ]
        }
    ])
    .then((answers) => {
        switch (answers.employee){
            case 'Manager':
                newManager();
                break;
            case 'Intern':
                newIntern();
                break;
            case 'Done':
                render(teamMembers);
                generateHtml();        
        }
    });
}

function newManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your manager's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your manager's email?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is your manager's office number?"
        },

    ])

    .then((answers) => {
        const manager = new Manager(
            answers.name,
            answers.id,
            answers.email,
            answers.officeNumber
        );
        teamMembers.push(manager);
        newEmployee();
    });
}

function newEngineer () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your eningeers name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your eningeers id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your eningeers email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is your eningeers Github?"
        }

    ])

    .then((answers) => {
        const eningeer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.github
        );
        teamMembers.push(engineer);
        newEmployee();
    });

}

function newIntern () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: "What is your interns name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is your interns id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your interns email?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What school did your intern go to?"
        }

    ])

    .then((answers) => {
        const eningeer = new Engineer(
            answers.name,
            answers.id,
            answers.email,
            answers.school
        );
        teamMembers.push(Intern);
        newEmployee();
    });

}

function generateHtml () {
    if (!fs.existsSync(DIST_DIR)) {
        fs.mkdirSync(DIST_DIR);
    }
    fs.writeFile(distPath, render(teamMembers), function (err) {
        if (err) throw err;
        console.log(
            'Your HTML has been generated!'
        );
    });
}

newEmployee ();