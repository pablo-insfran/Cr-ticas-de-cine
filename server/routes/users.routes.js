const UsersControllers = require("../controllers/users.controllers")

module.exports = app => {
    app.post("/api/registration", UsersControllers.registerUser);
    app.post("/api/login", UsersControllers.loginUser);
    app.get("/api/logout", UsersControllers.logOutUser);
}