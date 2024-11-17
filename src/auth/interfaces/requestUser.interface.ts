import { Request } from 'express';
import { User } from 'src/type-orm/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
