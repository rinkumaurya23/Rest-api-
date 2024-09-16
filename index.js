const express = require('express');
const users = require('./MOCK_DATA.json');
const fs = require('fs');
const app = express();
const PORT = 8000;

// middlewear// 
app.use(express.urlencoded({ extended: false }));


// app.use((req, res, next) => {
//     fs.appendFile(
//         'log.txt', `${Date.now()}: ${req.method}: ${req.path}\n`,
//         (err, data) => {
//             next();

//         }
//     );
// })



// next is route call
// app.use((req, res, next) => {
//     console.log("hello from middlewear  1");
//     req.myUserName = 'Rinku Maurya';


//     // return res.json({ mgs: "Hello from middlewear 1" })

//     next();
// });
// app.use((req, res, next) => {
//     console.log("hello from middlewear  2");
//     // return res.json({ mgs: "Hello from middlewear 1" })
//     // return res.end('hey');
//     next();
// })
// db query
// creditcardnumber = 2323
///////////////////////////////////  /3

// Routes
app.get('/users', (req, res) => {
    const html = `
   <ul>
   ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
   </ul>
   `;
    res.send(html);

})


// REST API ------


app.get('/api/users', (req, res) => {
    // res.setHeader("myName", "Rinku Maurya");
    // console.log(req.headers)
    // console.log("I am in get route ", req.myUserName);
    res.setHeader("x-myName", "Rinku") // custom header 

    // always to add custom headers like X ;
    return res.json(users);
});

app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find(user => user.id === id)
        return res.json(user);

    })
    .patch((req, res) => {
        // edit user with id 
        return res.json({ status: "Pending" });
    })
    .delete((req, res) => {
        // delete user with id 
        return res.json({ status: "Pending" });
    });

app.post('/api/users', (req, res) => {
    // TODO: create new user
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
        return res.json({
            status: 'success ', id: users.length

        })

    })
    // console.log('Body', body)
})



app.listen(PORT, () => {
    console.log(`Server is started PORT : ${PORT}`)
})

