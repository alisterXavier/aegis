import React, { useCallback, useState } from 'react';
import {
  PieChart,
  BarChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  BarProps,
} from 'recharts';
import { Certificate } from '../../../../types/next-auth';
import { PieSectorDataItem } from 'recharts/types/polar/Pie';

const renderActiveShape = (props: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  var {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    stroke,
    value,
  } = props;
  midAngle = midAngle ?? 1;
  cx = cx ?? 0;
  cy = cy ?? 0;
  outerRadius = outerRadius ?? 0;
  const name = (
    payload && 'name' in payload ? (payload as { name: string }).name : ''
  ) as string;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        className="uppercase"
        textAnchor="middle"
        fill={stroke}
      >
        {name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={stroke}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#999"
        className="capitalize"
      >{`${value} ${name}`}</text>
    </g>
  );
};

type ChartsType = {
  cert?: Certificate[] | null;
} & (
  | { type: 'pie'; onHover?: (e: string) => void }
  | { type: 'bar'; onHover?: (e: BarProps) => void }
);
const COLORS = ['#5121a4', '#0d8ac0'];
const Pie_Chart = ({
  certs,
  onHover,
}: {
  certs: Certificate[];
  onHover?: (e: string) => void;
}) => {
  const statusCount: any = {};
  certs?.forEach((i, index) => {
    const status = i.dns.status;
    statusCount[status] = (statusCount[status] || 0) + 1;
  });
  const formatedStatus = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  const [activeIndex, setActiveIndex] = useState(0);

  const onMouseOver = useCallback(
    (data: PieSectorDataItem, index: React.SetStateAction<number>) => {
      setActiveIndex(index);
      const { name } = data;
      if (onHover && name) onHover(name);
    },
    []
  );

  return (
    <ResponsiveContainer width="100%" height="100%" className="">
      <PieChart width={400} height={400}>
        <Pie
          data={formatedStatus}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          onMouseOver={onMouseOver}
        >
          {formatedStatus.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              stroke={COLORS[index % COLORS.length]}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
          <Tooltip />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

interface ExpirationCount {
  name: string;
  value: number;
}

const Bar_Chart: React.FC<{
  certs: Certificate[];
  onHover?: (e: BarProps) => void;
}> = ({ certs, onHover }) => {
  const expirationMonthData: { [key: string]: number } = certs.reduce(
    (acc, cert) => {
      const monthYear = new Date(cert.dns.expires).toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }
      acc[monthYear]++;
      return acc;
    },
    {} as { [key: string]: number }
  );

  const expirationMonths = Object.keys(expirationMonthData);
  const expirationCounts: ExpirationCount[] = expirationMonths.map((month) => ({
    name: month,
    value: expirationMonthData[month],
  }));

  return (
    <ResponsiveContainer width="90%" height="80%" className="">
      <BarChart width={350} height={300} data={expirationCounts}>
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip cursor={{ fill: '#ffffff52' }} />
        <Bar dataKey="value" fill="#8884d8" onMouseOver={onHover} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export const Charts = ({ cert, type, onHover }: ChartsType) => {
  if (!cert) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[95%] h-[90%] bg-slate-500"></div>
      </div>
    );
  }

  return type === 'pie' ? (
    <Pie_Chart certs={cert} onHover={onHover} />
  ) : (
    <>
      <p className="text-white w-full h-[50px] text-center">
        Certificates by Expiration Month
      </p>
      <Bar_Chart certs={cert} onHover={onHover} />
    </>
  );
};
