import validator from "express-validator";
const { body } = validator;

const userValidation = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 20 }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isLength({ min: 3, max: 20 })
    .isEmail()
    .withMessage("Please Enter a valid Email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage(
      "Password must be 8+ chars with uppercase, number, and symbol"
    ),
  body("contact")
    .trim()
    .isNumeric()
    .withMessage("Only Number are allowed")
    .isLength({ min: 10, max: 12 }),
  body("bio").trim().isLength({ max: 50 }),
  body("profilePicture").custom((value, { req }) => {
    if (!req.file) return true;
    const allowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
    ];

    if (!allowedMimes.includes(req.file.mimetype)) {
      throw new Error("Only .jpg, .jpeg, .png and .svg formats are allowed");
    }

    return true;
  }),
];

export default userValidation;
