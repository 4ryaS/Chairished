const sessionModel = require('../models/session.models');
const jwt = require('jsonwebtoken');
let jwtSecret = process.env.SECURE_KEY;
const accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;
const bcrypt = require('bcrypt');

class SessionRepository {
    create = async (userId, accessToken, refreshToken, userAgent, accessExpiresAt, refreshExpiresAt) => {
        return await sessionModel.create({                  
            userId: userId,
            accessToken: accessToken,
            refreshToken: refreshToken,
            userAgent: userAgent,
            accessExpiresAt: accessExpiresAt,
            refreshExpiresAt: refreshExpiresAt
        });
    };

    findByAccessToken = async (accessToken) => {
        return await sessionModel.findOne({accessToken});
    };

    findByRefreshToken = async (refreshToken) => {
        return await sessionModel.findOne({refreshToken});
    };

    findByUserId = async (userId) => {
        return await sessionModel.findOne({ userId: userId });
    };

    findByUserIdAndAcessToken = async (userId, acessToken) => {
        return await sessionModel.findOne({ userId: userId, accessToken: acessToken });
    };

    updateAccessToken = async (refreshToken) => {
        try {
            const decoded = jwt.verify(refreshToken, jwtSecret);

            const updatedSession = await sessionModel.findOneAndUpdate(
                { refreshToken },
                {
                    $set: {
                        accessToken: jwt.sign({ userId: decoded.userId }, jwtSecret, { expiresIn: accessTokenExpiration }),
                        accessExpiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
                    }
                },
                { new: true }
            );

            return updatedSession;
        } 
        catch (error) {
            console.error('Error updating access token:', error);
            throw error;
        }
    };

    deleteByUserIdAndAccessToken = async (userId, accessToken) => {
        try {
            const result = await sessionModel.deleteOne({ userId, accessToken });
            return result;
        } catch (error) {
            console.error('Error deleting session:', error);
            throw error;
        }
    };

    // Other methods as required
};

module.exports = new SessionRepository();