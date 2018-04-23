var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Solhtar1aa",
  database: "bamazon"
});

function Manager(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "\nChoose what you would like to do",
                name: "choice",
                choices: ["View Products for Sale","View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ]).then(function(answers){
        var choice = answers.choice;

        switch(choice) {
            case "View Products for Sale":
                readProducts();
            break;


            case "View Low Inventory":
                lowInventory();
            break;

            case "Add to Inventory":
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "What item would you like to add to?",
                            name: "item_change",
                        },
                        {
                            type: "input",
                            message: "How many would you like to add?",
                            name: "quantity_change"
                        }
                    ]).then(function(answers){
                        var item_change = answers.item_change;
                        var quantity_change = answers.item_change;
                        addInventory(item_change,quantity_change);
                    })
            break;


            case "Add New Product":
                addProduct();
            break;

            default:
                console.log("Something went horribly wrong!");
                
        }
        Manager();
    })
}

function readProducts() {
    console.log("Selecting all items...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (i = 0; i < res.length; i++) {
        console.log("----------------------------------");
        console.log("Item ID: " + res[i].item_id);
        console.log("Product Name: " + res[i].product_name);
        console.log("Price of product: $" + res[i].price);
        console.log("----------------------------------");
      }
    });
    connection.end();    
}

function lowInventory(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        var count =0;
        for (i = 0; i < res.length; i++) {
            if(parseInt(res[i].stock_quantity)<5){
                console.log("Product Name: "+res[i].product_name+ " Product ID: "+ res[i].stock_quantity + " has a low stock");
                count++;
            }
        }
        console.log(count + " at low quantity");
    });
    connection.end();
    Manager();
}

function addInventory(ITEM, NUMB){
    connection.query(
        "UPDATE products SET stock_quantity WHERE "+ITEM,
        [
            {
                stock_quantity: (stock_quantity+ NUMB)
            }
        ],
        function(err, res) {
          
          // Call deleteProduct AFTER the UPDATE completes
          connection.end();
        }
    );
    Manager();
}

function addProduct(){
    inquirer
        .prompt([
        {
            name: "item",
            message: "Please enter the item name"
        },
        {
            name: "price",
            message: "Please enter the item price in $"
        },
        {
            name: "department",
            message: "Please enter the department it belongs in"
        }
        ])
        .then(function(res) {
        connection.query(
            "INSERT INTO products SET ?",
            {
            product_name: res.item,
            price: parseInt(res.price),
            department_name: res.department,
            // Ask here
            item_id: asad
            },
            function(err, res) {
            console.log(res.affectedRows + " product posted for auction!\n");
            readProducts();
            }
        );
        });
}

Manager();