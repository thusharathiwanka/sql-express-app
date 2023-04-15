import express, { Request, Response } from 'express';

import './db/seed';
import { pgClient } from './db/client.config';

const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.urlencoded({ extended: true }));

pgClient
  .connect()
  .then(() =>
    app.listen(5000, () => console.log(`server running on port ${PORT}`))
  )
  .catch((e) => console.log(e));

app.get('/', (req: Request, res: Response) =>
  res.status(200).json({ message: 'server active' })
);

app.get('/posts', async (req: Request, res: Response) => {
  try {
    const result = await pgClient.query('SELECT * FROM posts');
    res.status(200).render('posts', { posts: result.rows });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});

app.post('/posts', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    await pgClient.query(
      `INSERT INTO posts (title, content) VALUES ('${title}', '${content}');`
    );
    res.redirect('/posts');
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
});
