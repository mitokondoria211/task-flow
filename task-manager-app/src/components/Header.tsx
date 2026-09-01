import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-700 text-gray-300 flex justify-between items-center">
      <Link to={"/"}>
        <h1 className=" p-4 font-bold text-2xl">タスク管理</h1>
      </Link>
      <nav className="">
        <ul className="flex gap-4 font-bold mr-4">
          <li>
            <Link to={"dashboard"}>ダッシュボード</Link>
          </li>
          <li>
            <Link to={"tasks"}>タスク一覧</Link>
          </li>
          <li>
            <Link to={"tasks/new"}>タスク作成</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
