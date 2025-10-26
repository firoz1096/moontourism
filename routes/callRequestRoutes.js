const express = require("express");
const router = express.Router();
const CallRequestEnq = require("../models/CallRequest");

// 🟢 CREATE a new call request
router.post("/", async (req, res) => {
  try {
    const newCallReq = await CallRequestEnq.create(req.body);
    res.status(201).json(newCallReq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 READ all call requests
router.get("/", async (req, res) => {
  try {
    const allCallReqs = await CallRequestEnq.find().sort({ _id: -1 });
    res.json(allCallReqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 READ single call request by ID
router.get("/:id", async (req, res) => {
  try {
    const callReq = await CallRequestEnq.findById(req.params.id);
    if (!callReq) return res.status(404).json({ error: "Request not found" });
    res.json(callReq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 UPDATE a call request
router.put("/:id", async (req, res) => {
  try {
    const updatedCallReq = await CallRequestEnq.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCallReq) return res.status(404).json({ error: "Request not found" });
    res.json(updatedCallReq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 DELETE a call request
router.delete("/:id", async (req, res) => {
  try {
    const deletedCallReq = await CallRequestEnq.findByIdAndDelete(req.params.id);
    if (!deletedCallReq) return res.status(404).json({ error: "Request not found" });
    res.json({ message: "Call request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
