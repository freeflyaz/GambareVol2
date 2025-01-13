// Import required dependencies from Prisma and Express
import { PrismaClient, Prisma } from '@prisma/client';
import express from 'express';

// Initialize Prisma client for database operations
const prisma = new PrismaClient();

/**
 * Creates a new todo item
 * @param req Express request object containing title and optional details in the body
 * @param res Express response object
 * @returns void with appropriate status code and message
 */
async function addTodo(req: express.Request, res: express.Response) {
  const { title, details } = req.body;
  try {
    let newTodo;
    if (!title || title.trim() === '') {
      res.status(400).send({ msg: 'the title cannot be an empty string' });
      return;
    }
    if (title && details) {
      newTodo = await prisma.todo.create({
        data: { title, details },
      });
    } else {
      newTodo = await prisma.todo.create({
        data: { title },
      });
    }
    if (newTodo) {
      res.status(200).send({ msg: 'new todo successfully created', data: newTodo });
    } else {
      res.status(400).send({ msg: 'user error in createTodo' });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send({ msg: 'Todo not found' });
      return;
    }
    res.status(500).send({ msg: 'server error in createTodo' });
  }
}

/**
 * Retrieves all todo items from the database
 * @param _ Express request object (unused)
 * @param res Express response object
 * @returns void with status code and either todos array or error message
 */
async function getAllTodos(_: express.Request, res: express.Response) {
  try {
    const allTodos = await prisma.todo.findMany();
    if (allTodos) {
      res.status(200).send({ msg: 'all todos successfully fetched' });
    } else {
      res.status(400).send({ msg: 'user error in getAllTodos' });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send({ msg: 'Todo not found' });
      return;
    }
    res.status(500).send({ msg: 'server error in getAllTodos' });
  }
}

/**
 * Retrieves a single todo item by its ID
 * @param req Express request object containing todo ID in params
 * @param res Express response object
 * @returns void with status code and either todo item or error message
 */
async function getTodo(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const converted = Number(id);
  try {
    if (Number.isNaN(converted)) {
      res.status(400).send({ msg: 'the id must be a number' });
      return;
    }
    const theTodo = await prisma.todo.findUnique({ where: { id: converted } });
    if (theTodo) {
      res
        .status(200)
        .send({ msg: `the todo with title: '${theTodo.title}' was successfully fetched` });
      return;
    } else {
      res.status(400).send({ msg: 'user error in getTodo' });
      return;
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send({ msg: 'Todo not found' });
      return;
    }
    res.status(500).send({ msg: 'server error in getTodo' });
  }
}

/**
 * Deletes a specific todo item by its ID
 * @param req Express request object containing todo ID in params
 * @param res Express response object
 * @returns void with status code and success/error message
 */
async function deleteTodo(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const converted = Number(id);
  try {
    if (Number.isNaN(converted)) {
      res.status(400).send({ msg: 'the id must be a number' });
      return;
    }
    const deleted = await prisma.todo.delete({ where: { id: converted } });
    if (deleted) res.status(200).send({ msg: 'successfully deleted a todo' });
    else res.status(400).send({ msg: 'incorrect todo id' });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send({ msg: 'Todo not found' });
      return;
    }
    res.status(500).send({ msg: 'server error in deleteTodo' });
  }
}

/**
 * Deletes all todo items from the database
 * @param _ Express request object (unused)
 * @param res Express response object
 * @returns void with status code and success/error message
 */
async function deleteAllTodos(_: express.Request, res: express.Response) {
  try {
    const allTodos = await prisma.todo.deleteMany();
    if (allTodos) {
      res.status(200).send({ msg: 'all todos successfully deleted' });
    } else {
      res.status(400).send({ msg: 'user error in deleteAllTodos' });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send({ msg: 'Todo not found' });
      return;
    }
    res.status(500).send({ msg: 'server error in deleteAllTodos' });
  }
}

/**
 * Updates the title of a specific todo item
 * @param req Express request object containing todo ID in params and new title in body
 * @param res Express response object
 * @returns Promise<void> with status code and success/error message
 */
async function updateTitleTodo(req: express.Request, res: express.Response): Promise<void> {
  const { id } = req.params;
  const { title } = req.body;
  const converted = Number(id);
  try {
    if (!id) {
      res.status(400).send({ msg: 'the todo id is incorrect' });
      return;
    }
    if (Number.isNaN(converted)) {
      res.status(400).send({ msg: 'The todo ID must be a number' });
      return;
    }
    if (!title || title.trim() === '') {
      res.status(400).send({ msg: 'the title cannot be an empty string' });
      return;
    }
    const updated = await prisma.todo.update({ where: { id: converted }, data: { title } });
    res
      .status(200)
      .send({ msg: `title of todo with an id:${converted} updated to: "${updated.title}"` });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send({ msg: 'Todo not found' });
      return;
    }
    res.status(500).send({ msg: 'server error in updateTitleTodo' });
  }
}

/**
 * Updates the details of a specific todo item
 * @param req Express request object containing todo ID in params and new details in body
 * @param res Express response object
 * @returns Promise<void> with status code and success/error message
 */
async function updateDetailsTodo(req: express.Request, res: express.Response): Promise<void> {
  const { id } = req.params;
  const { details } = req.body;
  const converted = Number(id);
  try {
    if (!id) {
      res.status(400).send({ msg: 'the todo id is incorrect' });
      return;
    }
    if (Number.isNaN(converted)) {
      res.status(400).send({ msg: 'The todo ID must be a number' });
      return;
    }
    if (!details || details.trim() === '') {
      res.status(400).send({ msg: 'the details cannot be an empty string' });
      return;
    }
    const updated = await prisma.todo.update({ where: { id: converted }, data: { details } });
    res
      .status(200)
      .send({ msg: `title of todo with an id:${converted} updated to: "${updated.details}"` });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(404).send({ msg: 'Todo not found' });
      return;
    }
    res.status(500).send({ msg: 'server error in updateDetailsTodo' });
  }
}

// Export all controller functions
export default {
  addTodo,
  getAllTodos,
  getTodo,
  deleteTodo,
  deleteAllTodos,
  updateTitleTodo,
  updateDetailsTodo,
};
