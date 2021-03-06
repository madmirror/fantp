import { Router } from 'express';
import userService from '../user/user.service';
import authService from './auth.service';
import { failWithMessage, successWithData } from '../utils/messageGenerator';
import { badRequest, serviceError } from '../utils/webResponse.util';
import profile from '../../isomorphic/decorators/profile.decorator';
import routerException from '../../isomorphic/decorators/routerException.decorator';
import routerExceptionHandler from '../../isomorphic/decorators/routerExceptionHandler.decorator';
import { signToken, verifyToken } from '../utils/token.util';
import {validateEmail, validatePassword} from '../../isomorphic/utils/accountUtils';
import {USER} from '../../isomorphic/constants/userRoles';

// @routerExceptionHandler
class AuthHandler {
    constructor(io) {
        this.io = io;
    }

    signin(req, res) {
        let { email, password } = req.body;

        authService.signin({ email, password })
            .then(user => signToken({ ...user }).then(
                    token => res.send({ success: true, token, ...user }),
                    err => res.send(failWithMessage('Fail to generate Token'))
                ),
                err => res.send(failWithMessage(err))
            );
    }

    signup(req, res) {
        let { username, password, email, gender } = req.body;
        console.log(USER);
        
        let emailValidateResult = validateEmail(email);
        if(!emailValidateResult.success) return res.send(failWithMessage(emailValidateResult.message));
        let passwordValidateResult = validatePassword(password);
        if(!passwordValidateResult.success) return res.send(failWithMessage(passwordValidateResult.message));

        return authService.signup({ username, password, email, gender, role: USER })
            .then(user => signToken({ ...user }).then(
                    token => res.send({ success: true, token, ...user }),
                    err => res.send(failWithMessage('Fail to generate Token'))
                ),
                err => res.send(failWithMessage(err + ' WTF'))
            );
    }

    checkUserUnique(req, res) {
        let { username, email } = req.query;
        console.log(username, email)
        let query = {};
        if (username) query.username = username;
        if (email) query.email = email;

        console.log('query is ', JSON.stringify(query))

        authService.checkUserUnique(query)
            .then(unique => res.send({ unique }));
    }
}

const authRouter = io => {
    let authHandler = new AuthHandler(io);

    let router = Router();

    router.post('/signin', authHandler.signin);

    router.post('/signup', authHandler.signup);

    router.get('/check-user-unique', authHandler.checkUserUnique);

    return router;
}

export default authRouter;
