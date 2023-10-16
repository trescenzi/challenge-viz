export type Data = {
  headers: string[];
  rows: string[][];
}

export type CalendarData = {
  from: string;
  to: string;
  data: {
    value: number,
    day: string,
  }[];
}

export const groupBy = (data: string[][], index: number, fn: (x: string) => string | number) => {
  return data.reduce((acc, row) => {
    const val = fn(row[index]);
    (acc[val] || (acc[val] = [])).push(row)
    return acc;
  }, {} as {[key: string | number]: any});
}
const getISOStringNoTimezone = (d: Date) => `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2,'0')}`;

export const dataToCalendarData = (data: Data) => {
  const timeIndex = data.headers.indexOf('time');
  const grouped = groupBy(
    data.rows,
    timeIndex,
    (t: string) => {
      const d = new Date(t);
      return getISOStringNoTimezone(d);
    }
  );
  const calendarData = Object.entries(grouped)
    .reduce((acc, [day, row]) => acc.concat([{day, value: row.length}]), [] as {value: number, day: string}[])
    .sort((a, b) =>  {
        return a.day.localeCompare(b.day)
    })
  return {
    from: calendarData[0].day,
    to: calendarData[calendarData.length - 1].day,
    data: calendarData,
  }
}

const getNames = (data: Data) => {
  const nameIndex = data.headers.indexOf('Name');
  return Array.from(new Set(data.rows.map(row => row[nameIndex])));
}

function sortArrayByWeekday(array: { id: string, data: any[]}[]): {id: string, data: any[]}[] {
  return array.sort((a, b) => {
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return weekdays.indexOf(a.id) - weekdays.indexOf(b.id);
  });
}

export const dataToHeatmapData = (data: Data) => {
  const weekdayIndex = data.headers.indexOf('Day of Week');
  const timeIndex = data.headers.indexOf('time');
  const nameIndex = data.headers.indexOf('Name');
  const groupedByWeeks = groupBy(data.rows, timeIndex, getWeekNumber);
  const names = getNames(data);
  console.log('grouped by weeks', groupedByWeeks);
  const weeksGroupedByWeekday = Object.keys(groupedByWeeks).reduce((groups, week) => ({
    ...groups,
    [week]: groupBy(
    groupedByWeeks[week],
    weekdayIndex,
    (t: string) => {
      return t;
    }
  )}), {});
  return Object.keys(weeksGroupedByWeekday).reduce((groups, week) => ({
    ...groups,
    // @ts-ignore TODO
    [week]: sortArrayByWeekday(Object.keys(weeksGroupedByWeekday[week]).map(weekday => {
    return {
      id: weekday,
      data: names.map(name => ({
      //@ts-ignore TODO
        y: weeksGroupedByWeekday[week][weekday].find(checkin => checkin[nameIndex] === name) ? 1 : 0,
        x: name,
      }))
    }
  }))
  }), {});
}

function getWeekNumber(isoDate: string): number {
  const date = new Date(isoDate);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  const num = Math.ceil((((date.getTime() - week1.getTime()) / 86400000) + 1) / 7);
  if (isNaN(num)) {
    console.log(isoDate);
  }
  return num;
}
