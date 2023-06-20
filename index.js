const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./model/user')

const nodemailer = require("nodemailer");


const MANDRILL_USERNAME="Qm9hcmQgSW5maW5pdHk="
const MANDRILL_PASSWORD="8kDH_iH11NVLBs9U4fxGAQ"
const MANDRILL_FROM="connect@boardinfinity.com"
const MANDRILL_HOST="smtp.mandrillapp.com"

const smtpTransport = nodemailer.createTransport({
    pool: true,
    host: MANDRILL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports    
    auth: {
        user: MANDRILL_USERNAME,
        pass: MANDRILL_PASSWORD
    }
});


const app = express()

// All environments variables
const MONGODB_HOST = "mongodb+srv://efm:aSE253nD3Gw8pE8X@cluster0.9kl2w.mongodb.net/test?retryWrites=true&w=majority"
const port = process.env.PORT || 8080;


// Get users list from user service
app.get("/users", async (req, res) => {
    console.log("request resolved")
    const userData = await UserModel.find({})
    return res.send(userData)
})

app.post("/users", async (req, res) => {
    const userData = await UserModel.create(req.body)
    return res.send(userData)
})

app.get("/api", (req, res) => {
    res.send("Hello world")
})



function createCalendar() {
    const ical = require('ical-generator').ICalCalendar;
    const calendar = new ical({domain: 'Board Infinity', name: 'Session at 12PM'});
    const startTime = new Date();
    const endTime = new Date();
    endTime.setHours(startTime.getHours() + 1);
    calendar.createEvent({
        start: startTime,
        end: endTime,
        summary: 'This event is created by Boardinfinity to test the calendar invite',
        description: 'It works ;)',
        location: 'https://bbb.infylearn.com/rooms/biv-vle-mv7-etb/join',
        url: 'https://www.boardinfinity.com/',
        organizer: {
            name: 'Board Infinity',
            email: 'connect@boardinfinity.com'
        },
        attendees: [
            {name: 'Rakesh Coach', email: 'airrakeshkumarsharma@gmail.com'}
        ]
    });

    return calendar;
}

async function sendemail(sendto, subject, htmlbody, calendarObj = null) {
    const mailOptions = {
        to: ["airrakeshkumarsharma@gmail.com", "rakeshsharma@boardinfinity.com", "airrakeshkumarsharma@hotmail.com"],
        from: MANDRILL_FROM,
        subject: subject,
        html: htmlbody,

        icalEvent: {
            filename: 'invitation.ics',
            content: calendarObj.toString()
        }
    }
    // if (calendarObj) {
    //     let alternatives = {
    //         "Content-Type": "text/calendar",
    //         "method": "REQUEST",
    //         "content": new Buffer(calendarObj.toString()),
    //         "component": "VEVENT",
    //         "Content-Class": "urn:content-classes:calendarmessage"
    //     }
    //     mailOptions['alternatives'] = alternatives;
    //     mailOptions['alternatives']['contentType'] = 'text/calendar'
    //     mailOptions['alternatives']['content']
    //         = new Buffer(calendarObj.toString())
    // }

    console.log(mailOptions)
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: ", response);
        }
    })
}

app.get("/calendar", (req, res) => {
    const cal = createCalendar()

    sendemail("airrakeshkumarsharma@hotmail.com", "Test", "Test", cal)

    res.set('Content-Type', 'text/calendar;charset=utf-8');
    res.set('Content-Disposition', 'attachment; filename="calendar.ics"');

    // send the response
    res.send(cal.toString());
})


mongoose.connect(MONGODB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
},
    (err) => {
        if (err) {
            console.error('FAILED TO CONNECT TO MONGODB');
            console.error(err);
        } else {
            console.log('CONNECTED TO MONGODB');
            app.listen(port, () => {
                console.log('Application running on port: ', port);
            });
        }
    }
);