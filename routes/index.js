import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

const router = express.Router();

router.get('/status', (request, response) => {
  AppController.getStatus(request, response);
});

router.get('/stats', (request, response) => {
  AppController.getStats(request, response);
});

router.get('/disconnect', (request, response) => {
  AuthController.getDisconnect(request, response);
});

router.get('/users/me', (request, response) => {
  UsersController.getMe(request, response);
});

router.get('/connect', (request, response) => {
  AuthController.getConnect(request, response);
});

router.post('/users', (request, response) => {
  UsersController.postNew(request, response);
});

router.post('/files', (request, response) => {
  FilesController.postUpload(request, response);
});

router.get('/files', (request, response) => {
  FilesController.getIndex(request, response);
});

router.get('/files/:id', (request, response) => {
  FilesController.getShow(request, response);
});

export default router;
