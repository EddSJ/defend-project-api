const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');

const authRoutes = require('../src/routes/auth.routes');
const adminRoutes = require('../src/routes/admin.routes');
const templateRoutes = require('../src/routes/template.routes');
const completedTemplateRoutes = require('../src/routes/completedTemplate.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', templateRoutes);
app.use('/api', completedTemplateRoutes);

module.exports.handler = serverless(app);