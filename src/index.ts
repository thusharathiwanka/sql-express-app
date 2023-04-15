import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import './db/seed';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => console.log('server started on port ' + PORT));

app.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'server active' })
);

app.get('/posts', async (req: Request, res: Response) => {
  try {
    const result = await prisma.post.findMany();
    res.status(200).render('posts', { posts: result });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.post('/posts', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    await prisma.post.create({ data: { title, content } });
    res.redirect('/posts');
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.post('/comments', async (req: Request, res: Response) => {
  try {
    const { postId, content } = req.body;
    await prisma.comment.create({ data: { content, postId: Number(postId) } });
    res.redirect('/posts');
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});
