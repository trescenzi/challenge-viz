'use client';
import { useState } from 'react';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import type { Data } from '././dataFormatting';
import { dataToHeatmapData } from '././dataFormatting';

function getWeekStartDate(weekNumber: number): string {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const daysOffset = firstDayOfYear.getDay() > 0 ? (7 - firstDayOfYear.getDay()) : 0;
  
  const startDate = new Date(currentYear, 0, 1 + (7 * (weekNumber - 1)) - daysOffset);
  startDate.setHours(0, 0, 0, 0);
  
  return startDate.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
}

export const WeekHeatMap = ({data}: {data: Data}) => {
  const weekHeatmaps = dataToHeatmapData(data);
  const weeks = Object.keys(weekHeatmaps).sort();
  const [week, setWeek] = useState(weeks[weeks.length - 1])
  //@ts-ignore TODO
  const weekData = weekHeatmaps[week];
  return <>
    <label htmlFor="weekSelect">
      Week:
    </label>
    <select id="weekSelect" defaultValue={week} value={week} onChange={(e) => setWeek(e.target.value)}>
      {weeks.map(week => <option key={week} value={week}>{getWeekStartDate(parseInt(week))}</option>)}
    </select>
    <ResponsiveHeatMap
      data={weekData}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -90,
        legend: '',
        legendOffset: 46
      }}
      xInnerPadding={.1}
      yInnerPadding={.1}
      isInteractive={false}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      colors={{
        type: 'sequential',
        scheme: 'greens',
        minValue: 0,
        maxValue: 1
      }}
      enableLabels={false}
      emptyColor="#FFF"
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: '',
        legendOffset: 70
      }}
    />
  </>
}
