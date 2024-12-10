const express = require("express");
const bodyParser = require("body-parser");
const request =  require("request");
const https = require("https");
const { send } = require("process");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/signup.html")
})

app.post("/", (req, res) => {

    const fName = req.body.fName;
    const lName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }
    ]}

    const jsonData = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/d3981d098e";
    const option = {
        method: "POST",
        auth: "abdullah:3f7d866dbe6cc371628a16058786d871-us8"  
    };

    const request = https.request(url, option, (response) => {
        if (response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();

})

app.post("/failure", (req, res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, () => console.log("Server is runnig on port 3000"));


// 3f7d866dbe6cc371628a16058786d871-us8

// d3981d098e

// !9aVa4VgMnYCpQ$