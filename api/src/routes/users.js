import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middleware/users';

router.post('/auth/signup', userMiddleware.signup(), userController.signUp.bind(userController));

router.post('/auth/signin', userMiddleware.signin(), userController.signIn.bind(userController));

export default router;
