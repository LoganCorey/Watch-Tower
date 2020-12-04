import { Router, Request, Response, NextFunction } from "express";
import { getAllSeries, getSeriesById,insertSeriesIfNotExists, deleteSeriesById } from "../controllers/series-controller";
import {insertManyBlankIssues} from '../controllers/issue-controller';
import Series from "../models/series";
import multer from "multer";
const upload = multer();
const router: Router = Router();

/**
 * GET: retrieves a comic book series by id
 */
router.get(
  "/series",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const series: Series[] = await getAllSeries();
      res.status(200).json({ series });
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET: retrieves a comic book series by id
 */
router.get("/series:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const series: Series = await getSeriesById(parseInt(req.params.id, 10));
    res.status(200).json({ series });
  } catch (err) {
    next(err);
  }
});

/**
 * Creates a series if it does not exist and fills it with empty issues
 */
router.post("/series", upload.none(), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const seriesName: string = req.body.seriesName;
    const totalIssues: number = req.body.totalIssues as number;
    const publisherId: number = req.body.publisherId as number;
    const yearBegan: number = req.body.yearBegan as number;
    const yearEnded: number | null = req.body.yearEnded !== "0"? req.body.yearEnded as number : null;
    const insertedSeries: [
      Series,
      boolean
    ] = await insertSeriesIfNotExists(seriesName, totalIssues, publisherId, yearBegan, yearEnded);

    // resource created
    if (insertedSeries[1] === true) {
      const issueArr: {issue_number:number; seriesId:number;is_variant:boolean}[] = [];
      for(let i =0; i < totalIssues; i++){
        issueArr.push({issue_number: i + 1, seriesId:insertedSeries[0].getDataValue("id"), is_variant:false})
      }
      const insertedIssues = await insertManyBlankIssues(issueArr)
      res.status(201).json({"series":insertedSeries[0], "issues":insertedIssues});
    }
    // resource already exists
    else {
      res.status(409).json(insertedSeries[0]);
    }
  } catch (err) {
    next(err);
  }
});

/**
 * Update a series but do not replace it
 */
router.patch(
  "/series/:id",
  upload.none(),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const series: Series = await getSeriesById(parseInt(req.params.id, 10));
        const updatedSeries: Series = await series.update({
          ...req.body,
        });
        res.status(200).json(updatedSeries);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * Deletes a publisher given an id if it exists
 */
router.delete(
  "/series/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const seriesId: number = parseInt(req.params.id, 10);
      const seriesDeleted: number = await deleteSeriesById(seriesId);
      if (seriesDeleted > 0) {
        res.status(204).send(`Deleted series`);
      } else {
        res
          .status(404)
          .send(`Could not find publisher given id ${seriesId}`);
      }
    } catch (err) {
      next(err);
    }
  }
);


export default router;
