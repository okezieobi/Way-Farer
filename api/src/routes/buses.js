import busController from '../controllers/buses';
import busMiddleware from '../middleware/buses';
import router from './router';

router.post('/buses', busMiddleware.create(), busController.create.bind(busController));

export default router;
