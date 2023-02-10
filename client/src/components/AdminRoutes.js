import { FaHome, FaUser, FaReadme } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { TbCertificate } from "react-icons/tb";
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
  {
    id: 4,
    path: "/admin/programList",
    name: "Program List",
    icon: <SiGoogleclassroom />,
  },
  {
    id: 5,
    path: "/admin/issueCertificate",
    name: "Issue Certificate",
    icon: <TbCertificate />,
  },
];

export default AdminRoutes;
