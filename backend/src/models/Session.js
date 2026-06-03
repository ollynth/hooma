// models/Session.js
import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    username: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'terminated'],
        default: 'active',
        index: true
    },
    ipAddress: { type: String },
    userAgent: { type: String },
    expiresAt: {
        type: Date,
        required: true,
        index: { expireAfterSeconds: 0 }  // MongoDB TTL — auto-deletes expired docs
    },
    lastActiveAt: { type: Date, default: Date.now },
    createdAt:    { type: Date, default: Date.now }
});

const Session = mongoose.model("Session", sessionSchema);
export default Session;