import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ApiKey } from '../types';

interface StatsChartProps {
  keys: ApiKey[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ keys }) => {
  const active = keys.filter(k => k.status === 'active').length;
  const depleted = keys.filter(k => k.status === 'depleted').length;
  const expired = keys.filter(k => k.status === 'expired').length;

  const data = [
    { name: 'Active', value: active, color: '#10b981' }, // Emerald 500
    { name: 'Depleted', value: depleted, color: '#ef4444' }, // Red 500
    { name: 'Expired', value: expired, color: '#64748b' }, // Slate 500
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};