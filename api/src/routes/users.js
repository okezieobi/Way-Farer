import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middleware/users';

router.post('/auth/signup', userMiddleware.signupClients(), userController.signUp.bind(userController));

router.post('/auth/signin', userMiddleware.signinClients(), userController.signinClients.bind(userController));

export default router;
