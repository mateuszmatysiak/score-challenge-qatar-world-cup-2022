import type { Prisma } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MatchCard } from "~/components/MatchCard";

import { db } from "~/utils/db.server";
import { requireAdminUser } from "~/utils/session.server";

type TournamentMatches = Prisma.TournamentMatchGetPayload<{
  select: {
    id: true;
    homeTeamScore: true;
    awayTeamScore: true;
    goalScorer: true;
    match: {
      select: {
        id: true;
        group: true;
        playoff: true;
        homeTeam: true;
        awayTeam: true;
        stadium: true;
        stage: true;
        startDate: true;
        tournamentMatches: true;
      };
    };
  };
}>;

interface LoaderData {
  tournamentMatches: TournamentMatches[];
}

export const loader: LoaderFunction = async ({ request }) => {
  await requireAdminUser(request);

  /* Pobieranie meczów odbywających się na turnieju */

  const tournamentMatches = await db.tournamentMatch.findMany({
    orderBy: { match: { startDate: "asc" } },
    select: {
      id: true,
      homeTeamScore: true,
      awayTeamScore: true,
      goalScorer: true,
      match: {
        select: {
          id: true,
          group: true,
          playoff: true,
          homeTeam: true,
          awayTeam: true,
          stadium: true,
          stage: true,
          startDate: true,
          tournamentMatches: true,
        },
      },
    },
  });

  return json({ tournamentMatches });
};

export default function AdminMatchesRoute() {
  const { tournamentMatches } = useLoaderData<LoaderData>();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-48-bold max-sm:text-30-bold">Tournament Matches</h1>

      <div className="flex flex-wrap gap-4">
        {tournamentMatches.map(({ id, ...tournamentMatch }) => (
          <MatchCard
            key={id}
            values={tournamentMatch}
            toMatch={`/game/admin/matches/match-${tournamentMatch.match.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <p className="text-20-medium">{`There was an error loading tournament matches. Sorry.`}</p>
  );
}
