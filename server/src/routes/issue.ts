import { Router, Response, Request, NextFunction } from "express";
import Issue from "../models/issue";
import {
  deleteIssueById,
  getAllIssues,
  getIssueById,
} from "../controllers/issue-controller";
import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.resolve(process.env.APPDATA, "WatchTower", "assets", "issues")
    );
  },
  filename: (req, file, cb) => {
    cb(
      null,
      crypto.randomBytes(16).toString("hex") + path.extname(file.originalname)
    ); // Append extension
  },
});
const upload = multer({ storage });
const router: Router = Router();

/**
 * Get all issues
 */
router.get(
  "/issue",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const issues: Issue[] = await getAllIssues();
      res.status(200).json(issues);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Get issue by Id
 */
router.get(
  "/issue/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const issueId: number = parseInt(req.params.id, 10);
      const issue: Issue = await getIssueById(issueId);
      res.status(200).json({ issue });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Create an issue if it does not already exist
 */
router.post(
  "/issue",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const insertedIssue: Issue = await Issue.create({
          ...req.body
        })

        res.status(201).json({insertedIssue});
      // }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Update an issue but do not replace it
 */
router.patch(
  "/issue/:id",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const issue: Issue = await getIssueById(parseInt(req.params.id, 10));
      if (req.file) {
        const updatedIssue: Issue = await issue.update({
          ...req.body,
          cover_path: `/issues/${path.basename(req.file.path)}`,
        });
        res.status(200).json(updatedIssue);
      } else {
        const updatedIssue: Issue = await issue.update({ ...req.body });
        res.status(200).json(updatedIssue);
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Deletes an Issue
 */
router.delete(
  "/issue/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deletedIssues: number = await deleteIssueById(
        parseInt(req.params.id, 10)
      );
      if (deletedIssues > 0) {
        res.status(204).send("Deleted issue");
      } else {
        res
          .status(404)
          .send(`Could not find issue with ID ${parseInt(req.params.id, 10)}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
