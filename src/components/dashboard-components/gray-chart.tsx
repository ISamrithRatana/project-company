"use client";

interface ChartData {
  name: string;
  value: number;
}

interface GrayChartSVGProps {
  data: ChartData[];
  maxValue?: number; // optional, defaults to highest value in data
}

export default function GrayChartSVG({ data, maxValue }: GrayChartSVGProps) {
  const chartHeight = 150; // px
  const barWidth = 50;
  const gap = 40; // spacing between bars
  const max = maxValue || Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-gray-900 rounded-lg p-4 shadow">
      <svg
        viewBox="0 0 700 220"
        width="100%"
        height="220"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="title desc"
      >
        <title id="title">Weekly Overview - Bar chart (grayscale)</title>
        <desc id="desc">Dynamic bar chart rendered with SVG</desc>

        {/* Background */}
        <rect x="0" y="0" width="700" height="220" fill="#111827" rx="12" />

        {/* Chart title */}
        <text
          x="20"
          y="30"
          fontFamily="Inter, Arial, sans-serif"
          fontSize="16"
          fill="#F3F4F6"
          fontWeight="700"
        >
          Weekly Overview
        </text>

        {/* Chart group */}
        <g transform="translate(60,50)">
          {/* Grid lines */}
          <g stroke="#374151" strokeDasharray="3 3" strokeWidth="1">
            <line x1="0" x2="600" y1="0" y2="0" />
            <line x1="0" x2="600" y1={chartHeight / 3} y2={chartHeight / 3} />
            <line
              x1="0"
              x2="600"
              y1={(chartHeight / 3) * 2}
              y2={(chartHeight / 3) * 2}
            />
            <line x1="0" x2="600" y1={chartHeight} y2={chartHeight} />
          </g>

          {/* Y-axis labels */}
          <g
            fontFamily="Inter, Arial, sans-serif"
            fontSize="11"
            fill="#9CA3AF"
            textAnchor="end"
          >
            <text x="-8" y="4">
              {max}
            </text>
            <text x="-8" y={chartHeight / 3 + 4}>
              {Math.round((2 * max) / 3)}
            </text>
            <text x="-8" y={(2 * chartHeight) / 3 + 4}>
              {Math.round(max / 3)}
            </text>
            <text x="-8" y={chartHeight + 4}>
              0
            </text>
          </g>

          {/* Bars */}
          <g fill="#9CA3AF">
            {data.map((d, i) => {
              const barHeight = (d.value / max) * chartHeight;
              const x = i * (barWidth + gap);
              const y = chartHeight - barHeight;
              return (
                <rect
                  key={d.name}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                />
              );
            })}
          </g>

          {/* X-axis labels */}
          <g
            fontFamily="Inter, Arial, sans-serif"
            fontSize="12"
            fill="#D1D5DB"
            textAnchor="middle"
          >
            {data.map((d, i) => {
              const x = i * (barWidth + gap) + barWidth / 2;
              return (
                <text key={d.name} x={x} y={chartHeight + 20}>
                  {d.name}
                </text>
              );
            })}
          </g>
        </g>
      </svg>
    </div>
  );
}
