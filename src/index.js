import express from 'express'

import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'

const app = express()

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', adminRoutes)



app.listen(3000)
console.log('Server on port: ', 3000)