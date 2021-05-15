/*import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
*/

import Costos from "views/Cost.js";
import CostoFijo from "views/CostFixed";
import Dashboard from "views/DashBoard.js";
import Profile from "views/Profile.js";
import Report from "views/Report.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/costs",
    name: "Costos",
    icon: "nc-icon nc-money-coins",
    component: Costos,
    layout: "/admin",
  },
  {
    path: "/fixed",
    name: "Costos Fijos",
    icon: "nc-icon nc-credit-card",
    component: CostoFijo,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Perfil",
    icon: "nc-icon nc-single-02",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/reports",
    name: "Reportes",
    icon: "nc-icon nc-single-copy-04",
    component: Report,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: /*Dashboard*/'',
    layout: "/admin",
  },
  {
    pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: /*Dashboard*/'',
    layout: "/admin",
  },
];
export default routes;
