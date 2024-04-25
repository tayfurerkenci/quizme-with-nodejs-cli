import inquirer from "inquirer";

const flags = [];

process.argv.forEach((arg) => {
    if(/^-/.test(arg)) {
        flags.push(arg.replaceAll('-', ''))
    }
});

const askQuestion = async () => {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?',
        },
        {
            type: 'input',
            name: 'live',
            message: 'Where do you live?',
        }
    ]);

    console.log(answers);
}

if(flags.includes('a') || flags.includes('add')) {
    // addQuestion();
} else {
    askQuestion();
}