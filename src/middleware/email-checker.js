const checkEmailExistenceInSession = (req, res, next) => {
    try {
        if (!req.session.email) {
            return res.status(400).json({
                success: false,
                error: 'You cannot pass register page to come here.'
            });
        }

        next();
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
}

module.exports = checkEmailExistenceInSession;