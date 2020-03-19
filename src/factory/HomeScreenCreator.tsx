import React, { useEffect, useState } from 'react';
import { Schedule } from '../types';
import { HomeScreen } from '../ui';
import { scheduleManager } from '../service';

const HomeScreenCreator = () => {
    const [schedules, setSchedules] = useState<Schedule[]>([
        { title: 'Ikey Benzaken', rows: [[1,2,3], [11,22,33]] },
        { title: 'Stephen Benz', rows: [[4,5,6], [44,55,66]] },
    ]);

    useEffect(() => {
        (async () => {
            const _schedules = await scheduleManager.getAllSchedules();
            setSchedules(_schedules);
        })();
    }, []);

   return <HomeScreen schedules={schedules} />
}

export default HomeScreenCreator;