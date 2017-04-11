var inquirer = require("inquirer");
var chalk = require("chalk");
var mysql = require("mysql");
var Table = require('cli-table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

var table = new Table({
    head: ['ID', 'department_name', 'over_head_costs', 'product_sales', 'total_profit'],
    colWidths: [5, 20, 20, 20, 20]
});

var supervisorPrompt = [
    {
        type: "list",
        name: "supervisorChoices",
        message: "Select an action.",
        choices: ["View Product Sales by Department",
        "Create New Department",
        "QUIT",]
    }
];

// connecting to "bamazon" database and prompt manager choices
connection.connect(function(err) {
    if (err) throw err;
    console.log(chalk.bold.magenta("******* BAMAZON Supervisor *******"));
    supervisorChoice();
});

var supervisorChoice = function(){
    inquirer.prompt(supervisorPrompt).then(function(answer){
        switch(answer.supervisorChoices){
            case("View Product Sales by Department"):
                viewProductsSale();
                break;
            case("Create New Department"):
                createDepartment();
                break;
            case("QUIT"):
                quit();
                break;
        }
    });
};

var viewProductsSale = function(){
    connection.query("SELECT * from departments",function(error, result){   
        for(var i=0; i<result.length; i++){            
            table.push(
                 [result[i].department_id, 
                 result[i].department_name,
                 result[i].over_head_costs,
                 result[i].total_sales,
                 result[i].total_sales - result[i].over_head_costs]
            );
        }
        console.log(table.toString());
        supervisorChoice();
    });
};

var createDepartment = function(){
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "Name of the department?"
        },
        {
            type: "input",
            name: "overHeadCosts",
            message: "Over head costs?"
        }
    ]).then(function(answer){
        connection.query("INSERT INTO departments SET ?",[{
            department_name: answer.departmentName,
            over_head_costs: answer.overHeadCosts
        }],function(err,res){
            if(err){
                console.log("Error in inserting database.");
            }
            console.log(chalk.green("New department added to the database"));
            supervisorChoice();
        });   
    });
};

var quit = function(){
    console.log(chalk.bold.blue("******* Have a nice day *******"));
    connection.end(function(err) {});
};