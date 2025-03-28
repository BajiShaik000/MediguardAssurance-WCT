import styles from "components/RenderArrow/styles.module.scss";

export type ArrowConfigArrays = {
  landing_page: ArrowConfig[];
  world_map: ArrowConfig[];
  miami_beach: ArrowConfig[];
  executive_dashboard_before: ArrowConfig[];
  org_chart: ArrowConfig[];
  current_state_architecture: ArrowConfig[];
  scalable_analytics: ArrowConfig[];
  pain_points: ArrowConfig[];
  cdo_dashboard_before: ArrowConfig[];
  //introduction_to_microsoft_fabric_1: ArrowConfig[];
  introduction_to_microsoft_fabric: ArrowConfig[];
  data_platform_for_the_age_of_AI: ArrowConfig[];
  future_state_architecture: ArrowConfig[];
  //future_state_architecture_2: ArrowConfig[];
  benefits_of_fabric: ArrowConfig[];
  lake_house: ArrowConfig[];
  dataware_house: ArrowConfig[];
  cdo_dashboard_after: ArrowConfig[];
  store_overview: ArrowConfig[];
  executive_dashboard_after: ArrowConfig[];
  final_video: ArrowConfig[];
  onelake_explorer: ArrowConfig[];
  finance_revenue_and_profitability: ArrowConfig[];
  customer_churn_report: ArrowConfig[];
  sales_performence_report: ArrowConfig[];
  campaign_analytics_report: ArrowConfig[];
  hr_analytics_report: ArrowConfig[];
  operations_report: ArrowConfig[];
  it_report: ArrowConfig[];
};

interface ToolTip {
  id: number;
  url: keyof ArrowConfigArrays;
  value: string;
}

export const toolTips: ToolTip[] = [
  { id: 0, url: "landing_page", value: "Landing Page" },
  { id: 1, url: "org_chart", value: "Org Chart" },
  { id: 2, url: "world_map", value: "World Map" },
  { id: 3, url: "miami_beach", value: "Miami Beach View" },
  { id: 4, url: "store_overview", value: "Sales Event Video" },
  { id: 5, url: "final_video", value: "Finale + Fireworks Video" },
  {
    id: 6,
    url: "cdo_dashboard_before",
    value: "CDO Metrics - Current State",
  },
  {
    id: 7,
    url: "current_state_architecture",
    value: "Current State Architecture",
  },
  { id: 8, url: "pain_points", value: "Pain Points" },
  {
    id: 9,
    url: "future_state_architecture",
    value: "Microsoft Fabric Dream Demo Architecture",
  },

  { id: 9, url: "benefits_of_fabric", value: "Benefits of Microsoft Fabric" },
  {
    id: 10,
    url: "lake_house",
    value: "Lakehouse Creation Demo (Click-by-Click)",
  },
  {
    id: 11,
    url: "dataware_house",
    value: "Data Warehouse Creation Demo (Click-by-Click)",
  },
  {
    id: 12,
    url: "executive_dashboard_before",
    value: "Executive Dashboard - Before",
  },
  {
    id: 13,
    url: "executive_dashboard_after",
    value: "Executive Dashboard - After",
  },
  { id: 14, url: "cdo_dashboard_after", value: "CDO Metrics - After" },
  // {
  //   id: 14,
  //   url: "introduction_to_microsoft_fabric_1",
  //   value: "Introduction to Microsoft Fabric",
  // },
  {
    id: 15,
    url: "introduction_to_microsoft_fabric",
    value: "Introduction to Microsoft Fabric",
  },
  {
    id: 16,
    url: "data_platform_for_the_age_of_AI",
    value: "The Data Platform for the age of AI",
  },
  { id: 17, url: "scalable_analytics", value: "CDO Top of Mind" },
  {
    id: 24,
    url: "onelake_explorer",
    value: "OneLake Explorer Demo (Click-by-Click)",
  },
  {
    id: 25,
    url: "finance_revenue_and_profitability",
    value: "Finance - Revenue and Profitability",
  },
  {
    id: 18,
    url: "sales_performence_report",
    value: "Sales - Sales Performance",
  },
  {
    id: 19,
    url: "campaign_analytics_report",
    value: "Marketing - Campaign Analytics",
  },
  {
    id: 20,
    url: "customer_churn_report",
    value: "Sales - Customer Churn Report",
  },
  {
    id: 21,
    url: "hr_analytics_report",
    value: "HR - Employee Management",
  },
  {
    id: 22,
    url: "operations_report",
    value: "Operations - Warehouse Operating Expense",
  },
  {
    id: 23,
    url: "it_report",
    value: "IT - IT Operations",
  },
];

// all route definitions are `snake_case`. The urls are generated by exchanging
// underscores (_) with dashes (-)
// this object determines the order for all routes
// TODO: Type does not work - purely informational
export const mainFlow: Array<keyof ArrowConfigArrays> = [
  "landing_page",
  "world_map",
  "miami_beach",
  "executive_dashboard_before",
  "org_chart",
  "current_state_architecture",
  "scalable_analytics",
  // "pain_points",
  "cdo_dashboard_before",
  //"introduction_to_microsoft_fabric_1",
  "introduction_to_microsoft_fabric",
  // "data_platform_for_the_age_of_AI",
  "future_state_architecture",
  // "future_state_architecture_2",
  "lake_house",
  "onelake_explorer",
  "dataware_house",
  "customer_churn_report",
  "sales_performence_report",
  "finance_revenue_and_profitability",
  // "customer_churn_report",
  "campaign_analytics_report",
  "hr_analytics_report",
  "operations_report",
  "it_report",
  // "benefits_of_fabric",
  "store_overview",
  "cdo_dashboard_after",
  "executive_dashboard_after",
  "final_video",
  // "florence_recommendation",
  // "call_center",
  // "smart_factory",
];

export const routeDefinitions = {
  mainFlow,
};

export type ArrowConfig = {
  c?: string; // classname
  a?: string; // arrowname
  l?: string; // link
  n?: keyof ArrowConfigArrays; // next
  openInNewTab?: boolean;
  t?: "default" | "skip" | "custom";
  tooltip?: string;
};

export const arrowConfig: ArrowConfigArrays = {
  landing_page: [{ t: "default" }],
  world_map: [{ t: "default" }],
  org_chart: [{ t: "default" }],
  miami_beach: [{ t: "default" }],
  store_overview: [{ t: "default" }],
  final_video: [{ t: "default", n: "landing_page" }],
  cdo_dashboard_before: [{ t: "default" }],
  current_state_architecture: [{ t: "default" }],
  pain_points: [{ t: "default" }],
  future_state_architecture: [
    { t: "default" },
    {
      openInNewTab: true,
      a: "Arrow-A.png",
      c: styles.externalArrowA,
      t: "default",
      l: "https://app.powerbi.com/home?experience=fabric",
      tooltip: "Microsoft Fabric Backend",
    },
  ],
  // future_state_architecture_2: [{ t: "default" }],
  lake_house: [{ t: "default" }],
  dataware_house: [{ t: "default" }],
  benefits_of_fabric: [{ t: "default" }],
  executive_dashboard_before: [{ t: "default" }],
  executive_dashboard_after: [{ t: "default" }],
  cdo_dashboard_after: [{ t: "default" }],
  //introduction_to_microsoft_fabric_1: [{ t: "default" }],
  introduction_to_microsoft_fabric: [{ t: "default" }],
  data_platform_for_the_age_of_AI: [{ t: "default" }],
  finance_revenue_and_profitability: [{ t: "default" }],
  onelake_explorer: [{ t: "default" }],
  customer_churn_report: [{ t: "default" }],
  sales_performence_report: [{ t: "default" }],
  campaign_analytics_report: [{ t: "default" }],
  hr_analytics_report: [{ t: "default" }],
  operations_report: [{ t: "default" }],
  it_report: [{ t: "default" }],
  scalable_analytics: [{ t: "default" }],
};
