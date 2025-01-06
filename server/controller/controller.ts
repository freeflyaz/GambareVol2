import { PrismaClient } from '@prisma/client';
import express from 'express';
const prisma = new PrismaClient()

async function addTodo(req: express.Request, res: express.Response) {
  const {title, details } = req.body;
  try {
    let newTodo;
    if (title && details) {
      newTodo = await prisma.todo.create({
       data : { title, details }
     })
    } else {
      newTodo = await prisma.todo.create({
        data: { title }
      })
    }
    if (newTodo) {
      res.status(200).send({msg: "new todo successfully created"})
    } else {
      res.status(400).send({ msg: "user error in createTodo"})
    }
  } catch (error) {
    console.log("error in createTodo", error);
    res.status(500).send({ msg: "server error in createTodo"})
  }
}
async function getAllTodos (_: express.Request, res: express.Response) {
  try {
    const allTodos = await prisma.todo.findMany();
    if (allTodos) {
      res.status(200).send({msg: "all todos successfully fetched"})
    } else {
      res.status(400).send({ msg: "user error in getAllTodos"})
    }
  } catch (error) {
    console.log("error in getAllTodos", error);
    res.status(500).send({ msg: "server error in getAllTodos"})
  }
}
async function getTodo (req: express.Request, res: express.Response) {
  const {id} = req.params;
  const converted = Number(id);
  try {
    const theTodo = await prisma.todo.findUnique({where: {id: converted}});
    if (theTodo) {
      res.status(200).send({msg: `the todo with title: '${theTodo.title}' was successfully fetched`});
    } else {
      res.status(400).send({ msg: "user error in getTodo"});
    }
  } catch (error) {
    console.log("error in getTodo", error);
    res.status(500).send({ msg: "server error in getTodo"});
  }
}
async function deleteTodo (req: express.Request, res: express.Response) {
  const {id} = req.params;
  const converted = Number(id);
  try {
    if (id) {
      const deleted = await prisma.todo.delete({ where: {id: converted} });
      if (deleted) res.status(200).send({msg: "successfully deleted a todo"});
      else res.status(400).send({msg: "incorrect todo id"});
    } else {
      res.status(400).send({msg: "incorrect todo id"});
    }

  } catch (error) {
    console.log("server error in deleteTodo", error);
    res.status(500).send({ msg: "server error in deleteTodo"});
  }
}

export default {
  addTodo,
  getAllTodos,
  getTodo,
  deleteTodo
}