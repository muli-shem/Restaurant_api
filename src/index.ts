import { serve } from '@hono/node-server'
import { Context, Hono } from 'hono'
import "dotenv/config"
import { logger } from 'hono/logger'
import {csrf} from 'hono/csrf'
import {trimTrailingSlash} from 'hono/trailing-slash'
import {timeout} from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'
import {prometheus} from '@hono/prometheus'
import {menuRouter} from './menu_item/menu_item.router'
import { driverRouter } from './driver/driver.router'
import { driverorderRouter } from './relations/driverRelatioships/driverRelatioships.router'
import { commentsRouter } from './comment/comment.router'
import { restaurantOwnerRouter } from './restaurant_owner/restaurant_owner.router'
import { stateRouter } from './state/state.router'
import { cityRouter } from './city/city.router'
import{usersRouter} from './users/users.router'
import { ordersRouter } from './orders/orders.router'
import { addressRouter } from './address/address.router'
import { order_menu_itemRouter } from './order_menu_item/order_menu_item.router'
import { orderStatusRouter } from './order_status/order_status.router'
import { status_catalogRouter } from './status_catalog/status_catalog.router'
import { categoryRouter } from './category/category.router'
import { restaurantRouter } from './restaurant/restaurant.router'
import { authRouter} from './auth/auth.router'




const app = new Hono();


const customTimeoutException = (c: Context)=>
  new HTTPException(408, {
    message: 'Request Timeout',
 
  })

  //promethuus
const {printMetrics, registerMetrics} =prometheus()

//inbuild mildware
app.use(logger()) //
app.use(csrf()) //This middleware protects against CSRF attacks such as submitting with a form element by comparing // the value of the Origin header with the requested URL                                 
app.use(trimTrailingSlash())// will remove the Trailing Slash
// app.use('/', timeout(10000, customTimeoutException))

//third party mildware
app.use('*',  registerMetrics)  
app.get('/', (c) => {
  return c.text('Hello Hono!')
})


//customTimeoutException

// app.get('/timeout', async(c) =>{
//   await new Promise((resolve)=> setTimeout(resolve, 12000))
//   return c.text("Data after 5 seconds",200)
// })
//registerMetrics
app.get('/metrics', printMetrics)

//custom routers
app.route('/api', stateRouter)
app.route('/api', cityRouter)
app.route('/api', restaurantRouter)
app.route('/api', usersRouter)
app.route('/api', addressRouter)
app.route('/api', status_catalogRouter)
app.route('/api', categoryRouter)
app.route('/api', status_catalogRouter)
app.route('/api', menuRouter)
app.route('/api', driverRouter)
app.route('/api', restaurantOwnerRouter)
app.route('/api', ordersRouter)
app.route('/api', order_menu_itemRouter)
app.route('/api', commentsRouter)
app.route('/api', orderStatusRouter)
app.route('/api', driverorderRouter)
app.route('/api/auth', authRouter)



console.log("Server is running on port " + process.env.PORT)

serve({
  fetch: app.fetch,
  port:Number(process.env.PORT || 3000)
})
