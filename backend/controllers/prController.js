const PullRequest = require("../models/pullRequestModel");
const File = require("../models/File");
const Repository = require("../models/repoModel");
const VersionControl = require("../services/VersionControl");

// Forked repo owner opens a PR
const createPR = async (req, res) => {
  try {
    const { title, description, fromRepo, toRepo, userId } = req.body;

    const pr = await PullRequest.create({
      title,
      description,
      fromRepo,
      toRepo,
      author: userId,
    });
    // Find the owner of the target repo
    const targetRepo = await Repository.findById(toRepo);

    // Emit notification to the repo owner's room
    if (global.io && targetRepo) {
      global.io.to(targetRepo.owner.toString()).emit("newPR", {
        message: `New pull request: "${title}"`,
        repoId: toRepo,
        prId: pr._id,
      });
    }
    res.status(201).json({ success: true, pr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// Get all PRs for a repo (owner sees these)
const getPRs = async (req, res) => {
  try {
    const { repoId } = req.params;
    const prs = await PullRequest.find({ toRepo: repoId, status: "open" })
      .populate("author", "username")
      .populate("fromRepo", "name");
    res.json(prs);
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// Owner merges PR — copies files from fromRepo into toRepo
// Owner merges PR. `resolutions` (optional) = { [fileName]: "theirs" | "ours" | "<custom content>" }
const mergePR = async (req, res) => {
  try {
    const { prId } = req.params;
    const { userId, resolutions = {} } = req.body;

    const pr = await PullRequest.findById(prId);
    if (!pr) return res.status(404).json({ message: "PR not found" });

    const toRepo = await Repository.findById(pr.toRepo);
    if (toRepo.owner.toString() !== userId) {
      return res.status(403).json({ message: "Only the owner can merge" });
    }

    const forkedFiles = await File.find({ repo: pr.fromRepo });
    const originalFiles = await File.find({ repo: pr.toRepo });
    const originalByName = new Map(originalFiles.map(f => [f.name, f]));
    const forkedByName = new Map(forkedFiles.map(f => [f.name, f]));

    const finalFiles = new Map();
    const changedFileNames = [];

    for (const forkedFile of forkedFiles) {
      const original = originalByName.get(forkedFile.name);
      const resolution = resolutions[forkedFile.name];

      let finalContent;
      if (resolution === "ours") {
        finalContent = original ? original.content : null;
      } else if (typeof resolution === "string" && resolution !== "theirs") {
        finalContent = resolution;
      } else {
        finalContent = forkedFile.content;
      }

      if (finalContent !== null) finalFiles.set(forkedFile.name, finalContent);
      if (!original || original.content !== forkedFile.content) {
        changedFileNames.push(forkedFile.name);
      }
    }

    for (const originalFile of originalFiles) {
      if (forkedByName.has(originalFile.name)) continue;
      const resolution = resolutions[originalFile.name];
      if (resolution === "theirs") {
        changedFileNames.push(originalFile.name);
      } else {
        finalFiles.set(originalFile.name, originalFile.content);
      }
    }

    await File.deleteMany({ repo: pr.toRepo });
    for (const [name, content] of finalFiles) {
      await File.create({ repo: pr.toRepo, name, content, createdBy: userId });
    }

    await VersionControl.commit({
      repoId: pr.toRepo,
      userId,
      message: `Merged pull request: ${pr.title}`,
      action: "MERGE",
      fileName: changedFileNames.length ? changedFileNames.join(", ") : "all files",
    });

    pr.status = "merged";
    await pr.save();

    res.json({ success: true, message: "PR merged successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// Close a PR without merging
const closePR = async (req, res) => {
  try {
    const { prId } = req.params;
    const pr = await PullRequest.findByIdAndUpdate(
      prId,
      { status: "closed" },
      { new: true }
    );
    res.json({ success: true, pr });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};
const Diff = require("diff");

const getPRDiff = async (req, res) => {
  try {
    const { prId } = req.params;

    const pr = await PullRequest.findById(prId)
      .populate("fromRepo")
      .populate("toRepo");

    if (!pr) return res.status(404).json({ message: "PR not found" });

    // Get files from both repos
    const fromFiles = await File.find({ repo: pr.fromRepo._id });
    const toFiles = await File.find({ repo: pr.toRepo._id });

    const diffs = [];

    for (const fromFile of fromFiles) {
      // Find matching file in original repo
      const toFile = toFiles.find(f => f.name === fromFile.name);

      const originalContent = toFile ? toFile.content : "";
      const newContent = fromFile.content;

      // Generate line-by-line diff
      const diff = Diff.createPatch(
        fromFile.name,
        originalContent,
        newContent,
        "original",
        "forked"
      );

      // Check if there are actual changes
      const hasChanges = originalContent !== newContent;

      diffs.push({
        fileName: fromFile.name,
        hasChanges,
        diff,
        isNew: !toFile,  // file didn't exist in original repo
      });
    }

    // Also check for deleted files (exist in original but not in fork)
    for (const toFile of toFiles) {
      const stillExists = fromFiles.find(f => f.name === toFile.name);
      if (!stillExists) {
        diffs.push({
          fileName: toFile.name,
          hasChanges: true,
          diff: null,
          isDeleted: true,
        });
      }
    }

    res.json({ success: true, diffs });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
module.exports = { createPR, getPRs, mergePR, closePR , getPRDiff};