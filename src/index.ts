import express, { json } from 'express';
import { chartRouter } from './routes/chart-router';
import { userRouter } from './routes/user-router';
// import { movieRouter } from './routes/movies';

const PORT = 28000;
const app = express();

// ------------------| MIDDLEWARES |------------------- //

app.use(json());

// app.use('/api', movieRouter);
app.use('/api',chartRouter)
app.use('/api',userRouter)
// ---------------------| SERVER |--------------------- //

app.listen(PORT, () => {
	console.log('Server listening on port', PORT);
});
