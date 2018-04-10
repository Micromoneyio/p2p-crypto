import * as winston from "winston";
import 'winston-daily-rotate-file';

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize: true
        }),
        new winston.transports.DailyRotateFile(
            {
                name: 'error.log',
                filename: 'logs/%DATE%-error.log',
                level: 'error'
            }),
        new winston.transports.DailyRotateFile(
            {
                name: 'combined.log',
                filename: 'logs/%DATE%-combined.log'
            })
    ]
});

export default logger;