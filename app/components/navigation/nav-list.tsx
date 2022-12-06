import { Form } from "@remix-run/react";
import { useState } from "react";
import { PeopleIcon } from "~/components/icons/people-icon";
import { SoccerIcon } from "~/components/icons/soccer-icon";
import type { UserWithRanking } from "~/routes/game";
import { PersonIcon } from "../icons/person-icon";
import { PowerIcon } from "../icons/power-icon";
import { NavLinkItem } from "./navlink-item";

export interface NavListProps {
  user?: UserWithRanking;
  type: "desktop" | "mobile";
}

export function NavList({ user, type }: NavListProps) {
  const [isOpenAccountPopup, setIsOpenAccountPopup] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  return (
    <nav className={`${type === "desktop" ? "max-xl:hidden" : ""}`}>
      <ul className={`flex ${type === "desktop" ? "gap-12" : "flex-col"}`}>
        <li>
          <NavLinkItem
            to="/game"
            prefetch="intent"
            end
            className="flex items-center gap-2 p-4"
            icon={
              <SoccerIcon
                width="20px"
                height="20px"
                fill="var(--bright-purple)"
              />
            }
          >
            Matches
          </NavLinkItem>
        </li>
        <li>
          <NavLinkItem
            to="/game/group-stage"
            prefetch="intent"
            end
            className="flex items-center gap-2 p-4"
            icon={
              <SoccerIcon
                width="20px"
                height="20px"
                fill="var(--bright-purple)"
              />
            }
          >
            Group Stage
          </NavLinkItem>
        </li>
        <li>
          <NavLinkItem
            to="/game/playoff-stage"
            prefetch="intent"
            end
            className="flex items-center gap-2 p-4"
            icon={
              <SoccerIcon
                width="20px"
                height="20px"
                fill="var(--bright-purple)"
              />
            }
          >
            Playoff Stage
          </NavLinkItem>
        </li>
        <li>
          <NavLinkItem
            to="/game/ranking"
            prefetch="intent"
            className="flex items-center gap-2 p-4"
            icon={<PeopleIcon />}
          >
            Ranking
          </NavLinkItem>
        </li>
        {isAdmin ? (
          <li>
            <NavLinkItem
              to="/game/admin/matches"
              prefetch="intent"
              className="flex items-center gap-2 p-4"
              icon={<PersonIcon fill="var(--bright-purple)" />}
            >
              Admin
            </NavLinkItem>
          </li>
        ) : null}

        {type === "mobile" ? (
          <Form action="/logout" method="post">
            <button
              type="submit"
              className="flex items-center gap-2 p-4 hover:text-brighter-purple"
            >
              <PowerIcon />
              Logout
            </button>
          </Form>
        ) : null}

        {type === "desktop" ? (
          <li className="relative -mr-4">
            <button
              type="button"
              className="flex items-center gap-2 p-4 w-full justify-center hover:text-brighter-purple"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setIsOpenAccountPopup(!isOpenAccountPopup)}
            >
              <PersonIcon fill="var(--bright-purple)" />
              Account
            </button>

            {isOpenAccountPopup ? (
              <div
                className="absolute top-full right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
                <div className="py-1" role="none">
                  <div className="w-full px-4 py-2">
                    <span className="text-12-regular text-dark-blue">
                      Account Name
                    </span>
                    <span className="text-dark-blue whitespace-nowrap text-ellipsis overflow-hidden">
                      {user?.username}
                    </span>
                  </div>

                  <hr />

                  <Form action="/logout" method="post">
                    <button
                      type="submit"
                      className="px-4 py-2 w-full text-left text-bright-purple hover:text-brighter-purple"
                      role="menuitem"
                      tabIndex={-1}
                      id="menu-item-3"
                    >
                      Logout
                    </button>
                  </Form>
                </div>
              </div>
            ) : null}
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
