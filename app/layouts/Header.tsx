import React from "react";
import { Link, useRouter, useParams } from "blitz";

const Header = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  function isActive(pathname: string) {
    return router.pathname === pathname;
  }

  return (
    <nav className="flex justify-between bg-blue-500 p-4 mb-4">
      <div className="text-2xl">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Home
          </a>
        </Link>
      </div>
      {id ? (
        <div className="text-xl">
          <Link href={`/${id}/create`}>
            <a data-active={isActive(`/${id}/create`)}>Create New Card</a>
          </Link>
        </div>
      ) : (
        <div className="text-xl">
          <Link href={`/create`}>
            <a data-active={isActive("/create")}>Create New Event</a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
