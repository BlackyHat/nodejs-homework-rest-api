const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    password: {
      type: String,
      trim: true,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    avatarUrl: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  {
    versionKey: false,
  }
);

userSchema.pre('save', async function() {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

module.exports = model('user', userSchema);
