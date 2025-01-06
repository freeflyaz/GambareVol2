import express from "express";
const router = express.Router();
import Todo from "./controller/controller";
// auth && protected routes && paid reports
// gambare time planner - once weekly put through AI for compilation
// free-tier & purged every 24 hours
// lvl 1: create todo, update todo, show todos, show completed todos, clear all todos,
router.post("/addTodo", Todo.createTodo);
// lvl2: mark all todos as completed

export default router;