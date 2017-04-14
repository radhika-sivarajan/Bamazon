# Bamazon
An Amazon-like storefront node app incorporating MySQL

## Table of Contents

- [To Install](#to-install)
- [Customer Mode](#customer-mode)
- [Manager Mode](#manager-mode)
- [Supervisor Mode](#supervisor-mode)
- [Dependencies](#dependencies)

## To Install
* Git Clone the repository to your local machine
* Navigate to the folder where the repository in Terminal
* Run the command `npm install` to download the required dependencies
* Set up in MySQL Workbench using `bamazon-db.sql`
* Run desired mode using command `node bamazonCustomer.js`, `node bamazonManager.js` or `node bamazonSupervisor.js`

## Dependencies
  npm packages
    : cli-table 
    : mysql
    : chalk
    : inquirer
## Customer Mode

### Customer options
![BamazonCustomer1](/Screenshots/BamazonCustomer1.png?raw=true)

### Customer shopping
![BamazonCustomer2](/Screenshots/BamazonCustomer2.png?raw=true)

## Manager Mode
### Manager Options
![BamazonManager1](/Screenshots/BamazonManager1.png?raw=true)

### View product for sales and Low inventories
![BamazonCustomer2](/Screenshots/BamazonManager2.png?raw=true)

### Restocking product and adding anew product
![BamazonCustomer3](/Screenshots/BamazonManager3.png?raw=true)

## Supervisor Mode
### Supervisor Options
![BamazonManager1](/Screenshots/BamazonManager1.png?raw=true)

### View product sales by department and Create new department
![BamazonCustomer2](/Screenshots/BamazonManager2.png?raw=true)
