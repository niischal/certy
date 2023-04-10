import { FaHome } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { TbCertificate } from "react-icons/tb";
const IssuerRoutes = [
  {
    id: 1,
    path: "/issuer",
    name: "Home",
    icon: <FaHome />,
  },
  {
    id: 2,
    path: "/issuer/programList",
    name: "Program List",
    icon: <SiGoogleclassroom />,
  },
  {
    id: 3,
    path: "/issuer/issueCertificate",
    name: "Issue Certificate",
    icon: <TbCertificate />,
  }
];

export default IssuerRoutes;
