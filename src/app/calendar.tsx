'use client';
import { ResponsiveTimeRange } from '@nivo/calendar'
import type { CalendarData } from './dataFormatting';

export const Calendar = ({
  data
}: {
  data: CalendarData
}) => <div style={{height: 500}}>
<ResponsiveTimeRange
        data={data.data}
        from={data.from}
        to={data.to}
        emptyColor="#eeeeee"
        colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      weekdayTicks={[0,1,2,3,4,5,6]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'row',
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: 'right-to-left'
            }
        ]}
    />
</div>
