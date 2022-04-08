const express = require("express")
const router = express.Router();
const auth = require("../middleware/authorization");
const {check, validationResult } = require("express-validator");

const Note = require("../models/Note");
const { response } = require("express");

