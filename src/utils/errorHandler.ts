import { Request, Response, NextFunction } from "express";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
   res.status(500).send("Internal Server Error")
}

export function handleError(res: Response, status: number, messages: string): void {
   res.status(status).json( {success: false, error: messages} );
}

export function handleNotFound(res: Response): void {
   res.status(404).json( {success: false, error: "Not found"} );
}

export function handleInternalError(res: Response ): void {
   res.status(500).json( {success: false, error: "Internal server error"} );
}
