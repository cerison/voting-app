
const mongoose = require("mongoose");
const Candidate = mongoose.model("Candidate");
const Voter = mongoose.model("Voter");

// Add a new candidate
exports.addCandidate = async (req, res) => {
    try {
        const candidate = new Candidate(req.body);
        await candidate.save();
        res.json(candidate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Add a new voter
exports.addVoter = async (req, res) => {
    try {
        const voter = new Voter(req.body);
        await voter.save();
        res.json(voter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Cast a vote
exports.castVote = async (req, res) => {
    const { candidateId, voterId } = req.body;

    try {
        const voter = await Voter.findById(voterId);
        const candidate = await Candidate.findById(candidateId);

        if (!voter || !candidate) {
            return res.status(404).json({ error: "Voter or Candidate not found." });
        }

        if (voter.hasVoted) {
            return res.status(400).json({ error: "Voter has already voted." });
        }

        voter.hasVoted = true;
        candidate.votes += 1;

        await voter.save();
        await candidate.save();

        res.json({ voter, candidate });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all data

exports.getVoters = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        const voters = await Voter.find();

        res.json({ candidates, voters });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all data
exports.getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        const voters = await Voter.find();

        res.json({ candidates, voters });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};