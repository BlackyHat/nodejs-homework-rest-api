const express = require("express");
const router = new express.Router();
const path = require("path");

const AVATARS_DIR = path.join(__dirname, "../", "../", "public", "avatars");
router.use(express.static(AVATARS_DIR));

module.exports = { filesRouter: router };
