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

export default {
  addTodo
}