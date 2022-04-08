require('dotenv').config();
require('./db.js') // import mongo db init 
const app = require('./app.js'); // instance of app with express
const productRouter = require('./controllers/products/routesProducts')
const categoryRouter = require('./controllers/category/routesCategories')
const userRouter = require('./controllers/users/routesUsers')
const authRouter = require('./controllers/login/authRoutes');
const reviewRouter= require('./controllers/review/routesReview')
// Routes exported here.
const paymentRouter = require('./controllers/payment/stripe')
const orderRouter = require('./controllers/payment/orders')
const { authenticateJWT } = require('./controllers/login/authFunctions')

const port = process.env.PORT || 3000;


app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/review', reviewRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/orders', authenticateJWT, orderRouter)


app.listen(port, ()=> console.log('Server on port ', port))









