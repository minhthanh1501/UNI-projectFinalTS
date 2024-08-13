import { useEffect, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const ProgressLine = () => {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        let timer: any;

        if (isFetching || isMutating) {
            setVisible(true);
            timer = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress < 95) {
                        return prevProgress + 1;
                    }
                    return prevProgress;
                });
            }, 20); // Điều chỉnh tốc độ theo yêu cầu
        } else {
            clearInterval(timer);
            setProgress(100);

            setTimeout(() => {
                setVisible(false);
                setProgress(0);
            }, 500); // Thời gian chờ để ẩn thanh progress sau khi hoàn thành
        }
        // console.log(progress);
        return () => clearInterval(timer);
    }, [isFetching, isMutating]);

    if (!visible) return null;

    return (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700 fixed z-30">
            <div
                className="bg-blue-600 h-1.5 rounded-full dark:bg-red-600"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressLine;