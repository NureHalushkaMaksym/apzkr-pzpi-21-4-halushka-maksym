import { NextApiRequest, NextApiResponse } from 'next';
import { UsersService } from './users.service';
import { createConnection } from 'typeorm';
import { Users } from './user.entity';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;

    try {
      const connection = await createConnection();
      const usersService = new UsersService(connection.getRepository(Users));
      
      const user = await usersService.create({ username, email, password });

      await connection.close();

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
