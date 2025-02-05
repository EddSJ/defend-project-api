import express from 'express'

import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import templateRoutes from './routes/template.routes.js'

const app = express()

app.use(express.json())

app.use('/api', authRoutes)
app.use('/api', adminRoutes)
app.use('/api', templateRoutes)



app.listen(3000)
console.log('Server on port: ', 3000)