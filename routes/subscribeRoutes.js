const express = require("express");
const router = express.Router();
const PostSusbcribeSchema = require("../models/PostSubscribe");


// POST /api/subscribe → add new subscriber
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const existing = await PostSusbcribeSchema.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already subscribed" });
    }

    const newSubscriber = new PostSusbcribeSchema({ email });
    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: "Subscription successful 🎉",
      data: newSubscriber,
    });
  } catch (error) {
    console.error("Subscribe Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/subscribe → list all subscribers
router.get("/", async (req, res) => {
  try {
    const subscribers = await PostSusbcribeSchema.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error("Fetch Subscribers Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/subscribe/:id → remove subscriber
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await PostSusbcribeSchema.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }
    res.status(200).json({ success: true, message: "Subscriber removed" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// PATCH /api/subscribe/:id → update subscriber status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!["subscribed", "unsubscribed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'subscribed' or 'unsubscribed'",
      });
    }

    const updated = await PostSusbcribeSchema.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    res.status(200).json({
      success: true,
      message: `Subscriber status updated to '${status}'`,
      data: updated,
    });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
