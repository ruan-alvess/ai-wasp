import { HttpError } from 'wasp/server'

export const createSearch = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newSearch = await context.entities.Search.create({
    data: {
      query: args.query,
      results: performWebSearch(args.query),
      user: { connect: { id: context.user.id } }
    }
  });

  return newSearch;
}

export const deleteSearch = async ({ searchId }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const search = await context.entities.Search.findUnique({
    where: { id: searchId }
  });
  if (!search || search.userId !== context.user.id) { throw new HttpError(400) };
  await context.entities.Search.delete({
    where: { id: searchId }
  });
}