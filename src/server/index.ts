import express from 'express';
import { api } from './api.js';
import session from "cookie-session"
// import { auth } from './auth.js'

const app = express()
app.use(
    session({ secret: process.env["SESSION_SECRET"] || "my secret" })
)
app.use(api);
// app.use(auth)

const frontendFiles = process.cwd() + "/dist";
app.use(express.static(frontendFiles));
app.get("/*", (_, res) => {
    res.sendFile(frontendFiles + "/index.html");
});
app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));