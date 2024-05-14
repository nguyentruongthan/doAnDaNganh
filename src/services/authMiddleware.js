import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
	if (req.cookies) {
		console.log(req.cookies)
	} else {
		return res.status(403).json({ message: 'Invalid Token ' });
	}
	const token = req.cookies.token;

    if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'your_secret_key', (err, user) => {
		if (err) {
			return res.status(403).json({ message: 'Invalid Token ' });
		}

		req.user = user;
		next();
    });
};

export default authenticateToken;