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
    <nav className="flex justify-between bg-gray-600 p-4 mb-4">
      <div> </div>
      {/* <div className="text-2xl">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Home
          </a>
        </Link>
      </div> */}
      <div className="text-2xl text-primary">
        <Link href="/create">
          <a className="">Create a New Event</a>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
