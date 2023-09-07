import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { favoriteAudioPlayersValidationSchema } from 'validationSchema/favorite-audio-players';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.favorite_audio_players
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getFavoriteAudioPlayersById();
    case 'PUT':
      return updateFavoriteAudioPlayersById();
    case 'DELETE':
      return deleteFavoriteAudioPlayersById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFavoriteAudioPlayersById() {
    const data = await prisma.favorite_audio_players.findFirst(
      convertQueryToPrismaUtil(req.query, 'favorite_audio_players'),
    );
    return res.status(200).json(data);
  }

  async function updateFavoriteAudioPlayersById() {
    await favoriteAudioPlayersValidationSchema.validate(req.body);
    const data = await prisma.favorite_audio_players.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteFavoriteAudioPlayersById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.favorite_audio_players.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
