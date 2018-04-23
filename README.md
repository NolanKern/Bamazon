# Bamazon
Welcome to the wonderful World of BAMAZON. Bamazon is a node application which allows the user to manage an inventory of products just like Amazon.

In this application the user can act as a customer a manager or a regional manager to interact with a store front. 

bamazonCustomer.js
In this JS file the user acts as a customer. The customer is first presented with a selection of pregenerated products from a SQL database. The customer is then asked to enter which item number they wish to purchase and how many they wish to buy. 
If the quantity is greater than the number of the item in stock then they are told so. Otherwise the customer's order is subtracted from the stock of the item. 

bamazonManager.js
In this JS file the user is given the role of the manager of the store front. The user can see what items need to be restocked, add products, add more stock to each item and view the products for sale.