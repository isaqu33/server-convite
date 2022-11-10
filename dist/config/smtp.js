"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smtp = void 0;
exports.smtp = {
    host: "smtp.gmail.com",
    port: 587,
    user: process.env.USER_SMTP,
    pass: process.env.PASS_SMTP
};
