# Parking Application for Electric Cars

The frontend of the Parking Car application written in React Native technology with the use of Expo. To work properly, the application requires a server located in a different repository.

What to do before starting?
First of all, check that the correct IP address of the server is entered in the constants / serverAddress.js file.

What if only certain functions work?
First of all, you can enter the files in the actions / folder and increase the timeout in the fetchWithTimeout function defined in each of the files. It turns out to be especially helpful in places where the server has to communicate with parking mocks, which extends the process of waiting for a response extremely significantly. 
