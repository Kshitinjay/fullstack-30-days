import type { Request, Response } from "express";

export const getHealth = (_req: Request, res: Response): Response => {
    return res.status(200).json({
        "success": true,
        "message": "Server is running"
    })
};

export const getInfo = (_req: Request, res: Response): Response => {
    return res.status(200).json({
        "success": true,
        "message": "Server information received successfully",
        "data": {
            "application": "Full Stack Learning Project",
            "developer": "Kshitinjay",
            "experience": "5 years",
            "stack": [
                "Node.js",
                "Express.js",
                "TypeScript"
            ]
        }
    })
};