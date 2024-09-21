import React, { useEffect, useState } from "react";
import clockIcon from "../../assets/icons/copyBoard.svg";
import moment from "moment-timezone";

interface TimerProps {
    createdAt: string; // Время, переданное через пропсы
}

const Timer: React.FC<TimerProps> = ({ createdAt }) => {
    const totalDuration = 900; // 15 минут в секундах
    const [timeLeft, setTimeLeft] = useState<number>(totalDuration);

    useEffect(() => {
        const calculateTimeLeft = () => {
            // Текущее время в Москве
            const currentTime = moment.tz("Europe/Moscow");
            // Время из пропсов, интерпретируемое в часовом поясе +3
            const createdAtTime = moment.tz(createdAt, "Europe/Moscow");

            // console.log("Current Time (Moscow):", currentTime.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"));
            //console.log("Created At (Provided):", createdAtTime.format("YYYY-MM-DDTHH:mm:ss.SSSSSSZ"));

            // Разница во времени в секундах
            const elapsedSeconds = Math.floor(currentTime.diff(createdAtTime, 'seconds'));
            const remainingTime = Math.max(0, totalDuration - elapsedSeconds);
            setTimeLeft(remainingTime);
        };

        calculateTimeLeft();

        const timer = setInterval(() => {
            calculateTimeLeft();
        }, 1000);

        return () => clearInterval(timer);
    }, [createdAt]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const progressWidth = (timeLeft / totalDuration) * 100;

    return (
        <div className="flex items-center justify-center py-1.5 px-2.5 text-lightText dark:text-darkText bg-lightBackground dark:bg-darkBackgroundBlocks rounded-lg my-5 gap-2 w-full max-w-sm">
            <div className="flex items-center w-4/5">
                <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                    <div className="bg-defaultBlue h-full transition-width duration-1000" style={{ width: `${progressWidth}%` }}></div>
                </div>
            </div>
            <div className="flex items-center gap-1 w-1/5">
                <img src={clockIcon} alt="Clock Icon" className="w-4 h-4" />
                <span className="text-sm font-bold text-gray-800 dark:text-white">{formatTime(timeLeft)}</span>
            </div>
        </div>
    );
};

export default Timer;
