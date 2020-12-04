import Issue from "../models/issue";
import { Op } from "sequelize";
import {IssueData} from '../types/types';
/**
 * Retrieves every Issue in the issue table
 */
export const getAllIssues = (): Promise<Issue[]> => {
  return Issue.findAll();
};

/**
 * Retrieves a single issue by id
 * @param issueId id of the issue
 */
export const getIssueById = (issueId: number): Promise<Issue> => {
  return Issue.findOne({
    where: {
      id: issueId,
    },
  });
};

/**
 * Deletes issue with associate id
 * @param issueId id of the issue being deleted
 * @return returns number of items deleted
 */
export const deleteIssueById = (issueId: number): Promise<number> => {
  return Issue.destroy({
    where: {
      id: issueId,
    },
  });
};

/**
 * Deletes all issues with associated ids
 * @param issueId id of the issue being deleted
 * @return returns number of items deleted
 */
export const deleteManyIssuesByIds = (issueIds: number[]): Promise<number> => {
  return Issue.destroy({
    where: {
      id: {
        [Op.in]: issueIds,
      },
    },
  });
};

export const insertIssue = ( issueData: IssueData): Promise<Issue> => {
  return Issue.create({
    issue_number: issueData.issueNumber,
    series_id: issueData.seriesId,
    is_variant: issueData.isVariant,
    variant_info: issueData.variantInfo,
    publication_date: issueData.publicationDate,
  });
};

/**
 * Function is to be used to initialize a series
 * @param issues only contains the issue number and series being added to
 */
export const insertManyBlankIssues = (
  issues: { issue_number: number; seriesId: number; is_variant:boolean }[]
): Promise<Issue[]> => {
  return Issue.bulkCreate(issues);
};


/**
 * Function is to be used to initialize a series
 * @param issues only contains the issue number and series being added to
 */
export const updateIssueImage = (
 issueId: number,
 imagePath: string,
): Promise<Issue> => {
  return Issue.findOne({
    where: {
      id: issueId,
    }
  }).then((issue:Issue)=>{
    return issue.update({
      cover_path: imagePath,
    })
  })
};
