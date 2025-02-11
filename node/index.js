const express = require("express");
// import express from "express"
const pg = require("pg");
// import pg from 'pg'
const app = express();
const { Pool, Client } = pg;
const connectionString = "postgresql://postgres:123@localhost:5432/crudtest";
const client = new Client({
  connectionString,
});

client.connect().then(() => {
  console.log("conection avec db");
});
app.get("/get", async (req, res) => {
  const query = "SELECT * FROM admin;";
  const data = await client.query(query);
  res.json(data.rows);
});

app.post("/post", async (req, res) => {
  const { id, username } = req.body;
  const query = `
      INSERT INTO admin (username, password)
      VALUES ($1, $2)
      RETURNING *;`;
  const values = [id, username];
  const data = await client.query(query, values);
  res.json(data.rows);
});

app.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const username = req.body.username;
  const query = `
          UPDATE admin
          SET username = $1
          WHERE id = $2
          RETURNING *;`;
  const values = [username, id];
  const data = await client.query(query, values);
  res.json(data.rows);
  client.query(query, values).then((res) => {
    console.log("Updated Admin:", res.rows);
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM admin WHERE id = $1 RETURNING *;";
  const values = [id];
  const data = await client.query(query, values);
  res.json(data.rows);
  client.query(query, values).then((res) => {
    console.log("Deleted Admin:", res.rows);
  });
});

app.listen(5000, () => {
  console.log("app run in 5000");
});
