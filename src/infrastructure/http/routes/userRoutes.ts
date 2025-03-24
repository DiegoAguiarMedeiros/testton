import express from "express";

const router = express.Router();

router.post("/users", (req, res) => console.log(req, res));

export { router };
