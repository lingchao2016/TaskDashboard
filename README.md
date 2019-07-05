
# Task Dashboard

This is a task dashboard app which allows users to create, edit, delete and manage their own tasks. There are two views of this dashboard. One is table list view. One is the calendar view.


## Getting Started

This project has two folders. API Backend folder is called "server". React Frontend folder is called "mytasks"

### Prerequisites

This project is based Node.js. We need to download and install npm.

```
https://nodejs.org/en/
```

### Installing and Starting services

Backend Server install


```
cd server
npm install
npm start
```

Frontend Server install

```
cd mytasks
npm install
npm start
```
### Features
1. Get All the tasks and filter tasks.

![Home Page](https://lh3.googleusercontent.com/sjbCAPlomJRUnPFj94vYMY5RtcNWbSjulA_lXCjM03HnlG0tBWlGXAfuyfv_EBeFo5StB8nD2HJk)

2. Create a task

![enter image description here](https://lh3.googleusercontent.com/S4BknFt58xF4EjM4YhBwSZVzTThz1ILOFPvX-zAvCVUQRrZbxtpfxHyFj0crhTrEKA9OEBlH25LL)

3. Edit an existing task

![enter image description here](https://lh3.googleusercontent.com/JR7gdKFKOZDl3jNwXQlPHEVG6k7K0SZHJGbjmqMbasYJeEEIDelXhDT7qJrmlleiZHGa1_N-xFqU)

4. Mark a task as completed

![enter image description here](https://lh3.googleusercontent.com/sHrFGIbVHGLxdvj7HkNBlzFI2CRM7maVZQ0mwy8sBhE9Rll_LFJAEjb2ol3jdLub2u2QLAkQuNZo)
![enter image description here](https://lh3.googleusercontent.com/030UHEhGnwOL9QDMROZduu2bnDvE71tVOBg_uygJDsx6nBrM9eXLn9_DoyS3no7YMfelj_mfVncj)

6. Delete a task

![enter image description here](https://lh3.googleusercontent.com/lSpRYwDKwaULV1zcR1xfNkfLb6Iesoz5aKVF9U8AV7wZmwtsGFaH111gp5SMI4izMvejqsBePhXV)
![](https://lh3.googleusercontent.com/Fco9yi8bAGR5uH7i9cg7Hu7z4hciK-DBp6C6uZhcerK3Pg3h_4LWN5Chyt5KtHaEQBSFzVEK_fOX)

7. Calendar View of tasks

![enter image description here](https://lh3.googleusercontent.com/Dn1gh5qY2xjROLyG1th3NrfVZhoMK8Qg-l5O3wTVAoccG9IX0IwbNRMPqt4D3H9iEH5MbRincui4)

8. Swagger UI for Server API
[http://localhost:5000/docs/v1/](http://localhost:5000/docs/v1/)

![enter image description here](https://lh3.googleusercontent.com/E9qjr6ojETVQ_iSse2OZtuw5UkxK63Dax90u9dpwDMU4BHWDYZmXgYr-KNK09II5jEchEkFS8B27)


## Running the tests
 1. Unit Test 
 - server side
```
cd server
npm test
```
This test program will test the follow functions:
 - Test server is available
 - Get all tasks function
 - Get one task function

2. Integration Test
- frontend side
```
cd mytasks
npm test
```
This test program will simulate user behaviours and test create a new task function.


## Authors

* **Lingchao Kong** 
