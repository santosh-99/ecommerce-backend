import userRepository from "../repository/user.repository.js";
import passwordService from "./password.service.js";

import {
    ConflictError,
    UnauthorizedError
} from "../errors/index.js";


class AuthService {

    constructor() {

        this.userRepository = userRepository;
        this.passwordService = passwordService;

    }


    // ============================================================
    // REGISTER
    // ============================================================

    async register(userData) {

        const {
            name,
            email,
            password
        } = userData;


        // --------------------------------------------------------
        // Check whether email already exists
        // --------------------------------------------------------

        const existingUser =
            await this.userRepository.findByEmail(email);


        if (existingUser) {

            throw new ConflictError(
                "Email already registered."
            );

        }


        // --------------------------------------------------------
        // Hash password
        // --------------------------------------------------------

        const hashedPassword =
            await this.passwordService.hash(password);


        // --------------------------------------------------------
        // Create user
        // --------------------------------------------------------

        const user =
            await this.userRepository.create({

                name,
                email,
                password: hashedPassword

            });


        // --------------------------------------------------------
        // Return safe user data
        // --------------------------------------------------------

        return {

            user: this.buildUserResponse(user)

        };

    }


    // ============================================================
    // LOGIN
    // ============================================================

    async login(credentials) {

        const {
            email,
            password
        } = credentials;


        // --------------------------------------------------------
        // Find user
        // --------------------------------------------------------

        const user =
            await this.userRepository.findByEmail(email);


        if (!user) {

            throw new UnauthorizedError(
                "Invalid email or password."
            );

        }


        // --------------------------------------------------------
        // Compare password
        // --------------------------------------------------------

        const isPasswordMatched =
            await this.passwordService.compare(
                password,
                user.password
            );


        if (!isPasswordMatched) {

            throw new UnauthorizedError(
                "Invalid email or password."
            );

        }


        // --------------------------------------------------------
        // Authentication successful
        // --------------------------------------------------------
      

        return {

            user: this.buildUserResponse(user)

        };

    }


    // ============================================================
    // BUILD SAFE USER RESPONSE
    // ============================================================

    buildUserResponse(user) {

        return {

            id: user._id.toString(),

            name: user.name,

            email: user.email,

            role: user.type

        };

    }

}


export default new AuthService();