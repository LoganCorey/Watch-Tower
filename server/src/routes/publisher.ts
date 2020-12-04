import { Router, Request, Response, NextFunction } from "express";
import Publisher from "../models/publisher";
import {
  getAllPublishers,
  getPublisherById,
  insertPublisherIfNotExists,
  deletePublisherById,
} from "../controllers/publisher-controller";
import multer from "multer";
import path from "path";
import crypto from 'crypto';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.resolve(process.env.APPDATA, "WatchTower", "assets", "publishers")
    );
  },
  filename: (req, file, cb) => {

    cb(null, crypto.randomBytes(16).toString("hex") + path.extname(file.originalname)); // Append extension
  },
});
const upload = multer({ storage }).single("image");
const router: Router = Router();

/**
 * Retrieves all publishers
 */
router.get(
  "/publisher",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publishers: Publisher[] = await getAllPublishers();
      res.status(200).json({ publishers });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Retrieves publisher by id
 */
router.get(
  "/publisher/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publisherId: number = parseInt(req.params.id, 10);

      const publisher: Publisher = await getPublisherById(publisherId);
      if (publisher !== null) {
        res.status(200).json({ publisher });
      } else {
        res.status(404).json(`Publisher does not exist ${publisherId}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Update an issue but do not replace it
 */
router.patch(
  "/publisher/:id",
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publisher: Publisher = await getPublisherById(parseInt(req.params.id, 10));
      if (req.file) {
        const publisherImagePath: string = `publishers/${path.basename(req.file.path)}`;
        const updatedPublisher: Publisher = await publisher.update({
          ...req.body,
          publisher_image: publisherImagePath,
        });
        res.status(200).json(updatedPublisher);
      } else {
        const updatedPublisher: Publisher = await publisher.update({ ...req.body });
        res.status(200).json(updatedPublisher);
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Create a publisher given a name if it does not already exist
 */
router.post(
  "/publisher",
  upload,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publisherName: string = req.body.publisherName;
      const publisherImagePath: string = `publishers/${path.basename(req.file.path)}`;
      const insertedPublisher: [
        Publisher,
        boolean
      ] = await insertPublisherIfNotExists(publisherName, publisherImagePath);

      // resource created
      if (insertedPublisher[1] === true) {
        res.status(201).json(insertedPublisher[0]);
      }
      // resource already exists
      else {
        res.status(409).json(insertedPublisher[0]);
      }
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Deletes a publisher given an id if it exists
 */
router.delete(
  "/publisher/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const publisherId: number = parseInt(req.params.id, 10);
      const publishersDeleted: number = await deletePublisherById(publisherId);
      if (publishersDeleted > 0) {
        res.status(204).send("Deleted publisher");
      } else {
        res
          .status(404)
          .send(`Could not find publisher given id ${publisherId}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

export default router;
