const express = require('express');
const serverless = require('serverless-http');
const app = express();

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const templateRoutes = require('./routes/template.routes');
const completedTemplateRoutes = require('./routes/completedTemplate.routes');

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', templateRoutes);
app.use('/api', completedTemplateRoutes);

module.exports.handler = serverless(app);
