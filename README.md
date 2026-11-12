# My Routine

A small app that helps you stick to your daily routine. You write down the things you do (drink water, study, gym, take a walk) and pick a time for each one. When that time comes, the app reminds you, either with a loud alarm or a quiet notification. You decide which one, item by item. At the end of the day you tick off what you finished, like a GitHub or LeetCode streak.

It's plain HTML, CSS and JavaScript. No account, no server, no libraries.

## Files

- `routine-alarm.html` is the whole app in one file (the page, the styles, the code, the icon and the install info)
- `sw.js` is optional. It is the one thing a browser won't let me put inside the HTML, because service workers must be a separate file. Without it the app still works, but Android can't show proper system notifications. It only works when both files are hosted on https, see below

## Getting started

1. Open `routine-alarm.html` in Chrome (phone or computer both work).
2. When the browser asks to allow notifications, say yes. If you miss it, the app shows a "Turn on" button at the top.
3. Type what you do, pick a time, choose the days, and tap **Add routine**.
4. Turn on **Stay awake mode** at the bottom if you want reminders while you use other apps.

Tip: use **Test reminder** before you trust it with something important. It rings right away, so you can hear how loud it is.

## Alarm or notification?

Every routine item gets one of two reminder types.

**Alarm** takes over the whole screen and plays a very loud repeating siren (and vibrates, if your phone supports it). It keeps going until you tap **I did it**, **Snooze 5 min** or **Just stop the sound**. Use it for things you really can't miss, like waking up or taking medicine.

**Notification** is the gentle one. A small popup slides in from the top with a soft sound and goes away after a few seconds. Good for "drink some water" or "stretch" kind of reminders.

You can mix them however you like.

Note: the alarm is as loud as your phone's media volume allows. The app boosts it, but it can't turn your volume up for you.

## The daily checklist

The app has two pages, switched with the tabs at the bottom: **Checklist** and **Routine**. The Checklist page shows everything that is scheduled for today, with your streak and the 12-week grid. The Routine page is where you add and edit your items. Tap the circle next to a task to tick it off.

- A bar shows how many you finished ("3 of 5 done")
- If you tap **I did it** on an alarm, that task is ticked for you
- A task you already ticked won't ring again later that day
- Your streak counts the days in a row where you finished everything
- The grid shows the last 12 weeks, like the GitHub contribution graph. Green squares are partly done days, and a glowing gold square is a day where you finished everything
- When you finish all tasks for the day, the top clock panel and the checklist glow gold

## What else it can do

- Add as many routine items as you want, each with its own time
- Repeat on any days of the week, with quick buttons for Every day, Weekdays and Weekend
- Edit or delete an item any time
- Switch an item off without deleting it (handy for holidays)
- Show what's coming next and how long until it
- Show your whole day on a timeline strip, with a dot for each reminder
- Follow your phone's light or dark mode
- Remember everything after you close the page

## Does it work when the app is closed?

Short answer: not fully, and this is a limit of websites, not of this app.

A web page can only ring while the browser is still running it. Here is what helps and what doesn't.

**What helps**
- **Stay awake mode** keeps the screen on and the page running, so reminders still arrive when you switch to another app.
- If the phone sleeps or the tab gets paused, the app rings as soon as it wakes up, as long as it is within 15 minutes of the set time.
- Hosting the files on https (GitHub Pages or Netlify are free) and adding the app to your home screen lets Android show real notifications, because it can then use the service worker.

**What can't work**
- If you swipe the browser away or the phone restarts, nothing can ring. No web page can set a timer that the phone itself keeps.
- Some phones also kill background apps to save battery. Turn off battery saving for Chrome if reminders are late.
- iPhone is more limited than Android for web notifications.

If you need alarms that always ring, even with the app fully closed and the phone locked, the app has to be a real mobile app. See the last section.

## Things to know

**Your routine lives on your device.** Everything, including your ticks and streak, is saved in the browser's local storage. That keeps it private, but it won't show up on another phone or computer, and clearing your browser data will erase it.

**Sound needs one tap.** Browsers don't allow a page to play sound until you've touched it at least once. Opening the page and tapping anything is enough.

**Streaks use your current routine.** If you change your routine, past days keep the result they had when you ticked them.

## Hosting it (optional)

To get Android notifications and the home screen install:

1. Put both files in the same folder on a free host such as GitHub Pages or Netlify Drop. Rename `routine-alarm.html` to `index.html` so the link opens the app directly.
2. Open the link in Chrome on your phone and allow notifications.
3. Open the Chrome menu and choose **Add to Home screen** (or **Install app**).

## Want to change something yourself?

- Colors and fonts are at the top of the file, in the `:root` section.
- The snooze length is the `5*60000` in the snooze button code (5 minutes in milliseconds).
- The alarm sound is in the `beep()` function, and its loudness is the `m.gain.value` line in `loud()`.
- How late a missed reminder may still ring is the `15*60000` in the `tick()` function.

## Where to go next

For alarms that ring with the app closed, rebuild it as a mobile app. Good options:

- **Capacitor** wraps this same HTML into an Android app and adds the Local Notifications plugin, so the phone itself schedules the alarm. This keeps your design and code almost as they are.
- **Flutter** (one codebase for Android and iPhone) with the `flutter_local_notifications` package
- **React Native** with Notifee or Expo Notifications

Other ideas: your own alarm tones, ready-made routines like Morning or Study, and a weekly summary.
