import AddTourType from "@/pages/Admin/AddTourType";
import manageUser from "@/pages/Admin/manageUser";
import AllTransactionsTable from "@/pages/Admin/AllTransactionsTable";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";
import AgentManagement from "@/pages/Admin/AgentManagement";
import Profile from "@/pages/Admin/Profile";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour Management",
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
        title: "remove Tour",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
    
      {
        title: "allTransactions",
        url: "/admin/all-transactions",
        component: AllTransactionsTable ,
      },
        {
        title: "Profile Management",
        url: "/admin/profile-management",
        component: Profile,
      },
    ],
  },
];