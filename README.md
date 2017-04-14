# Bamazon
An Amazon-like storefront node app incorporating MySQL

## Table of Contents

- [To Install](#to-install)
- [Dependencies](#dependencies)
- [Customer Mode](#customer-mode)
- [Manager Mode](#manager-mode)
- [Supervisor Mode](#supervisor-mode)

## To Install
* Git Clone the repository to your local machine
* Navigate to the folder where the repository in Terminal
* Run the command `npm install` to download the required dependencies
* Set up in MySQL Workbench using `bamazon-db.sql`
* Run desired mode using command `node bamazonCustomer.js`, `node bamazonManager.js` or `node bamazonSupervisor.js`

## Dependencies
npm packages
1. `cli-table` (Table layout in terminal)
1. `mysql` (Database connection)
1. `chalk`(Styling terminal)
1. `inquirer` (User prompt)

## Customer Mode
Customer wiil be able to see the list of products available in the store and place order. When customer select a product, app will show the price of that product and prompt user to enter the quantity. If store has not enough of the product to meet the customer's request app will show a message and customer can restart the shopping.

### Customer options.
![BamazonCustomer1](/Screenshots/BamazonCustomer1.png?raw=true)

### Customer shopping.
![BamazonCustomer2](/Screenshots/BamazonCustomer2.png?raw=true)

## Manager Mode
Manager can view all the products and their details, View low inventories (Product quantity less than 5), Add inventory and Add new products.

### Manager Options.
![BamazonManager1](/Screenshots/BamazonManager1.png?raw=true)

### View product for sales and Low inventories.
![BamazonCustomer2](/Screenshots/BamazonManager2.png?raw=true)

### Restocking product and adding a new product.
![BamazonCustomer3](/Screenshots/BamazonManager3.png?raw=true)

## Supervisor Mode
The supervisor can view a table of product sales by department or add a new department. 

### Supervisor Options.
![BamazonManager1](/Screenshots/BamazonManager1.png?raw=true)

### View product sales by department and Create new department.
![BamazonManager2](/Screenshots/BamazonManager2.png?raw=true)
