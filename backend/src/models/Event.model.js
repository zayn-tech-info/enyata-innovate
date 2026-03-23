const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    circleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Circle",
      required: [true, "Circle ID is required"],
    },
    type: {
      type: String,
      required: [true, "Event type is required"],
      enum: {
        values: ["welfare", "trip", "project", "levy", "ajo-cycle", "others"],
        message: "Type must be welfare, trip, project, levy, or ajo-cycle",
      },
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    beneficiary: {
      name: {
        type: String,
        trim: true,
      },
      bankCode: {
        type: String,
        trim: true,
      },
      accountNumber: {
        type: String,
        trim: true,
        validate: {
          validator: function (v) {
            if (!v) return true; 
            return /^\d{10}$/.test(v);
          },
          message: (props) =>
            `${props.value} is not a valid 10-digit account number!`,
        },
      },
      accountName: {
        type: String,
        trim: true,
      },
    },
    targetAmount: {
      type: Number,
      required: [true, "Target amount is required"],
      min: [1, "Target amount must be at least 1"],
    },
    collectedAmount: {
      type: Number,
      default: 0,
      min: [0, "Collected amount cannot be negative"],
    },
    contributionAmount: {
      type: Number,
      required: [true, "Contribution amount is required"],
      min: [1, "Contribution amount must be at least 1"],
    },
    status: {
      type: String,
      enum: ["open", "closed", "disbursed"],
      default: "open",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator (createdBy) is required"],
    },
    dueDate: Date,
    notifiedAt: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

 
EventSchema.virtual("progressPercent").get(function () {
  if (!this.targetAmount || this.targetAmount === 0) return 0;
  const percent = (this.collectedAmount / this.targetAmount) * 100;
  return parseFloat(percent.toFixed(1));
});

 
EventSchema.virtual("isComplete").get(function () {
  return this.collectedAmount >= this.targetAmount;
});

 
EventSchema.statics.findOpenByCircle = function (circleId) {
  return this.find({
    circleId: circleId,
    status: "open",
  }).sort({ createdAt: -1 });
};

module.exports = mongoose.model("Event", EventSchema);
