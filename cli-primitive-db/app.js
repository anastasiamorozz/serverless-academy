import inquirer from 'inquirer';
import fs from 'fs';

function start(){
    inquirer
  .prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name? (Press ENTER to find user in the DB)'
    }
  ])
  .then((answer_name) => {
    const name = answer_name.name;
    if(name){
        inquirer
        .prompt({
            type: 'list',
            name: 'gender',
            choices: ['Male','Female'],
            message: `Hello ${name}, what's your gender?`
        })
        .then((answer_gender)=>{
            inquirer
            .prompt({
                type: 'input',
                name: 'age',
                message: `${name}, what's your age?`
            })
            .then((answer_age)=>{
                const user = {
                    name: answer_name.name,
                    gender: answer_gender.gender,
                    age: answer_age.age
                }

                let data = [];
                try {
                    data = JSON.parse(fs.readFileSync('db.txt'));
                } catch (error) {
                }

                data.push(user);

                fs.writeFile('db.txt', JSON.stringify(data, null, 2), (err) => {
                    if (err) {
                        console.error('Error:', err);
                    } else {
                        start();
                    }
                });

            })
            .catch((error) => {
                if (error.isTtyError) {
                  // Prompt couldn't be rendered in the current environment
                } else {
                  // Something else went wrong
                }
            })
        })
        .catch((error) => {
            if (error.isTtyError) {
              // Prompt couldn't be rendered in the current environment
            } else {
              // Something else went wrong
            }
        })

    }
    else{
        inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'findUser',
                message: 'Do you want to find a user in the database?',
                default: true
            }
        ])
        .then((answer_find) => {
            if (answer_find.findUser) {
                inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'searchName',
                        message: 'Enter the name of the user:'
                    }
                ])
                .then((answer_search) => {
                    const searchName = answer_search.searchName.trim();
            
                    try {
                        const data = JSON.parse(fs.readFileSync('db.txt'));
            
                        const foundUser = data.find(user => user.name.toLowerCase() === searchName.toLowerCase());
            
                        if (foundUser) {
                            console.log('User found:');
                            console.log(foundUser);
                        } else {
                            console.log('User not found.');
                        }
                        start();
                    } catch (error) {
                        console.error('Error reading db.txt:', error);
                    }
                })
                .catch((error) => {
                    console.error('Something went wrong:', error);
                    start();
                });
            } else {
                console.log('Exit');
            }
        });
    }
    })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
}

start();