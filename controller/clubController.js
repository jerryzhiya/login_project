import pool from "../db/pool.js";
import User from "../model/user.js";

// GET: Join Club page
export const getJoinClub = async (req, res, next) => {
  res.render("join-club", {
    title: "Join Club",
    user: req.user,
    success_msg: req.flash("success"),
    error_msg: req.flash("error"),
  });
};

// POST: Join Club
export const postJoinClub = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    if (passcode === process.env.CLUB_PASSCODE) {
      await pool.query("UPDATE users SET ismember = true WHERE id = $1", [
        req.user.id,
      ]);

      // Refresh req.user in session
      const updatedUser = await User.findById(req.user.id);
      req.login(updatedUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome to the club!");
        res.redirect("/");
      });
    } else {
      req.flash("error", "Incorrect passcode");
      res.redirect("/club/join");
    }
  } catch (err) {
    next(err);
  }
};

// GET: Admin passcode page
export const getAdminPage = async (req, res, next) => {
  res.render("admin-passcode", {
    title: "Become an admin",
    user: req.user,
    success_msg: req.flash("success"),
    error_msg: req.flash("error"),
  });
};

// POST: Become Admin
export const postAdminPage = async (req, res, next) => {
  try {
    const { passcode } = req.body;
    if (passcode === process.env.ADMIN_PASSCODE) {
      await pool.query("UPDATE users SET isadmin = true WHERE id = $1", [
        req.user.id,
      ]);

      // Refresh req.user in session
      const updatedUser = await User.findById(req.user.id);
      req.login(updatedUser, (err) => {
        if (err) return next(err);
        req.flash("success", "You are now an admin");
        res.redirect("/");
      });
    } else {
      req.flash("error", "Incorrect admin passcode");
      res.redirect("/club/admin");
    }
  } catch (error) {
    next(error);
  }
};