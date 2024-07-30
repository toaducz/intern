import {saveLog} from "./src/Api/Middlewares/saveLog";
import {checkAuthenticateMiddleware} from "./src/Api/Middlewares/authMiddleware";
import SocketIoController from "./src/Api/Controllers/SocketIoController";
import {initializeSocket} from './src/Infrastructure/Persistences/Config/SocketConfig';

const express = require('express');
const app = express();
const path = require('path');
const applicationRoute = require('./src/Api/Routes/ApplicationRoutes')
const notificaionRoute = require('./src/Api/Routes/NotificationRoutes')
const jobRoute = require('./src/Api/Routes/JobRoutes')
const cvRoute = require('./src/Api/Routes/CVRoutes');
const certificateRoute = require('./src/Api/Routes/CertificateRoutes');
const companyRoute = require('./src/Api/Routes/CompanyRoutes');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const roleRoute = require('./src/Api/Routes/RoleRoutes')
const userRoute = require('./src/Api/Routes/UserRoutes')
const permissionRoute = require('./src/Api/Routes/PermissionRoutes')
const logRoute = require('./src/Api/Routes/LogRoutes')
const interviewRoute = require('./src/Api/Routes/InterviewRoutes')
const server = require('http').createServer(app)
require('dotenv').config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'))

const PORT = process.env.PORT;
app.use(express.json());

//Tracking request  create log
// app.use((
//     req: Request,
//     res: Response,
//     next: any) => {
//     console.log(`Request: ${req.method} - ${req.url} - ${new Date()}, Ip: ${req.ip}`);
//     next();
// })


app.use('/noti', (req: any, res: any) => {
    res.render('notification')
})
app.use('/noti2', (req: any, res: any) => {
    res.render('notification2')
})

var mongan = require('morgan');
//Save loging
app.use(checkAuthenticateMiddleware, mongan(function (tokens: any, req: any, res: any) {
    //log response
    // console.log("Response: ", res.data);
    const log = {
        // action: tokens.method(req, res) + ' ' + tokens.url(req, res) + ' ' + tokens.status(req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        statusCode: tokens.status(req, res),
        ipAddress: tokens['remote-addr'](req, res),
        deviceId: tokens['user-agent'](req, res),
        timeStamp: tokens.date(req, res),
    }
    // console.log(log);

    //ignore GET request
    if (log.method === 'GET') {
        return;
    }
    saveLog(
        log, req, res
    )
    // return log;
}))

app.use("/api", applicationRoute)
app.use("/api", cvRoute);
app.use("/api", certificateRoute);
app.use("/api", companyRoute);
app.use("/api", jobRoute);
app.use("/api", roleRoute);
app.use("/api", permissionRoute);
app.use("/api", userRoute);
app.use("/api", logRoute);
app.use('/api', notificaionRoute);
app.use('/api', companyRoute);
app.use('/api', interviewRoute);


app.use('/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile)
)

const io = initializeSocket(server);
SocketIoController.listenSocketEvent(io);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is runnit at port: ${PORT}`);
})