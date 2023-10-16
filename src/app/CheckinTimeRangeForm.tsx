'use client';
import { useState } from 'react';
import { Calendar } from './calendar';
import { dataToCalendarData } from './dataFormatting';
import type { Data } from '././dataFormatting';

function filterData(data: Data, name: string): Data {
  if (name === 'all') return data;

  const nameIndex = data.headers.indexOf('Name');
  return {
    headers: data.headers,
    rows: data.rows.filter(d => d[nameIndex] === name),
  };
}

function getNames(data: Data): string[] {
  const nameIndex = data.headers.indexOf('Name');
  return Array.from(new Set(data.rows.map(r => r[nameIndex])));
}
export const CheckinTimeRangeForm = ({
  data
}: { data: Data}) => {
  const [filteredData, setFilteredData] = useState(data);
  return <>
    <label htmlFor="name">Challenger:</label>
    <select 
      name="name" 
      id="name"
      defaultValue="all"
      onChange={(e) => {
      setFilteredData(filterData(data, e.target.value));
    }}>
      <option key="all" value="all">All</option>
      {getNames(data).map(name => <option key={name} value={name}>{name}</option>)}
    </select>
    <Calendar data={dataToCalendarData(filteredData)} />
  </>
}
