
import Commissions from "@/pages/Agent/Commissions";
import Profile from "@/pages/Agent/Profile";
import Transactions from "@/pages/Agent/Transactions";
import WithdrawMoney from "@/pages/Agent/WithdrawMoney";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AddMoney = lazy(() => import("@/pages/Agent/AddMoney"));
export const agentSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
    
      {
        title: "AddMoney",
        url: "/agent/add-money",
        component: AddMoney,
      },
          {
        title: "Withdraw",
        url: "/agent/withdraw-user",
        component: WithdrawMoney,
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