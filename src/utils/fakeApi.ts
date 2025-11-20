// Define a type for a single feature
export interface Feature {
  id: number;
  title: string;
  desc: string;
}

// Return a Promise of Feature[]
export async function fakeFetchFeatures(): Promise<Feature[]> {
  return new Promise<Feature[]>((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Savings", desc: "Secure savings accounts with high interest" },
        { id: 2, title: "Credit Cards", desc: "Rewards and low APR cards" },
        { id: 3, title: "Investment", desc: "Grow your wealth with guidance" },
        { id: 4, title: "Insurance", desc: "Protect what's important" },
      ]);
    }, 900);
  });
}
