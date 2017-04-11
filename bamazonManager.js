var inquirer = require("inquirer");
var chalk = require("chalk");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

var managerPrompt = [
    {
        type: "list",
        name: "managerChoices",
        message: "Select an action.",
        choices: ["View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",]
    }
];

var queryAll = "SELECT * FROM products;"
var queryLowInventory = "SELECT * FROM products WHERE stock_quantity < 5;"
var queryDept = "SELECT DISTINCT department_name FROM departments";

// connecting to "bamazon" database and prompt manager choices
connection.connect(function(err) {
    if (err) throw err;
    console.log(chalk.bold.magenta("******* BAMAZON Manager *******"));
    managerChoice();
});

var managerChoice = function(){
    inquirer.prompt(managerPrompt).then(function(answer){
        switch(answer.managerChoices){
            case("View Products for Sale"):
                viewProducts(queryAll);
                break;
            case("View Low Inventory"):
                viewProducts(queryLowInventory);
                break;
            case("Add to Inventory"):
                addInventory();
                break;
            case("Add New Product"):
                addProduct();
                break;
        }
    });
};

var viewProducts = function(query){
    connection.query(query, function(err,res){
        for (var i = 0; i < res.length; i++) {
            console.log("Product id: " + chalk.blue(res[i].item_id)
                + " Name: " + chalk.blue(res[i].product_name)
                + " Dept name:  " + chalk.blue(res[i].department_name)
                + " Price:  $" + chalk.blue(res[i].price)
                + " Quantity:  " + chalk.blue(res[i].stock_quantity));
        }
        if(res.length === 0){
            console.log(chalk.green("No records"));
        }
        nextTask();        
    });
};

var addInventory = function(){
    connection.query(queryAll, function(err,res){
        inquirer.prompt({
            type: "list",
            name: "productList",
            message: "Which product would you like to restock?",
            choices: function(data){
                var productArray = [];
                for (var i = 0; i < res.length; i++) {
                    productArray.push(res[i].product_name);
                }
                return productArray;
            }
        }).then(function(product){
            for(var i=0; i<res.length; i++){
                 if(res[i].product_name === product.productList){
                    var chosenProduct = res[i];
                    inquirer.prompt({
                        type: "input",
                        name: "restock",
                        message: "How much would you like to restock?",
                        validate: function(value) {
                            if (isNaN(value) === false && value !== 0 && value.length > 0) {
                                return true;
                            }
                            return false;
                        }
                    }).then(function(count){
                        connection.query("UPDATE products SET ? WHERE ?",[{
                            stock_quantity: chosenProduct.stock_quantity + parseInt(count.restock)
                        },{
                            item_id: chosenProduct.item_id
                        }],function(err,res){
                            if(err){
                                console.log("Error in updating database.");
                            }
                            console.log(chalk.green("Updated database.")
                                + parseInt(count.restock) + " " 
                                + chosenProduct.product_name + " added.");
                            nextTask();
                        });
                    });
               }
            }
        });
    });
};

var addProduct = function(){
    connection.query(queryDept, function(error,data){  
        inquirer.prompt([
            {
                type: "input",
                name: "productName",
                message: "Name of the product?",
                validate: function(value) {
                    if (value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "list",
                name: "deptName",
                message: "Department name?",
                choices: function(d){
                    var deptArray = [];      
                    for (var i = 0; i < data.length; i++) {
                        deptArray.push(data[i].department_name);
                    }
                    return deptArray;
                }
            },
            {
                type: "input",
                name: "productPrice",
                message: "Price of single unit?",
                validate: function(value) {
                    if (isNaN(value) === false && value !== 0 && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                name: "productQuantity",
                message: "Quantity?",
                validate: function(value) {
                    if (isNaN(value) === false && value !== 0 && value.length > 0) {
                        return true;
                    }
                    return false;
                }
            }

        ]).then(function(answer){
            connection.query("INSERT INTO products SET ?",[{
                product_name: answer.productName,
                department_name: answer.deptName,
                price: answer.productPrice,
                stock_quantity: answer.productQuantity
            }],function(err,res){
                if(err){
                    console.log("Error in inserting database.");
                }
                console.log(chalk.green("New product added to the database"));
                nextTask();
            });   
        });
    });
};

var nextTask = function(){
    inquirer.prompt({
        type: "list",
        name: "nextChoice",
        message: "What would you like to do?",
        choices: ["Manage products!","Quit"]
    }).then(function(answer){
        if(answer.nextChoice === "Quit"){
            console.log(chalk.bold.blue("******* Have a nice day *******"));
            connection.end(function(err) {});
        }else{
            managerChoice();
        }
    });
};