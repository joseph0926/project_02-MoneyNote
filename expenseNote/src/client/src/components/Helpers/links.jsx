import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "all Expenses",
    path: "money",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "add Expense",
    path: "money/add-money",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "Mypage",
    path: "setting",
    icon: <ImProfile />,
  },
];

export default links;
