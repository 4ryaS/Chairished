const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/user.repositories');
const SessionRepository = require('../repositories/session.repositories');

require('dotenv').config();

let jwtSecret = process.env.SECURE_KEY;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;

const userRegister = (req, res) => {
    const { name, email, password, phoneNum } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error generating salt');
        }
        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error hashing password');
            }

            try {
                const createdUser = await UserRepository.create(name, email, hash, phoneNum);
                return res.status(201).json(createdUser);

            } catch (error) {
                console.error(error);
                return res.status(500).send('Error creating user');
            }
        });
    });
};



const userProfile = async (req, res) => {
    try {
        // Verify token
        jwt.verify(req.cookies.token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.status(401);
                // return res.redirect('/login');
                // return res.send("Login First");
                return res.render('index_1');
            }

            // If token is valid, continue to find the user
            req.user = decoded; // Attach decoded user information to the request object
            const user = await UserRepository.findByEmail(req.user.email);

            if (!user) {
                // Handle case where user is not found
                // return res.redirect('/login');
                return res.render('index_1');
            }

            // Render profile page with user data
            res.render('profile', { user: user });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const updateUser = async (req, res) => {
    
    try {
        let user = await UserRepository.findByIdAndUpdate(req, req.params.id);
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
};

const deleteUser = async (req, res) => {
    try {
        let deletedUser = await UserRepository.findByIdAndDelete(req.params.id );
        res.cookie("token", "");
        res.send("User Deleted!");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await UserRepository.findByEmail(email);


    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send({ message: "Invalid Credentials" });
    }

    try {
        let session = await SessionRepository.findByUserId(user._id);
        if (session) {
            // Update the existing session
            session.accessToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: accessTokenExpiration });
            session.refreshToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: refreshTokenExpiration });
            session.accessExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
            session.refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
            await session.save();
        } else {
            // Create a new session
            const accessToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: accessTokenExpiration });
            const refreshToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: refreshTokenExpiration });
            const accessExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
            const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
            session = await SessionRepository.create(user._id, accessToken, refreshToken, req.headers['user-agent'], accessExpiresAt, refreshExpiresAt);
        }
        // res.send({ accessToken: session.accessToken, refreshToken: session.refreshToken });
        console.log(user._id);
        // res.send("Login successful");
        res.render('profile', {user: user});
    } catch (error) {
        console.error('Error creating or updating session:', error);
        res.sendStatus(500);
    }
};

const tokenRefresh = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.sendStatus(401);
    }

    jwt.verify(refreshToken, jwtSecret, async (err, decoded) => {
        if (err) {
            return res.sendStatus(403);
        }

        try {
            let session = await SessionRepository.updateAccessToken(refreshToken);

            if (!session || session.refreshExpiresAt < new Date()) {
                return res.sendStatus(403);
            }
            res.json({ accessToken: session.aproccessToken });
        } 
        catch (error) {
            console.error('Error refreshing token:', error);
            res.sendStatus(500);
        }
    });
};


const userProtected = async (req, res) => {
    const { userId } = req.user; // Assuming decoded userId is attached to req.user by authenticateJWT

    try {
        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1];

        // const session = await sessionModel.findOne({ userId, accessToken: token });
        const session = await SessionRepository.findByUserIdAndAcessToken(userId, token);

        if (!session || session.accessExpiresAt < new Date()) {
            return res.status(403).json({ message: 'Session expired or invalid' });
        }

        res.json({ message: 'Protected data' });
    } catch (error) {
        console.error('Error retrieving session:', error);
        res.sendStatus(500);
    }
};


const userLogout = async (req, res) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    // await sessionModel.deleteOne({ userId: req.user.userId, accessToken: token });
    await SessionRepository.deleteByUserIdAndAccessToken(req.user.userId, token);

    // res.json({ message: 'Logged out successfully' });
    res.render('/');
};

const authenticateJWT = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // return res.sendStatus(401); // Unauthorized if no token provided or in invalid format
        res.render('login1');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            console.error('JWT verification error:', err);
            // return res.sendStatus(403); // Forbidden if token is invalid or expired
            res.render('login1');
        }
        req.user = decoded; // Attach decoded user object to request
        next(); // Proceed to the next middleware or route handler
    });
};


module.exports = {
    userRegister,
    userLogin,
    userProfile,
    updateUser,
    deleteUser,
    tokenRefresh,
    authenticateJWT,
    userLogout,
    userProtected
};