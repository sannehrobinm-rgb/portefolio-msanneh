/* //import express
const express = require('express')
//const app => express()
const app = express()
//definir le port utiisé.
const port = 3000


//route, une route
//req=>request
//res.send=>
app.get('/', (req, res) => {
  res.send('Hello World!')
})
//app => lis notre route
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */

  require('dotenv').config();

const express = require('express');
const { neon } = require('@neondatabase/serverless');

const app = express();
app.use(express.json());  //obligatoire pour utilisé post

const PORT = process.env.PORT || 4242;
const sql = neon(process.env.DATABASE_URL);


//get
app.get('/', async (_, res) => {
/*   const sql = neon(`${process.env.DATABASE_URL}`); */
  const response = await sql`SELECT * FROM playing_with_neon`;
 /*  const { version } = response[0]; */
  res.json(response) 
/*   { version }); */
});

//post
app.post('/players', async (req, res) => {


    const {name, value } = req.body;

    const response = await sql`
      INSERT INTO playing_with_neon (name, value)
      VALUES (${name}, ${value})
     RETURNING *
`;
    res.json(response);
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});