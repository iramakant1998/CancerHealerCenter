const User = require("../models/user.model");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
const nodemailer = require("nodemailer");
exports.createUser = async (req, res) => {
  try {
    const userRole = req.user?.role;  // or however you retrieve the role

    if (userRole !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: "Only admin users can create new users.",
      });
    }
    const { email, phone } = req.body;
    const Checkuser = await User.find({
      $or: [{ email: email }, { phone: phone }],
    });

    if (Checkuser?.length > 0) {
      res.status(401).json({
        sucess: false,
        massage: "Email Or Phone No. Already Exit",
      });
    } else {
      const user = await User.create(req.body);

      res.status(201).json({
        STATUS_MESSAGE: "SUCCESS",

        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).send({ STATUS_MESSAGE: "FAILURE", message: error.message });

    //  console.timeEnd("start");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        sucess: false,
        massage: "Please Provide An Email And Password",
      });
      return;
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        sucess: false,
        massage: "Invalid Email",
      });
      return;
    } else {
      // check if password matches //
      const match = await user.matchPassword(password);
      if (!match) {
        res.status(401).json({
          STATUS_MESSAGE: "FAILURE",
          sucess: false,
          massage: "Invalid Password",
        });
        return;
      } else {
        if (user.isblock) {
          res.status(401).json({
            sucess: false,
            massage: "User Block By Admin",
          });
          return;
        } else {
          sendTokenResponse(user, 200, res);
        }
      }
    }
  } catch (error) {
    res.status(404).json({
      sucess: false,
      massage: error,
      STATUS_MESSAGE: "FAILURE",
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user)
    res.status(200).json({
      STATUS_MESSAGE: "SUCCESS",
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ STATUS_MESSAGE: "FAILURE", message: error.message });
    console.log(error);
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    // check current password //
    if (!(await user.matchPassword(currentPassword))) {
      CreateNotification(
        user._id,
        "You Entered Incorrect Password While Updating Password"
      );
      res.status(400).json({
        sucess: false,
        massage: "Password Is Incorrect",
      });
      return;
    } else {
      if (currentPassword === newPassword) {
        res.status(400).json({
          sucess: false,
          massage: "Both Password Are Same",
        });
        return;
      } else {
        user.password = newPassword;
        await user.save();
        sendTokenResponse(user, 200, res);
      }
    }
  } catch (error) {
    res.status(400).json({
      sucess: false,
      massage: error,
    });
  }
};

exports.updateLoginPassword = async (req, res) => {
  try {
    const { phone ,currentPassword, newPassword } = req.body;
    const user = await User.findOne( {phone} ).select("+password");
    // check current password //
    if (!(await user.matchPassword(currentPassword))) {
      CreateNotification(
        user._id,
        "You Entered Incorrect Password While Updating Password"
      );
      res.status(400).json({
        sucess: false,
        massage: "Password Is Incorrect",
      });
      return;
    } else {
      if (currentPassword === newPassword) {
        res.status(400).json({
          sucess: false,
          massage: "Both Password Are Same",
        });
        return;
      } else {
        user.password = newPassword;
        await user.save();
        sendTokenResponse(user, 200, res);
      }
    }
  } catch (error) {
    res.status(400).json({
      sucess: false,
      massage: error,
    });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({
        sucess: false,
        massage: "There Is No User With That Email",
      });
      return;
    }

    const output = `<p> 
  <a href="${process.env.HTMLLINK}/auth/user/${user._id}" target="_blank" rel="noopener noreferrer">Reset Password</a>.</p>
 
 <h3>Message</h3>
  <h1>Thank you </h1>
`;
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "sanjeev.saffron1999@gmail.com",
    pass: "qmnifchflesywqay",
  },
  from: "sanjeev.saffron1999@gmail.com",
});

    // Prepare the email
    const mailOptions = {
      from: "mishragpt99@gmail.com",
      to: user.email,
      subject: "Reset Password",
      text: "Click On This link to change Password",
      html: output,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(400).json({
          success: false,
          error,
        });
        return;
      } else {
        res.json({
          result: true,
          message: "Email Sent",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ STATUS_MESSAGE: "FAILURE", message: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    let id = req.user.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      massage: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendTokenResponse = async (user, statusCode, res) => {
  try {
    // send a token //
    const token = await user.getToken();
    const role = user.role;
    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    if (process.env.NODE_ENV === "production") {
      options.secure = true;
    }
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      token,
      role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllUsers =  async (req, res) => {
  try {
    const qaUsers = await User.find();
    if (!qaUsers) {
      res.status(400).json({
        sucess: false,
        massage: "There Is No User With QA Role",
      });
      return;
    }
    res.status(200).json(qaUsers);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUserAccount = async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      massage: "User deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
