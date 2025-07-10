import { Request, Response, Router } from "express";
import { getUserByIdController, getUsersController,loginUsersController,registerUserController } from "../controllers/userController";
import { userLoginDTO, userRegisterDTO } from "../dtos/UserDTO";

const userRouter: Router = Router()
userRouter.get("/",(req:Request, res:Response): Promise<void> => getUsersController(req, res))
userRouter.get("/:id",(req: Request<{id: string}>, res: Response): Promise<void> => getUserByIdController(req, res))
userRouter.post("/register",(req: Request<unknown, unknown, userRegisterDTO>,res: Response): Promise<void> => registerUserController(req,res))
userRouter.post("/login",(req: Request<unknown, unknown, userLoginDTO>,res: Response): Promise<void> =>loginUsersController(req, res))

export default userRouter

