const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');

app.use(cors())



const connection = mysql.createConnection({
    host: 'localhost',       // Your MySQL server's hostname
    user: 'root',       // Your MySQL username
    password: 'admin@123',   // Your MySQL password
    database: 'ecommerce',   // Your MySQL database name
});

connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL:', error);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.post('/signup', (req, response) => {
    var username = req.body.email;
    var pswd = req.body.pswd;
    var fullname = req.body.fullname;
    let username1 = "'"+username+"'";
    let pswd1 = "'"+pswd+"'";
    let fullname1 = "'"+fullname+"'";


    let cmnd = "Insert into user(username, password, fullname) values("+username1+", "+pswd1+", "+fullname1+");"
    console.log(cmnd);
    connection.query(cmnd, (err, res)=>{
        if(err){
            console.log(err);
            response.send({message: "Username already exists please try another one"});
        }
        else{
             console.log("1 record inserted");
             response.send({message: 'Successfully Registered', username:username, fullname:fullname});
        }
    });
  });
  
  app.post('/login', (req, response) => {
    var username = req.body.email;
    var pswd = req.body.pswd;
    let username1 = "'"+username+"'";
    let pswd1 = "'"+pswd+"'";

    let cmnd = "Select * from user where username="+username1+";"
    connection.query(cmnd, (err, res, field)=>{
        try {

        let result = null;
        result = JSON.stringify(res[0].password);
        let fullname = res[0].fullname;
        if(result===JSON.stringify(pswd)){
            console.log("User now logged in");
            response.send({message: 'Logged in Successfully', username:username, fullname:fullname});
        }
        else{
            console.log(result);
            console.log(pswd);
            response.send({message:'Incorrect password'});
        }
            
        } catch (error) {
            response.send({message: 'Invalid Username'})
        }
    })
  });

  app.post('/updateuser', (req, response)=>{
    let username = req.body.user;
    let username1 = "'"+username+"'";
    let email = req.body.email;
    let email1 = "'"+email+"'";
    let phone_number = req.body.phone_number;
    let delivery_address = req.body.delivery_address;
    let delivery_address1 = "'"+delivery_address+"'";
    console.log(username);
    
    let qry = "Update user set email_address="+email1+", phone_no="+phone_number+", delivery_address="+delivery_address1+" where username="+username+";";

    connection.query(qry, (err, res)=>{
        if(err){
            response.send({message: "Updation failed"});
            console.log(err)
        }
        else{
            response.send({message: 'Updated Successfully'});
        }
    })
    console.log(username)
  })



  app.post('/addtocart', (req, response)=>{
    let user = req.body.user;
    let user1 = "'"+user+"'";
    let img = req.body.img;
    let img1 = `"${img}"`;
    let title = req.body.title;
    let title1 = `"${title}"`;
    let price = req.body.price;
    let message = "'Ordered'";
    let quanitity = 1;
    
    let qry = "Insert into cart(username, product_image, product_title, product_price, product_message, quanitity) values("+user1+", "+img1+", "+title1+", "+price+", "+message+", "+quanitity+");";

    connection.query(qry, (err, res)=>{
        if(err){
            console.log(err);
        }

        else{
            response.send({message:'Successfully Inserted Into the cart'});
            console.log("inserted successfully");
        }
    })
  })


  app.post('/fetch', (req, response)=>{
    let user = req.body.user;
    let user1 = "'"+user+"'";
    console.log('being fetched');

    let qry = "Select * from cart where username="+user1+";";
    connection.query(qry, (err, res)=>{
        if(err){
            console.log(err);
        }
        else{
            response.send({array:res})
        }
        
    })
  })


  app.post('/handleplus', (req, response)=>{
    let qty = ++req.body.counter_new;
    console.log(qty);
    let title = req.body.prod_title;
    let title1 = '"'+title+'"';
    let qry = "Update cart set quanitity="+qty+" where product_title="+title1+";";
    connection.query(qry, (err, res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('being added');
            response.send({message:'Added', qty:qty});
        }
    })
  })

  app.post('/handleminus', (req, response)=>{
    let qty = --req.body.counter_new;
    console.log(qty);
    let title = req.body.prod_title;
    let title1 = "'"+title+"'";
    let qry = "Update cart set quanitity="+qty+" where product_title="+title1+";";
    connection.query(qry, (err, res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('being remoed');
            response.send({message:'Removed', qty:qty});
        }
    })
  })



  app.post('/handleRemove', (req, response)=>{
    let username = req.body.user;
    let username1 = `'${username}'`;
    let prod_title = req.body.prod_title;
    let prod_title1 = `"${prod_title}"`;
    
    let qry = "Delete from cart where username='"+username+"' and product_title="+prod_title1+";";
    connection.query(qry, (err, res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Deleted from the cart")
            response.send({message: 'Deleted from the cart'});
        }
    })
  })

  app.post('/buy', (req, response)=>{
    // let user = req.body.user;
    // let user1 = "'"+user+"'";
    // let price = req.body.price1;

    // let qry = "Insert into orders(username, product_price) values("+user1+", "+price+");";

    // connection.query(qry, (err, res)=>{
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log("Successfully Inserted into orders");
    //         response.send({message: 'Order has been placed'})
    //     }
    // })

    let prod_title = req.body.prod_title;
    let prod_title1 = `"${prod_title}"`;
    let qty = req.body.qty;
    let price = req.body.price;
    let user = req.body.user;
    let user1 = `"${user}"`;

    let qry = "Insert into orders(product_price, product_title, quantity, username, status) values("+price+", "+prod_title1+", "+qty+", "+user1+", 'confirmed');";
    connection.query(qry, (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("Inserted into orders")
            response.send({message:'Ordered Successfully'});
        }
    })
    console.log(qry);
})


app.post('/fetchuserinfo', (req, response)=>{
    let user = req.body.user;
    let user1 = `"${user}"`;
    let qry = "Select * from user where username="+user1+";"
    connection.query(qry, (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            response.send({array: result})
        }
    })
})


app.post('/fetchorders', (req, response)=>{
    let user = req.body.user;
    let user1 = `"${user}"`;
    let qry = "Select * from orders where username="+user1+";";
    connection.query(qry, (err, result)=>{
        if(err){
            console.log(err);
        }

        else{
            response.send({array: result});
        }
    })
})











app.listen(4000, ()=>{
    console.log("Server started on port 4000");
})



