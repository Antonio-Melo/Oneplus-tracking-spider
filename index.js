const osmosis = require('osmosis');
const writeFile = require('write');
const read = require('read-file');
const nodemailer = require('nodemailer');


const INTERVAL_OF_TIME = 120000;
const LAST_STOP = 0;
const ORDER_NUMBER_INDEX = 2;
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.PASSWORD
  }
});


getStops = () => new Promise((resolve, reject) => {
  console.log('Checking one plus tracking...');
  const stops = [];

  osmosis.get(`http://tracking.oneplus.net/${process.argv[ORDER_NUMBER_INDEX]}`)
    .find('.checkpoint')
    .set({
      date: '.checkpoint__time strong',
      time: '.hint',
      content: '.checkpoint__content strong'
    })
    .data(data => {
      const date = new Date(data.date + ' ' + data.time);
      const stop = {
        date,
        content: data.content
      }
      stops.push(stop);
    })
    .done(() => resolve(stops))
});

getInfo = () => {
  getStops().then(results => {
    read('info.txt', 'utf8', (err, buffer) => {
      if(err)
        console.log('Error reading file...');
      else {
        let lastDate = new Date();
        if (buffer)
          lastDate = new Date(buffer.split('\n')[0]);

        //Check results for new stuff
        const newInfo = [];
        let newInfoString = "";
        for (let i = 0; i < results.length; i++) {
          const stop = results[i];
          if(stop.date > lastDate){
            newInfo.push(stop);
            newInfoString += "[" + stop.date + "] " + stop.content + "\n";
          }
        }

        console.log({ newInfo });
        //Save new date
        if(newInfo.length != 0){
          writeFile('info.txt', results[LAST_STOP].date);

          //Send email
          var mailOptions = {
            from: process.env.EMAIL_SENDER,
            to: process.env.EMAIL_RECEIVER,
            subject: '[ONE PLUS] Tracking update',
            text: newInfoString
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        }
      }
    });
  });
}

setInterval(getInfo, INTERVAL_OF_TIME);
