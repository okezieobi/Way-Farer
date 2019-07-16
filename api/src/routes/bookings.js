import bookingsController from '../controllers/bookings';
import bookingsMiddleware from '../middleware/bookings';
import router from './router';

router.post('/bookings', bookingsMiddleware.create(), bookingsController.create.bind(bookingsController));

export default router;
