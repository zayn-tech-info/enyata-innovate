const mongoose = require("mongoose");

const CircleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a circle name"],
      trim: true,
      minlength: [3, "Circle name must be at least 3 characters"],
      maxlength: [80, "Circle name cannot exceed 80 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters"],
    },
    type: {
      type: String,
      required: [true, "Please specify the circle type"],
      enum: {
        values: ["ajo", "welfare", "trip", "project", "levy", "others"],
        message: "Please select a valid circle type",
      },
    },
    inviteCode: {
      type: String,
      unique: true,
      uppercase: true,
      minlength: 6,
      maxlength: 6,
    },
    admins: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: "A circle must have at least one admin",
      },
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["active", "suspended"],
          default: "active",
        },
      },
    ],
    rules: {
      contributionAmount: {
        type: Number,
        required: [true, "Please specify a contribution amount"],
        min: [0, "Contribution amount cannot be negative"],
      },
      currency: {
        type: String,
        default: "NGN",
      },
      frequency: {
        type: String,
        required: [true, "Please specify a contribution frequency"],
        enum: ["one-time", "monthly", "per-event"],
      },
    },
    escrowBalance: {
      type: Number,
      default: 0,
      min: [0, "Escrow balance cannot be negative"],
    },
    quorumThreshold: {
      type: Number,
      default: 1,
      min: [1, "Quorum threshold must be at least 1"],
    },
    ajoConfig: {
      currentCycle: {
        type: Number,
        default: 0,
      },
      payoutOrder: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      nextPayoutDate: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

CircleSchema.virtual("memberCount").get(function () {
  return this.members ? this.members.length : 0;
});

CircleSchema.pre("save", async function (next) {
  if (!this.isNew || this.inviteCode) {
    return next();
  }

  let code;
  let exists = true;

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  while (exists) {
    code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const count = await mongoose.models.Circle.countDocuments({
      inviteCode: code,
    });
    if (count === 0) {
      exists = false;
    }
  }

  this.inviteCode = code;
  next();
});

CircleSchema.methods.isMember = function (userId) {
  if (!this.members) return false;
  return this.members.some(
    (member) =>
      member.userId.toString() === userId.toString() &&
      member.status === "active",
  );
};

CircleSchema.methods.isAdmin = function (userId) {
  if (!this.admins) return false;
  return this.admins.some(
    (adminId) => adminId.toString() === userId.toString(),
  );
};

module.exports = mongoose.model("Circle", CircleSchema);
