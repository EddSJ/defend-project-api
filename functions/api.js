const express = require('express');
const serverless = require('serverless-http');
const app = express();

const authRoutes = require('../src/routes/auth.routes');
const adminRoutes = require('../src/routes/admin.routes');
const templateRoutes = require('../src/routes/template.routes');
const completedTemplateRoutes = require('../src/routes/completedTemplate.routes');

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', templateRoutes);
app.use('/api', completedTemplateRoutes);

module.exports.handler = serverless(app);
