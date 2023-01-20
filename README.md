# Interview Scheduler

## Website 

https://scheduler-rv.netlify.app/

## Summary

This is an Interview Scheduling App. It allows users to easily create new appointments, by typing in a name, and selecting an interviewer. The information is stored on a database. Therefore, it is not lost upon refresh or closing the browser page. Furthermore, data is stored across devices. [^1]

It is a responsive app that shows a different layout for computer and mobile devices. It makes use of AJAX requests so that the data gets immediately updated.

The webpage was created using Node and React and tested with Jest and Cypress.

## Getting Started

Simply use the link given above.

### If the deployment goes down and you have to run it locally
- You need to have Node JS installed on your computer. You can download it at (https://nodejs.org/en/).
- You will also need to have Postgre SQL installed. You can download it at (https://www.postgresql.org/).
- Once you have Node JS, go to your desired folder, open the terminal or command prompt, and type git@github.com:open-meadow/scheduler.git, if you have git. Alternatively, you can download the ZIP file and extract it to your desired folder.
- In a similar manner, you will have to download the server: https://github.com/open-meadow/scheduler-api. Put this code in the same folder as above.

- Navigate to the folder containing the scheduler-api code.
- Copy the file <code>env.example</code>. Paste it in the same folder, and rename it <code>env.development</code>. Open env.development in Notepad or a text editor, and replace the given text with the details in the README.
- Open your terminal or command prompt in the same folder ( Windows users, click on the empty space on the box beside the search bar and type 'cmd').
- Type <code>psql -U development</code> and click enter. Upon the password prompt, type 'development'. Once it loads, type the following:-
  <code>\i src/db/schema/create.sql</code>
  <code>\i src/db/schema/development.sql</code>
- Exit by typing <code>\q</code> then hitting Enter. Alternativelty, type Ctrl+C 
- Type npm install and click Enter. Windows users may need to run cmd as administrator.
- Once installed, type npm start and click Enter.
- Go to your favourite web browser, and type localhost:8001/api/debug/reset in the address bar. Hit Enter.

- Navigate to the folder containing the scheduler code.
- Open the terminal/command prompt. Type npm install.
- Type npm start. Click enter. This should start the client

## Screenshots
> Displaying Appointments

![screenshot](https://github.com/open-meadow/scheduler/blob/d89e4d7a41476328005519e4c462f2fbd1e82af5/docs/1-displaying_appointments.png)

> Adding New Appointments

![screenshot](https://github.com/open-meadow/scheduler/blob/d89e4d7a41476328005519e4c462f2fbd1e82af5/docs/2-adding_new_appointments.png)

> Deleting Appointments

![screenshot](https://github.com/open-meadow/scheduler/blob/d89e4d7a41476328005519e4c462f2fbd1e82af5/docs/3-confirm_delete_appointment.png)

> Mobile View

![screenshot](https://github.com/open-meadow/scheduler/blob/d89e4d7a41476328005519e4c462f2fbd1e82af5/docs/4-mobile_view.png)

## Dependencies
- React
- Webpack, Babel
- Axios, WebSockets
- Storybook, Webpack Dev Server, Jest, Testing Library
- Node, Express
<br></br>
[^1]: Note to dear friends and family who may be reading this. As the data persists across webpages and devices, you may be tempted to type things such as "[The creator of this website] is an idiot" or "[The creator of this website] is stupid" or "When are you planning on getting a girlfriend?". Please refrain from doing so.
