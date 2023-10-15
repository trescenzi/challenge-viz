'use client';
import { useState } from 'react';
import { Calendar } from './calendar';
import { dataToCalendarData } from './dataFormatting';
import type { Data } from '././dataFormatting';

function filterData(data: Data, name: string): Data {
  if (name.length === 0) return data;

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
    <label>Challenger:
    <select name="name" id="name"
      onChange={(e) => {
      setFilteredData(filterData(data, e.target.value));
    }}>
      <option value="">All Challengers</option>
      {getNames(data).map(name => <option value={name}>{name}</option>)}
    </select>
    </label>
    <Calendar data={dataToCalendarData(filteredData)} />
  </>
}
