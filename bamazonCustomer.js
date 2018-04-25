var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

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
}
readProducts();

function customer(){
    inquirer.prompt([
        {
        message: "Which item would you like to buy?",
        type: "input",
        name: "productID",
        },
        {
        message: "How many would you like to purchase?",
        type: "input",
        name: "purchaseNum",
        }
    ]).then(function(answers){
        var productID = answers.productID;
        var purchaseNum = parseInt(answers.purchaseNum);
        purchase(productID,purchaseNum);

    })
    
}

function purchase(ID, NUM){
    var flag = false;
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(parseInt(res[0].stock_quantity));
        if(NUM>parseInt(res[ID-1].stock_quantity)){
            console.log("Sorry we don't have enough in stock!");
        }

        else{
            updateProduct(ID, NUM);
            console.log("Product Stock Updated");
            flag=true;
        }
    })
    if(flag){
        customer();
    }
}


function updateProduct(ID,NUM){
    connection.query(
        "UPDATE products SET stock_quantity WHERE "+ID,
        [
            {
                stock_quantity: (stock_quantity-NUM)
            }
        ],
        function(err, res) {
          connection.end();
        }
    )
}

customer();