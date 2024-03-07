module.exports = {
    checkIfAuthorized: function (req, res, next) {
        if (req.user == null) {
            res.status(401).send(new Error('Unauthorized'));
            console.log(new Error());
        }
        if (req.user.role == 'Admin' || req.user.role == 'User') {
            next();
            return;
        }
    },
    isAdmin: function (req, res, next) {
        if (req.user.role === 'Admin') {
            next();
            return;
        }
        else {
            res.status(401).send(new Error('Admin privileges required'))
            console.log(new Error('Not an admin'));

        }
    },
    canSeeUserDetails: function (req, res, next) {
        if (req.user != null)
            if (req.user.role === "Admin" || req.user.id == req.params.userId) {
                next();
                return;
            }
        res.redirect('/login');
    },
    canSeeUsersList: function (req, res, next) {
        if (req.user != null)
            if (req.user.role === "Admin") {
                next();
                return;
            }
        res.redirect('/login');
    }
}