const { Schema, SchemaTypes, model } = require('mongoose');

const usersSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
  },
  {
    versionKey: false,
  }
);
usersSchema.owner = { type: SchemaTypes.ObjectId, ref: 'user' };
module.exports = model('user', usersSchema);
