import { HttpError } from 'wasp/server'

export const getSearches = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Search.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getSearch = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const search = await context.entities.Search.findUnique({
    where: { id: args.id, userId: context.user.id }
  });

  if (!search) { throw new HttpError(400, 'Search entity does not exist or does not belong to the user') };

  return search;
}