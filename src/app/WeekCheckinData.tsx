'use client';
import { useState } from 'react';
import { Calendar } from './calendar';
import { dataToCalendarData, groupBy } from './dataFormatting';
import type { Data } from '././dataFormatting';

function filterData(data: Data, name: string): Data {
  if (name.length === 0) return data;

  const nameIndex = data.headers.indexOf('Name');
  return {
    headers: data.headers,
    rows: data.rows.filter(d => d[nameIndex] === name),
  };
}

export const WeekCheckinData = ({
  data
}: { data: Data}) => {
  /*
  const timeIndex = data.headers.indexOf('time');
  const byWeek = groupBy(data.rows, timeIndex, getWeekNumber)
  const weeks = Object.keys(byWeek);
  const [week, setWeek] = useState(weeks[weeks.length - 1]);
  return <>
    <select name="weeks" id="weekSelect"
      onChange={(e) => {
      console.log(e.target.value);
      setWeek(e.target.value);
    }}>
      {weeks.map(week => <option value={week}>{week}</option>)}
    </select>
    <Calendar data={dataToCalendarData({
      headers: data.headers,
      rows: byWeek[week] ?? byWeek[0],
    })} />
  </>
  */
}
