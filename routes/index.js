import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = express.Router();

router.get('/status', (request, response) => {
  AppController.getStatus(request, response);
});

router.get('/stats', (request, response) => {
  AuthController.getConnect.getStats(request, response);
});

router.get('/disconnect', (request, response) => {
  AuthController.getDisconnect(request, response);
});

router.get('/users/me', (request, response) => {
  UserController.getMe(request, response);
});

router.get('/connect', (request, response) => {
  UsersController.getConnect(request, response);
});

router.post('/users', (request, response) => {
  UsersController.postNew(request, response);
});

export default router;
