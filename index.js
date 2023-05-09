const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const Manager = require('./library/Manager');
const Engineer = require('./library/Engineer');
const Intern = require('./library/Intern');
const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'index.html');
const teamMembers = [];
const addToTeam = [];

console.log("\nWelcome to the employee creater!\nUse `npm run reset` to reset the dist/ folder\n");


const questions = () => {

    const createTeam = () => {
        inquirer.prompt([
            {
                type: "list",
                name: "teamMember",
                message: "What type of team member would you like to add?",
                choices: [
                    "Manager",
                    "Engineer",
                    "Intern",
                    "None"]
            },
        ])
            .then((response) => {
                switch (response.teamMember) {
                    case "Manager":
                        createManager();
                        break;
                    case "Engineer":
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break;
                    default:
                        buildTeam();
                }
            });
    }

    const createManager = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "managersName",
                message: "What is the manager's name?",
            },
            {
                type: "input",
                name: "managersId",
                message: "What is the manager's id?",
            },
            {
                type: "input",
                name: "managersEmail",
                message: "What is the manager's email?",
            },
            {
                type: "input",
                name: "managersOffice",
                message: "What is the manager's office number?",
            },
        ])
            .then((response) => {
                const manager = new Manager(
                    response.managerName,
                    response.managerId,
                    response.managerEmail,
                    response.managerOffNum
                );
                teamMembers.push(manager);
                addToTeam.push(response.managerId);
                createTeam();
            });
    }

    const createEngineer = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is the engineer's name?",
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is the engineer's id?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is the engineer's email?",
            },
            {
                type: "input",
                name: "engineerGitHub",
                message: "What is the engineer's GitHub username?",
            },
        ])
            .then((response) => {
                const engineer = new Engineer(
                    response.engineerName,
                    response.engineerId,
                    response.engineerEmail,
                    response.engineerGitHub
                );
                teamMembers.push(engineer);
                addToTeam.push(response.engineerId);
                createTeam();
            });
    }

    const createIntern = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is the intern's name?",
            },
            {
                type: "input",
                name: "internId",
                message: "What is the intern's id?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is the intern's email?",
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is the intern's school name?",
            },
        ])
            .then((response) => {
                const intern = new Intern(
                    response.internName,
                    response.internId,
                    response.internEmail,
                    response.internSchool
                );
                teamMembers.push(intern);
                addToTeam.push(response.internId);
                createTeam();
            });
    }

    const buildTeam = () => {
        if (!fs.existsSync(DIST_DIR)) {
            fs.mkdirSync(DIST_DIR);
        }
        fs.writeFileSync(distPath, renderTeam(teamMembers), "utf-8");
    };

    createTeam();

};

questions();