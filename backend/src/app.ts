import express from "express";

const app = express(); //express() creates an Express application.

app.use(express.json()); //parses incoming JSON request bodies and makes the parsed value available through req.body.

app.use(express.urlencoded({ extended: true }));

// Exercise 1 — Create a server information endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        "success": true,
        "message": "Server is running"
    })
})

app.get("/api/info", (req, res) => {
    res.status(200).json({
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
})

// Exercise 2 — Understand request parameters
app.get("/api/users/:userId", (req, res) => {
    res.status(200).json({
        "success": true,
        "userId": req.params.userId,
    })
})

// Exercise 3 — Understand query parameters
app.get("/api/search", (req, res) => {
    res.status(200).json({
        success: true,
        filters: {
            name: req.query.name,
            role: req.query.role,
        },
    });
});

// Exercise 4 — Understand request body
app.post("/api/users", (req, res) => {
    res.status(201).json({
        "success": true,
        "message": "User data received successfully",
        "data": {
            "name": req.body.name,
            "email": req.body.email,
        }
    })
})

export default app;