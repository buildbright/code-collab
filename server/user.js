var User = (function () {
    function User(username, connection) {
        this.username = username;
        this.connection = connection;
        this.group = null;
        this.choices = null;
        this.selection = null;
    }
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map