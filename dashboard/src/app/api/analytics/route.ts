import { NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const runtime = "nodejs";

type DashboardData = {
  lastUpdated: string;
  kpis: {
    label: string;
    value: string;
    change: number;
    trend: number[];
  }[];
  trafficOverview: {
    area: {
      date: string;
      organic: number;
      paid: number;
      referral: number;
      social: number;
      email: number;
    }[];
    channels: { name: string; value: number; color: string }[];
  };
  paid: {
    kpis: { label: string; value: string; change: number }[];
    daily: { date: string; spend: number; conversions: number }[];
  };
  organic: {
    kpis: { label: string; value: string; change: number }[];
    trend: { date: string; sessions: number }[];
    topPages: { page: string; sessions: number; change: number }[];
  };
  funnel: { step: string; value: number; drop: number }[];
  contentPerformance: {
    page: string;
    pageviews: number;
    avgTime: string;
    bounceRate: string;
  }[];
  revenueBySource: {
    source: string;
    sessions: number;
    leads: number;
    purchases: number;
    revenue: number;
    change: number;
  }[];
  raw: {
    sessions: { date: string; value: number }[];
    users: { date: string; value: number }[];
    pageviews: { date: string; value: number }[];
    sources: { source: string; sessions: number }[];
    topPages: { page: string; pageviews: number }[];
    events: { name: string; count: number }[];
  };
  isMock: boolean;
};

const CACHE_TTL_MS = 15 * 60 * 1000;
let cache = new Map<string, { timestamp: number; data: DashboardData }>();

function demoData(): DashboardData {
  const today = new Date();
  const lastUpdated = today.toISOString();
  const dates = Array.from({ length: 14 }).map((_, index) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (13 - index));
    return d.toISOString().slice(0, 10);
  });

  return {
    lastUpdated,
    kpis: [
      { label: "Sessions", value: "128,430", change: 12.4, trend: [90, 95, 88, 102, 110, 115, 120, 126] },
      { label: "Users", value: "64,882", change: 8.1, trend: [60, 62, 58, 64, 68, 70, 73, 76] },
      { label: "Email Signups", value: "9,412", change: 5.9, trend: [4, 5, 4.2, 5.4, 6.1, 6.4, 6.8, 7.2] },
      { label: "Revenue", value: "$84,120", change: -3.2, trend: [10, 9.6, 9.8, 9.1, 8.7, 8.9, 8.5, 8.2] },
    ],
    trafficOverview: {
      area: dates.map((date, idx) => ({
        date,
        organic: 220 + idx * 6,
        paid: 120 + idx * 4,
        referral: 60 + idx * 3,
        social: 80 + idx * 2,
        email: 40 + idx * 2,
      })),
      channels: [
        { name: "Organic", value: 44, color: "#4ade80" },
        { name: "Paid", value: 26, color: "#a8dadc" },
        { name: "Referral", value: 14, color: "#f6bd60" },
        { name: "Social", value: 10, color: "#ffafcc" },
        { name: "Email", value: 6, color: "#9bf6ff" },
      ],
    },
    paid: {
      kpis: [
        { label: "Spend", value: "$18,420", change: 6.4 },
        { label: "Clicks", value: "52,114", change: 4.9 },
        { label: "Impressions", value: "810k", change: 3.2 },
        { label: "CTR", value: "6.4%", change: 0.8 },
        { label: "CPC", value: "$0.35", change: -1.9 },
        { label: "Conversions", value: "2,184", change: 5.1 },
      ],
      daily: dates.map((date, idx) => ({
        date,
        spend: 800 + idx * 30,
        conversions: 80 + idx * 4,
      })),
    },
    organic: {
      kpis: [
        { label: "Organic Sessions", value: "72,410", change: 9.6 },
        { label: "Organic Users", value: "41,920", change: 6.2 },
        { label: "Pages Indexed", value: "1,482", change: 2.1 },
      ],
      trend: dates.map((date, idx) => ({
        date,
        sessions: 420 + idx * 12,
      })),
      topPages: [
        { page: "/sleep-calculator", sessions: 12840, change: 8.2 },
        { page: "/sleep-tips", sessions: 10420, change: 4.4 },
        { page: "/melatonin-guide", sessions: 8240, change: -2.1 },
        { page: "/bedtime-routine", sessions: 7420, change: 3.7 },
        { page: "/sleep-score", sessions: 6840, change: 5.5 },
      ],
    },
    funnel: [
      { step: "Sessions", value: 128430, drop: 0 },
      { step: "Calculator", value: 81420, drop: 36.6 },
      { step: "Email Signup", value: 9412, drop: 88.4 },
      { step: "Sales Page", value: 5210, drop: 44.6 },
      { step: "Checkout", value: 2140, drop: 58.9 },
      { step: "Purchase", value: 1284, drop: 40.0 },
    ],
    contentPerformance: [
      { page: "/sleep-calculator", pageviews: 42840, avgTime: "3m 12s", bounceRate: "38%" },
      { page: "/sleep-tips", pageviews: 36210, avgTime: "2m 44s", bounceRate: "41%" },
      { page: "/melatonin-guide", pageviews: 24820, avgTime: "2m 02s", bounceRate: "52%" },
      { page: "/bedtime-routine", pageviews: 21480, avgTime: "2m 28s", bounceRate: "45%" },
      { page: "/sleep-score", pageviews: 19440, avgTime: "1m 54s", bounceRate: "49%" },
    ],
    revenueBySource: [
      { source: "Google Ads", sessions: 24840, leads: 4120, purchases: 720, revenue: 32400, change: 6.8 },
      { source: "Organic Search", sessions: 52420, leads: 6120, purchases: 920, revenue: 28420, change: 4.2 },
      { source: "Affiliate", sessions: 14220, leads: 1920, purchases: 310, revenue: 12480, change: -1.6 },
      { source: "Email", sessions: 8120, leads: 1640, purchases: 240, revenue: 6420, change: 2.3 },
      { source: "Social", sessions: 6840, leads: 820, purchases: 140, revenue: 3380, change: -3.2 },
    ],
    raw: {
      sessions: dates.map((date, index) => ({ date, value: 900 + index * 18 })),
      users: dates.map((date, index) => ({ date, value: 420 + index * 12 })),
      pageviews: dates.map((date, index) => ({ date, value: 1300 + index * 20 })),
      sources: [
        { source: "Organic", sessions: 52000 },
        { source: "Paid", sessions: 31000 },
        { source: "Referral", sessions: 18200 },
        { source: "Social", sessions: 12400 },
        { source: "Email", sessions: 9200 },
      ],
      topPages: [
        { page: "/sleep-calculator", pageviews: 42840 },
        { page: "/sleep-tips", pageviews: 36210 },
        { page: "/melatonin-guide", pageviews: 24820 },
        { page: "/bedtime-routine", pageviews: 21480 },
        { page: "/sleep-score", pageviews: 19440 },
      ],
      events: [
        { name: "calculator_start", count: 8420 },
        { name: "email_signup", count: 9412 },
        { name: "checkout_start", count: 2140 },
        { name: "purchase", count: 1284 },
      ],
    },
    isMock: true,
  };
}

function parseServiceAccountKey(rawKey: string) {
  // Try direct JSON parse first
  try {
    const parsed = JSON.parse(rawKey);
    if (parsed.private_key) {
      parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
    }
    return parsed;
  } catch {
    // Try base64 decode
    try {
      const decoded = Buffer.from(rawKey, "base64").toString("utf-8");
      const parsed = JSON.parse(decoded);
      if (parsed.private_key) {
        parsed.private_key = parsed.private_key.replace(/\\n/g, "\n");
      }
      return parsed;
    } catch {
      throw new Error("Failed to parse service account key as JSON or base64");
    }
  }
}

async function fetchGa4Data(propertyId: string, rawKey: string) {
  const key = parseServiceAccountKey(rawKey);
  const client = new BetaAnalyticsDataClient({
    credentials: {
      client_email: key.client_email,
      private_key: String(key.private_key ?? "").replace(/\\n/g, "\n"),
    },
  });

  const dateRanges = [{ startDate: "30daysAgo", endDate: "today" }];

  const [sessionsReport] = await client.runReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: "date" }],
    metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "screenPageViews" }],
    dateRanges,
  });

  const [channelsReport] = await client.runReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: "sessionDefaultChannelGroup" }],
    metrics: [{ name: "sessions" }],
    dateRanges,
  });

  const [pagesReport] = await client.runReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    dateRanges,
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit: 5,
  });

  const [eventsReport] = await client.runReport({
    property: `properties/${propertyId}`,
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dateRanges,
    orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
    limit: 6,
  });

  const sessions = sessionsReport.rows?.map((row) => ({
    date: row.dimensionValues?.[0]?.value ?? "",
    value: Number(row.metricValues?.[0]?.value ?? 0),
  })) ?? [];

  const users = sessionsReport.rows?.map((row) => ({
    date: row.dimensionValues?.[0]?.value ?? "",
    value: Number(row.metricValues?.[1]?.value ?? 0),
  })) ?? [];

  const pageviews = sessionsReport.rows?.map((row) => ({
    date: row.dimensionValues?.[0]?.value ?? "",
    value: Number(row.metricValues?.[2]?.value ?? 0),
  })) ?? [];

  const sources = channelsReport.rows?.map((row) => ({
    source: row.dimensionValues?.[0]?.value ?? "Unknown",
    sessions: Number(row.metricValues?.[0]?.value ?? 0),
  })) ?? [];

  const topPages = pagesReport.rows?.map((row) => ({
    page: row.dimensionValues?.[0]?.value ?? "/",
    pageviews: Number(row.metricValues?.[0]?.value ?? 0),
  })) ?? [];

  const events = eventsReport.rows?.map((row) => ({
    name: row.dimensionValues?.[0]?.value ?? "event",
    count: Number(row.metricValues?.[0]?.value ?? 0),
  })) ?? [];

  return { sessions, users, pageviews, sources, topPages, events };
}

function buildDashboardFromRaw(raw: DashboardData["raw"]): DashboardData {
  const demo = demoData();
  const totalSessions = raw.sessions.reduce((acc, item) => acc + item.value, 0);
  const totalUsers = raw.users.reduce((acc, item) => acc + item.value, 0);
  const totalPageviews = raw.pageviews.reduce((acc, item) => acc + item.value, 0);

  const totalSourceSessions = raw.sources.reduce((acc, item) => acc + item.sessions, 0) || 1;

  // Map GA4 channel names to our color scheme
  const channelColorMap: Record<string, string> = {
    "Organic Search": "#4ade80",
    "Paid Search": "#a8dadc",
    "Direct": "#f6bd60",
    "Referral": "#ffafcc",
    "Organic Social": "#9bf6ff",
    "Email": "#c4b5fd",
    "Unassigned": "#64748b",
    "Cross-network": "#fb923c",
    "Paid Social": "#f472b6",
    "Display": "#fbbf24",
  };

  const defaultColors = ["#4ade80", "#a8dadc", "#f6bd60", "#ffafcc", "#9bf6ff", "#c4b5fd", "#64748b"];

  const trafficChannels = raw.sources
    .sort((a, b) => b.sessions - a.sessions)
    .map((item, index) => ({
      name: item.source,
      value: Math.round((item.sessions / totalSourceSessions) * 100),
      color: channelColorMap[item.source] ?? defaultColors[index % defaultColors.length],
    }));

  // Build channel ratios from actual source data for area chart
  const channelRatios: Record<string, number> = {};
  for (const src of raw.sources) {
    const key = src.source.toLowerCase().includes("organic") ? "organic"
      : src.source.toLowerCase().includes("paid") ? "paid"
      : src.source.toLowerCase().includes("referral") ? "referral"
      : src.source.toLowerCase().includes("social") ? "social"
      : src.source.toLowerCase().includes("email") ? "email"
      : src.source.toLowerCase().includes("direct") ? "referral"
      : "referral";
    channelRatios[key] = (channelRatios[key] ?? 0) + src.sessions;
  }
  const ratioTotal = Object.values(channelRatios).reduce((a, b) => a + b, 0) || 1;

  const area = raw.sessions.slice(-14).map((item) => ({
    date: item.date,
    organic: Math.round(item.value * (channelRatios.organic ?? 0) / ratioTotal),
    paid: Math.round(item.value * (channelRatios.paid ?? 0) / ratioTotal),
    referral: Math.round(item.value * (channelRatios.referral ?? 0) / ratioTotal),
    social: Math.round(item.value * (channelRatios.social ?? 0) / ratioTotal),
    email: Math.round(item.value * (channelRatios.email ?? 0) / ratioTotal),
  }));

  const emailSignups = raw.events.find(e => e.name === "email_signup")?.count ?? 0;
  const purchases = raw.events.find(e => e.name === "purchase")?.count ?? 0;
  const checkouts = raw.events.find(e => e.name === "checkout_click" || e.name === "begin_checkout")?.count ?? 0;
  const calculatorUsed = raw.events.find(e => e.name === "calculator_used" || e.name === "calculator_start")?.count ?? 0;
  const salesPageViews = raw.events.find(e => e.name === "sales_page_view")?.count ?? 0;

  return {
    lastUpdated: new Date().toISOString(),
    kpis: [
      { label: "Sessions", value: totalSessions.toLocaleString(), change: 0, trend: raw.sessions.slice(-8).map(s => s.value) },
      { label: "Users", value: totalUsers.toLocaleString(), change: 0, trend: raw.users.slice(-8).map(u => u.value) },
      { label: "Email Signups", value: emailSignups.toLocaleString(), change: 0, trend: [0,0,0,0,0,0,0,0] },
      { label: "Revenue", value: "$0", change: 0, trend: [0,0,0,0,0,0,0,0] },
    ],
    trafficOverview: {
      area,
      channels: trafficChannels,
    },
    paid: {
      kpis: [
        { label: "Spend", value: "$0", change: 0 },
        { label: "Clicks", value: "0", change: 0 },
        { label: "Impressions", value: "0", change: 0 },
        { label: "CTR", value: "0%", change: 0 },
        { label: "CPC", value: "$0", change: 0 },
        { label: "Conversions", value: "0", change: 0 },
      ],
      daily: area.map(d => ({ date: d.date, spend: 0, conversions: 0 })),
    },
    organic: {
      kpis: [
        { label: "Organic Sessions", value: (raw.sources.find(s => s.source === "Organic Search")?.sessions ?? 0).toLocaleString(), change: 0 },
        { label: "Organic Users", value: "0", change: 0 },
        { label: "Pages Indexed", value: raw.topPages.length.toLocaleString(), change: 0 },
      ],
      trend: raw.sessions.slice(-14).map(s => ({ date: s.date, sessions: Math.round(s.value * (channelRatios.organic ?? 0) / ratioTotal) })),
      topPages: raw.topPages.map(page => ({
        page: page.page,
        sessions: page.pageviews,
        change: 0,
      })),
    },
    funnel: [
      { step: "Sessions", value: totalSessions, drop: 0 },
      { step: "Calculator", value: calculatorUsed, drop: totalSessions > 0 ? Math.round((1 - calculatorUsed / totalSessions) * 100 * 10) / 10 : 0 },
      { step: "Email Signup", value: emailSignups, drop: calculatorUsed > 0 ? Math.round((1 - emailSignups / calculatorUsed) * 100 * 10) / 10 : 0 },
      { step: "Sales Page", value: salesPageViews, drop: emailSignups > 0 ? Math.round((1 - salesPageViews / emailSignups) * 100 * 10) / 10 : 0 },
      { step: "Checkout", value: checkouts, drop: salesPageViews > 0 ? Math.round((1 - checkouts / salesPageViews) * 100 * 10) / 10 : 0 },
      { step: "Purchase", value: purchases, drop: checkouts > 0 ? Math.round((1 - purchases / checkouts) * 100 * 10) / 10 : 0 },
    ],
    contentPerformance: raw.topPages.map(page => ({
      page: page.page,
      pageviews: page.pageviews,
      avgTime: "—",
      bounceRate: "—",
    })),
    revenueBySource: raw.sources.map(s => ({
      source: s.source,
      sessions: s.sessions,
      leads: 0,
      purchases: 0,
      revenue: 0,
      change: 0,
    })),
    raw,
    isMock: false,
  };
}

export async function GET(_request: Request) {
  const cacheKey = "dashboard";
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({ data: cached.data });
  }

  const propertyId = process.env.GA4_PROPERTY_ID;
  let rawKey = process.env.GA4_SERVICE_ACCOUNT_KEY;

  // Support file path for local dev
  if (!rawKey && process.env.GA4_SERVICE_ACCOUNT_KEY_PATH) {
    try {
      const fs = await import("fs");
      rawKey = fs.readFileSync(process.env.GA4_SERVICE_ACCOUNT_KEY_PATH, "utf-8");
    } catch {
      // File not found, fall through to demo
    }
  }

  if (!propertyId || !rawKey) {
    const data = demoData();
    cache.set(cacheKey, { timestamp: Date.now(), data });
    return NextResponse.json({ data, error: "Missing GA4 credentials" });
  }

  try {
    const raw = await fetchGa4Data(propertyId, rawKey);
    const data = buildDashboardFromRaw(raw);
    cache.set(cacheKey, { timestamp: Date.now(), data });
    return NextResponse.json({ data });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("GA4 API error:", errorMessage);
    const data = demoData();
    cache.set(cacheKey, { timestamp: Date.now(), data });
    return NextResponse.json(
      { data, error: `Failed to load GA4 data: ${errorMessage}` },
      { status: 200 }
    );
  }
}
