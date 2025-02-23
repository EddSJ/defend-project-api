import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import templateRoutes from './routes/template.routes.js';
import completedTemplateRoutes from './routes/completedTemplate.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', templateRoutes);
app.use('/api', completedTemplateRoutes);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});