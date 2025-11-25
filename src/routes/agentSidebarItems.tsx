
import AgentDashboard from "@/pages/Agent/AgentDashboard";
import CashOut from "@/pages/Agent/Cashout";
import Commissions from "@/pages/Agent/Commissions";
import Profile from "@/pages/Agent/Profile";
import Transactions from "@/pages/Agent/Transactions";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/Agent/AddMoney"));
export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [

       {
        title: "AgentDashboard",
        url: "/agent/agent-dashboard",
        component: AgentDashboard,
      },
    
      {
        title: "AgentCashIn",
        url: "/agent/add-money",
        component: AddMoney,
      },
          {
        title: "AgentCashOut",
        url: "/agent/cashout-user",
        component: CashOut ,
      },
          {
        title: "Commissions",
        url: "/agent/commissions",
        component: Commissions,
      },
          {
        title: "Transactions",
        url: "/agent/transactions",
        component: Transactions,
      },
          {
        title: "Profile",
        url: "/agent/profile",
        component: Profile,
      },
    ],
  },
];