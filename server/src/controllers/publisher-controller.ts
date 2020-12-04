import { fstat } from "fs";
import Publisher from "../models/publisher";

/**
 * Retrieves all publishers from the database
 */
export const getAllPublishers = (): Promise<Publisher[]> => {
  return Publisher.findAll();
};

/**
 *  Adds a publisher if the name is not already in the table
 * @param publisherName name of the publisher being added
 * @returns returns an array that at index 0 contains the publisher and index 1 contains true if
 *          a publisher was created otherwise false
 */
export const insertPublisherIfNotExists = (
  publisherName: string,
  publisherImagePath: string,
): Promise<[Publisher, boolean]> => {
  return Publisher.findOrCreate({
    where: {
      name: publisherName,
    },
    defaults: {
      name: publisherName,
      publisher_image: publisherImagePath,
    },
  });
};


export const getPublisherById = (id: number): Promise<Publisher> => {
  return Publisher.findOne({
    where: {
      id,
    },
  });
};

/**
 *  Deletes a publisher from the table given an id
 * @param id id of publisher
 * @returns returns the number of publishers destoryed
 */
export const deletePublisherById = (id: number): Promise<number> => {
  return Publisher.destroy({
    where: {
      id,
    },
  });
};
