# Oneplus-tracking-spider

## Why?

After buying the new Oneplus 6T, I was tracking the package throw their [website](http://tracking.oneplus.net/). The information provided is awesome, but it was a bit lame having to go there and refresh it everytime.

## What this does

Creates a scrypt that checks the website every 2 minutes and if something changed, sends a email showing this changes.

## Dependencies

- [Osmosis](https://www.npmjs.com/package/osmosis)
- [Write](https://www.npmjs.com/package/write)
- [Read File](https://www.npmjs.com/package/read-file)
- [Nodemailer](https://www.npmjs.com/package/nodemailer)

## How to run

Make sure you have the following variables:
- **EMAIL_SERVICE**, check the [available services](https://nodemailer.com/smtp/well-known/).
- **EMAIL_SENDER**, the email that will send
- **PASSWORD**, your password
- **EMAIL_RECEIVER**, the receiver of the email

```
npm start TRACKING_NUMBER
```

## Stuff

This is not the most clean or efficient code and there is probably other solutions. Just made it for fun. Fell free to change whatever you want.
