import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';

import authRoutes from '../src/routes/auth.routes.js';
import adminRoutes from '../src/routes/admin.routes.js';
import templateRoutes from '../src/routes/template.routes.js';
import completedTemplateRoutes from '../src/routes/completedTemplate.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', templateRoutes);
app.use('/api', completedTemplateRoutes);

export const handler = serverless(app);