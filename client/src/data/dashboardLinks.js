import {
  MdDashboard,
  MdOutlineDashboard,
  MdOutlineVideoLibrary,
  MdVideoLibrary,
} from "react-icons/md";
import { RiRobot2Fill, RiRobot2Line } from "react-icons/ri";
import { SlPhone } from "react-icons/sl";
import { ImPhone } from "react-icons/im";
import {
  PiCalculatorFill,
  PiCalculatorDuotone,
  PiChalkboardTeacher,
} from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

const dashboardLinks = [
  {
    label: "Dashboard",
    ActiveIcon: MdDashboard,
    InActiveIcon: MdOutlineDashboard,
    path: "/dashboard",
  },
  {
    label: "Ai companion",
    ActiveIcon: RiRobot2Fill,
    InActiveIcon: RiRobot2Line,
    path: "/ai-companion",
  },
  {
    label: "Mentors",
    ActiveIcon: FaChalkboardTeacher,
    InActiveIcon: PiChalkboardTeacher,
    path: "/mentors",
  },
  {
    label: "Tutorials",
    ActiveIcon: MdVideoLibrary,
    InActiveIcon: MdOutlineVideoLibrary,
    path: "/tutorials",
  },
  {
    label: "Lot Size Calculator",
    ActiveIcon: PiCalculatorFill,
    InActiveIcon: PiCalculatorDuotone,
    path: "/ls-calculator",
  },
  {
    label: "Contact Us",
    ActiveIcon: ImPhone,
    InActiveIcon: SlPhone,
    path: "/contact-us",
  },
];

export default dashboardLinks;
