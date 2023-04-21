import { FaHome, FaUser, FaReadme } from "react-icons/fa";
const AdminRoutes = [
  {
    id: 1,
    path: "/admin",
    name: "Home",
    icon: <FaHome />,
  },
  {
    id: 2,
    path: "/admin/issuerList",
    name: "Issuer List",
    icon: <FaUser />,
  },
  {
    id: 3,
    path: "/admin/issuerRequest",
    name: "Pending Request",
    icon: <FaReadme />,
  },
];

export default AdminRoutes;
