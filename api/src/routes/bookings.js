import bookingsController from '../controllers/bookings';
import bookingsMiddleware from '../middleware/bookings';
import router from './router';

router.post('/bookings', bookingsMiddleware.create(), bookingsController.create.bind(bookingsController));

router.get('/bookings', bookingsMiddleware.getAll(), bookingsController.getAll.bind(bookingsController));

export default router;
