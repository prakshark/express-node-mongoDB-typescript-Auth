import type { Request, Response } from "express";
export declare function registeruser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function loginUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function logoutUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map