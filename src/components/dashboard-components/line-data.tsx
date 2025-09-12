"use client";

interface ChartData {
  name: string;
  value: number;
}

interface LineChartSVGProps {
  data?: ChartData[]; // optional now
  maxValue?: number;
}

export default function LineChartSVG({ data = [], maxValue }: LineChartSVGProps) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-4 shadow text-gray-400">
        No data available
      </div>
    );
  }

  const chartHeight = 150;
  const chartWidth = 600;
  const max = maxValue || Math.max(...data.map((d) => d.value));
  const step = chartWidth / (data.length - 1);

  // Generate points for the line
  const points = data
    .map((d, i) => {
      const x = i * step;
      const y = chartHeight - (d.value / max) * chartHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow">
      <svg
        viewBox={`0 0 ${chartWidth + 100} ${chartHeight + 70}`}
        width="100%"
        height="220"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width={chartWidth + 100}
          height={chartHeight + 70}
          fill="#111827"
          rx="12"
        />

        {/* Title */}
        <text
          x="20"
          y="30"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="16"
          fill="#F3F4F6"
          fontWeight="700"
        >
          Line Performance
        </text>

        <g transform="translate(60,50)">
          {/* Grid */}
          <g stroke="#374151" strokeDasharray="3 3">
            <line x1="0" x2={chartWidth} y1={chartHeight} y2={chartHeight} />
            <line x1="0" x2={chartWidth} y1={chartHeight / 2} y2={chartHeight / 2} />
            <line x1="0" x2={chartWidth} y1="0" y2="0" />
          </g>

          {/* Line */}
          <polyline
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            points={points}
          />

          {/* Circles on points */}
          {data.map((d, i) => {
            const x = i * step;
            const y = chartHeight - (d.value / max) * chartHeight;
            return <circle key={d.name} cx={x} cy={y} r="4" fill="#D1D5DB" />;
          })}
        </g>
      </svg>
    </div>
  );
}
