import manageUser from "@/pages/Admin/manageUser";
import AllTransactionsTable from "@/pages/Admin/AllTransactionsTable";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
import AgentManagement from "@/pages/Admin/AgentManagement";
import Profile from "@/pages/Admin/Profile";
import ChangePassword from "@/pages/Admin/ChangePassword";

const AdminOverview = lazy(() => import("@/pages/Admin/AdminOverview"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "AdminOverview",
        url: "/admin/analytics",
        component: AdminOverview,
      },
    ],
  },
  {
    title: "Dashboard Management",
    items: [
      {
        title: " User Management",
        url: "/admin/add-user",
        component: manageUser,
      },
      {
        title: "Agent Management",
        url: "/admin/agent-management",
        component: AgentManagement,
      },
    
      {
        title: "allTransactions",
        url: "/admin/all-transactions",
        component: AllTransactionsTable ,
      },
        {
        title: "Profile",
        url: "/admin/profile",
        component: Profile,
      },
      {
        title: "change-password",
        url: "/admin/change-password",
        component: ChangePassword,
      }
    ],
  },
];