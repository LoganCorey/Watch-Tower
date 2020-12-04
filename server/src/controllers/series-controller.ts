import Series from "../models/series";
import Issues from "../models/issue";
// import CollectedIssue from '../models/collected-issue';
import Publisher from "../models/publisher";
import Issue from "../models/issue";

export const getAllSeries = (): Promise<Series[]> => {
  return Series.findAll({ include: [Publisher, Issue] });
};

export const getSeriesById = (seriesId: number): Promise<Series> => {
  return Series.findOne({
    include: [Publisher, Issue],
    where: {
      id: seriesId,
    },
  });
};

export const getSeriesAndIssuesById = (seriesId: number): Promise<Series> => {
  return Series.findOne({
    include: [Publisher, Issue],
    where: {
      id: seriesId,
    },
  });
};

export const insertSeriesIfNotExists = (
  seriesName: string,
  totalIssues: number,
  publisherId: number,
  yearBegan: number,
  yearEnded: number | null,
): Promise<[Series, boolean]> => {
  return Series.findOrCreate({
    where: {
      name: seriesName,
      total_issues: totalIssues,
      year_began: yearBegan,
      year_ended: yearEnded,
      publisherId,
    },
    defaults: {
      name: seriesName,
      total_issues: totalIssues,
      year_began: yearBegan,
      year_ended: yearEnded,
      publisherId,
    },
  });
};


/**
 *  Deletes a series from the table given an id
 * @param id id of series
 * @returns returns the number of series destoryed
 */
export const deleteSeriesById = (id: number): Promise<number> => {
  return Series.destroy({
    where: {
      id,
    },
  });
};
