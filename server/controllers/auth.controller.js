const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        if( !username || !email || !password ){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        const usernameExist = await User.findOne({ username });
        if (usernameExist) {
            return res.status(400).json({ message: "Ce nom est déjà utilisé" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const createUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await createUser.save();


        res.status(201).json({ message: "Utilisateur créé" })
    } catch (err) {
        res.status(500).json({ message: err.message });

    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if( !email || !password ){
            return res.status(400).json({ message: "Veuillez remplir tous les champs" });
        }
        

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utilisateur non trouvable" })
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: "7d"}
        );


        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        res.status(500).json({ message : err.message});

    }
}