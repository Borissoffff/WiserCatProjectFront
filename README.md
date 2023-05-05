## Frontend

### How to Run?

1. Clone the project: `git clone <project-url>`
2. Navigate to the project's root directory from the terminal
3. Run the "ng-serve" command
4. Make sure the application is running on localhost on port 4200
5. Also, ensure you have installed Node.js and the npm package manager

### Description

First, the frontend allows users to log in.  
<br />
The H2 database already contains 3 users.  
<br />
You can choose between:
1. Username: user1, Password: 1234
2. Username: user2, Password: 5678
3. Username: user3, Password: 6666

When you make a POST request after a login attempt, the server side checks if a user with the provided username and password exists.

If successful, you will be redirected to the page with the user's pets that they have entered (only the first and second users already have some pets).

On that page, you can add a new pet by clicking the "Add pet" button. You will be redirected to a form where every field will be validated on the client side and server side. The values of pet type, fur color, and origin are generated on the server side.

You can edit or update your pet by clicking the "Edit" button, and you will be redirected to the same form, but input field values will be set automatically based on the pet you want to edit.

You can sort pets by any input field that the pet has. If you want to view all pets again, just press the "Show all Pets" button, and everything will be reset.

All data inserted through the forms is stored in the database.
