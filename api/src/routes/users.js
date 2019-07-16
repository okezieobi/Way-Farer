import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middleware/users';

router.post('/auth/signup', userMiddleware.routeCallBacks('signUp'), userController.signUp.bind(userController));

router.post('/auth/signin', userMiddleware.routeCallBacks('signIn'), userController.signIn.bind(userController));

export default router;
