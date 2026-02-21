"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
  isMock: boolean;
};

const demoFallback: DashboardData = {
  lastUpdated: new Date().toISOString(),
  kpis: [
    { label: "Sessions", value: "128,430", change: 12.4, trend: [90, 95, 88, 102, 110, 115, 120, 126] },
    { label: "Users", value: "64,882", change: 8.1, trend: [60, 62, 58, 64, 68, 70, 73, 76] },
    { label: "Email Signups", value: "9,412", change: 5.9, trend: [4, 5, 4.2, 5.4, 6.1, 6.4, 6.8, 7.2] },
    { label: "Revenue", value: "$84,120", change: -3.2, trend: [10, 9.6, 9.8, 9.1, 8.7, 8.9, 8.5, 8.2] },
  ],
  trafficOverview: {
    area: Array.from({ length: 14 }).map((_, idx) => ({
      date: `2026-02-${10 + idx}`,
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
    daily: Array.from({ length: 14 }).map((_, idx) => ({
      date: `2026-02-${10 + idx}`,
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
    trend: Array.from({ length: 14 }).map((_, idx) => ({
      date: `2026-02-${10 + idx}`,
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
  isMock: true,
};

const ranges = [
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "90d", value: "90d" },
];

function ChangeBadge({ change }: { change: number }) {
  const positive = change >= 0;
  return (
    <Badge
      className={cn(
        "rounded-full px-2 py-1 text-xs font-semibold",
        positive
          ? "bg-[#4ade80]/20 text-[#4ade80]"
          : "bg-[#f87171]/20 text-[#f87171]"
      )}
    >
      {positive ? "+" : ""}
      {change.toFixed(1)}%
    </Badge>
  );
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const chartData = data.map((value, index) => ({ index, value }));
  return (
    <div className="h-14 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={positive ? "sparklineUp" : "sparklineDown"} x1="0" x2="0" y1="0" y2="1">
              <stop
                offset="0%"
                stopColor={positive ? "#4ade80" : "#f87171"}
                stopOpacity={0.6}
              />
              <stop
                offset="100%"
                stopColor={positive ? "#4ade80" : "#f87171"}
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={positive ? "#4ade80" : "#f87171"}
            fill={`url(#${positive ? "sparklineUp" : "sparklineDown"})`}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<DashboardData>(demoFallback);
  const [range, setRange] = useState("30d");
  const [loading, setLoading] = useState(true);
  const [hadError, setHadError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`/api/analytics?range=${range}&v=2&bust=${Date.now()}`, { cache: "no-store", credentials: "same-origin" })
      .then(async (response) => {
        const json = await response.json();
        if (!mounted) return;
        setData(json.data ?? demoFallback);
        setHadError(Boolean(json.error));
        setErrorMsg(json.error ?? "");
      })
      .catch((err) => {
        if (!mounted) return;
        setData(demoFallback);
        setHadError(true);
        setErrorMsg(String(err));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [range]);

  const lastUpdated = useMemo(() => {
    const date = new Date(data.lastUpdated);
    return format(date, "MMM d, yyyy 'at' h:mm a");
  }, [data.lastUpdated]);

  const [sortKey, setSortKey] = useState<"pageviews" | "avgTime" | "bounceRate">("pageviews");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedContent = useMemo(() => {
    const rows = [...data.contentPerformance];
    rows.sort((a, b) => {
      const aVal = sortKey === "pageviews" ? a.pageviews : Number.parseFloat(a[sortKey]);
      const bVal = sortKey === "pageviews" ? b.pageviews : Number.parseFloat(b[sortKey]);
      return sortDir === "asc" ? aVal - bVal : bVal - aVal;
    });
    return rows;
  }, [data.contentPerformance, sortDir, sortKey]);

  const totalFunnel = data.funnel[0]?.value ?? 1;

  return (
    <div className="min-h-screen bg-[#1a1a2e] pb-16 text-[#f1faee]">
      <div className="mx-auto max-w-7xl px-6 pt-10">
        <header className="flex flex-col gap-6 border-b border-[#4a4e69]/50 pb-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-[#a8dadc]">
              Sleep Smarter Analytics
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Sleep Smarter Analytics</h1>
            <p className="text-sm text-[#a8dadc]">
              Last updated {lastUpdated}
            </p>
            {data.isMock || hadError ? (
              <Badge className="w-fit bg-[#f87171]/20 text-[#f87171]">
                Demo data active {hadError ? `(API error: ${errorMsg})` : "(mock)"}
              </Badge>
            ) : null}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#4a4e69]/60 bg-[#16213e] p-2">
            {ranges.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setRange(item.value)}
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition",
                  range === item.value
                    ? "bg-[#a8dadc] text-[#1a1a2e]"
                    : "text-[#a8dadc] hover:text-[#f1faee]"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </header>

        <section className="mt-10 grid gap-6 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <Card key={`kpi-skeleton-${index}`} className="border-[#4a4e69]/50 bg-[#16213e]">
                  <CardHeader>
                    <Skeleton className="h-4 w-20 bg-[#24324d]" />
                    <Skeleton className="h-8 w-28 bg-[#24324d]" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-12 w-full bg-[#24324d]" />
                  </CardContent>
                </Card>
              ))
            : data.kpis.map((kpi) => (
                <Card key={kpi.label} className="border-[#4a4e69]/50 bg-[#16213e]">
                  <CardHeader className="space-y-4">
                    <CardDescription className="text-xs uppercase tracking-[0.2em] text-[#a8dadc]">
                      {kpi.label}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{kpi.value}</CardTitle>
                      <ChangeBadge change={kpi.change} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Sparkline data={kpi.trend} positive={kpi.change >= 0} />
                  </CardContent>
                </Card>
              ))}
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="border-[#4a4e69]/50 bg-[#16213e]">
            <CardHeader>
              <CardTitle>Traffic Overview</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Sessions by channel (daily)
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[320px]">
              {loading ? (
                <Skeleton className="h-full w-full bg-[#24324d]" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.trafficOverview.area}>
                    <defs>
                      <linearGradient id="organicFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#4ade80" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#4ade80" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="paidFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#a8dadc" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#a8dadc" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#2a3448" strokeDasharray="4 4" />
                    <XAxis dataKey="date" tick={{ fill: "#a8dadc", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#a8dadc", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#0f172a", border: "1px solid #4a4e69" }}
                      labelStyle={{ color: "#f1faee" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="organic"
                      stackId="1"
                      stroke="#4ade80"
                      fill="url(#organicFill)"
                    />
                    <Area
                      type="monotone"
                      dataKey="paid"
                      stackId="1"
                      stroke="#a8dadc"
                      fill="url(#paidFill)"
                    />
                    <Area type="monotone" dataKey="referral" stackId="1" stroke="#f6bd60" fill="#f6bd60" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="social" stackId="1" stroke="#ffafcc" fill="#ffafcc" fillOpacity={0.2} />
                    <Area type="monotone" dataKey="email" stackId="1" stroke="#9bf6ff" fill="#9bf6ff" fillOpacity={0.2} />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card className="relative z-10 overflow-hidden border-[#4a4e69]/50 bg-[#16213e]">
            <CardHeader>
              <CardTitle>Traffic by Channel</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Share of sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-[240px] w-full bg-[#24324d]" />
              ) : (
                <>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.trafficOverview.channels}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                        >
                          {data.trafficOverview.channels.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{ background: "#0f172a", border: "1px solid #4a4e69" }}
                          labelStyle={{ color: "#f1faee" }}
                          formatter={(value: unknown) => `${value}%`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-2 space-y-2 text-sm">
                    {data.trafficOverview.channels.map((channel) => (
                      <div key={channel.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ background: channel.color }}
                          />
                          <span className="truncate">{channel.name}</span>
                        </div>
                        <span className="ml-2 text-[#a8dadc]">{channel.value}%</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Paid Traffic</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-[#a8dadc]">Performance</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-6">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Card key={`paid-skeleton-${index}`} className="border-[#4a4e69]/50 bg-[#16213e]">
                    <CardHeader className="space-y-2">
                      <Skeleton className="h-3 w-16 bg-[#24324d]" />
                      <Skeleton className="h-6 w-20 bg-[#24324d]" />
                    </CardHeader>
                  </Card>
                ))
              : data.paid.kpis.map((kpi) => (
                  <Card key={kpi.label} className="border-[#4a4e69]/50 bg-[#16213e]">
                    <CardHeader className="space-y-2">
                      <CardDescription className="text-xs uppercase tracking-[0.2em] text-[#a8dadc]">
                        {kpi.label}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{kpi.value}</CardTitle>
                        <ChangeBadge change={kpi.change} />
                      </div>
                    </CardHeader>
                  </Card>
                ))}
          </div>
          <Card className="border-[#4a4e69]/50 bg-[#16213e]">
            <CardHeader>
              <CardTitle>Daily Spend vs Conversions</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Paid channel efficiency
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[280px]">
              {loading ? (
                <Skeleton className="h-full w-full bg-[#24324d]" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.paid.daily}>
                    <CartesianGrid stroke="#2a3448" strokeDasharray="4 4" />
                    <XAxis dataKey="date" tick={{ fill: "#a8dadc", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#a8dadc", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#0f172a", border: "1px solid #4a4e69" }}
                      labelStyle={{ color: "#f1faee" }}
                    />
                    <Bar dataKey="spend" fill="#a8dadc" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="conversions" fill="#4ade80" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="border-[#4a4e69]/50 bg-[#16213e]">
            <CardHeader>
              <CardTitle>Organic Traffic</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Organic sessions trend
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[280px]">
              {loading ? (
                <Skeleton className="h-full w-full bg-[#24324d]" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.organic.trend}>
                    <CartesianGrid stroke="#2a3448" strokeDasharray="4 4" />
                    <XAxis dataKey="date" tick={{ fill: "#a8dadc", fontSize: 12 }} />
                    <YAxis tick={{ fill: "#a8dadc", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ background: "#0f172a", border: "1px solid #4a4e69" }}
                      labelStyle={{ color: "#f1faee" }}
                    />
                    <Line type="monotone" dataKey="sessions" stroke="#4ade80" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card className="border-[#4a4e69]/50 bg-[#16213e]">
            <CardHeader>
              <CardTitle>Organic KPIs</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Search visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <>
                  <Skeleton className="h-10 w-full bg-[#24324d]" />
                  <Skeleton className="h-10 w-full bg-[#24324d]" />
                  <Skeleton className="h-10 w-full bg-[#24324d]" />
                </>
              ) : (
                data.organic.kpis.map((kpi) => (
                  <div key={kpi.label} className="flex items-center justify-between rounded-lg border border-[#4a4e69]/50 px-4 py-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-[#a8dadc]">{kpi.label}</p>
                      <p className="text-lg font-semibold">{kpi.value}</p>
                    </div>
                    <ChangeBadge change={kpi.change} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
          <Card className="border-[#4a4e69]/50 bg-[#16213e] lg:col-span-2">
            <CardHeader>
              <CardTitle>Top Organic Pages</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                High-intent landing pages
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-40 w-full bg-[#24324d]" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#4a4e69]/50">
                      <TableHead className="text-[#a8dadc]">Page</TableHead>
                      <TableHead className="text-right text-[#a8dadc]">Sessions</TableHead>
                      <TableHead className="text-right text-[#a8dadc]">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.organic.topPages.map((page) => (
                      <TableRow key={page.page} className="border-[#4a4e69]/30">
                        <TableCell>{page.page}</TableCell>
                        <TableCell className="text-right">{page.sessions.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          <ChangeBadge change={page.change} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <Card className="border-[#4a4e69]/50 bg-[#16213e]">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Journey from session to purchase
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.funnel.map((step, index) => {
                const width = Math.max(18, (step.value / totalFunnel) * 100);
                const isLast = index === data.funnel.length - 1;
                return (
                  <div key={step.step} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{step.step}</span>
                      <span className="text-[#a8dadc]">{step.value.toLocaleString()}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-[#0f172a]">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-[#a8dadc] to-[#4ade80]"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                    {!isLast ? (
                      <p className="text-xs text-[#f87171]">-{step.drop.toFixed(1)}% drop</p>
                    ) : (
                      <p className="text-xs text-[#4ade80]">Conversion complete</p>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <Card className="border-[#4a4e69]/50 bg-[#16213e] lg:col-span-2">
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Sorted by highest impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#4a4e69]/50">
                    <TableHead className="text-[#a8dadc]">Page</TableHead>
                    <TableHead className="text-right text-[#a8dadc]">
                      <button
                        type="button"
                        onClick={() => {
                          setSortKey("pageviews");
                          setSortDir(sortDir === "asc" ? "desc" : "asc");
                        }}
                      >
                        Pageviews
                      </button>
                    </TableHead>
                    <TableHead className="text-right text-[#a8dadc]">
                      <button
                        type="button"
                        onClick={() => {
                          setSortKey("avgTime");
                          setSortDir(sortDir === "asc" ? "desc" : "asc");
                        }}
                      >
                        Avg Time
                      </button>
                    </TableHead>
                    <TableHead className="text-right text-[#a8dadc]">
                      <button
                        type="button"
                        onClick={() => {
                          setSortKey("bounceRate");
                          setSortDir(sortDir === "asc" ? "desc" : "asc");
                        }}
                      >
                        Bounce Rate
                      </button>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedContent.map((row) => (
                    <TableRow key={row.page} className="border-[#4a4e69]/30">
                      <TableCell>{row.page}</TableCell>
                      <TableCell className="text-right">{row.pageviews.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{row.avgTime}</TableCell>
                      <TableCell className="text-right">{row.bounceRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="mt-10">
          <Card className="border-[#4a4e69]/50 bg-[#16213e]">
            <CardHeader>
              <CardTitle>Revenue by Source</CardTitle>
              <CardDescription className="text-[#a8dadc]">
                Source-to-revenue contribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#4a4e69]/50">
                    <TableHead className="text-[#a8dadc]">Source</TableHead>
                    <TableHead className="text-right text-[#a8dadc]">Sessions</TableHead>
                    <TableHead className="text-right text-[#a8dadc]">Leads</TableHead>
                    <TableHead className="text-right text-[#a8dadc]">Purchases</TableHead>
                    <TableHead className="text-right text-[#a8dadc]">Revenue</TableHead>
                    <TableHead className="text-right text-[#a8dadc]">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.revenueBySource.map((row) => (
                    <TableRow key={row.source} className="border-[#4a4e69]/30">
                      <TableCell>{row.source}</TableCell>
                      <TableCell className="text-right">{row.sessions.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{row.leads.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{row.purchases.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${row.revenue.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <ChangeBadge change={row.change} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
