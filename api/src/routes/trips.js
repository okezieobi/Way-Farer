import tripController from '../controllers/trips';
import tripMiddleware from '../middleware/trips';
import router from './router';

router.post('/trips', tripMiddleware.create(), tripController.create.bind(tripController));

export default router;
