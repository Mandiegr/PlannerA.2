import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userExists) {
      return res.status(400).json({
        message: 'Username already taken!!'
      })
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    


    return res.status(201).json({id: user.id});
  } catch (error) {
    console.error('Erro durante o registro:', error);
    return res.status(500).json({ error: 'Erro durante o registro. Verifique o console para mais detalhes.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}`);
});
