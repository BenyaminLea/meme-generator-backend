## meme-generator-backend
Back end for a meme generator

### Prerequisite
You should have installed nodejs on your computer (https://nodejs.org/en/download/) and one of the following package manager : yarn or npm.

### Installation
git clone the projet <br />
Open a terminal in the folder <br />
Install the dependencies : ```npm install (or yarn install)```

### Credentials
Create a .env file at the root of the folder and add your credentials for the ImgFlip API as follows:
```
IMGFLIP_USERNAME="my_username"
IMGFLIP_PASSWORD="my_password"
```

### Launch
In the terminal, launch the server with the following command: ```npm run start (ou yarn run start)```<br />
The server is launched at the following address : http://localhost:5000

### Stop
To stop the API, just ```ctrl``` or ```cmd``` + ```C``` in the terminal 

### REST API Documentation 
This meme generator backend is using Node.js and express and is developed using Typescript.

The API has 3 routes :
 * GET /api/memes : route to get a list of memes available via the Imgflip API
    * PARAMETERS : NONE
    * RETURN : 
    ```
    {
    "success": true,
    "data": {
        "memes": [
            {
                "id": "61579",
                "name": "One Does Not Simply",
                "url": "https://i.imgflip.com/1bij.jpg",
                "width": 568,
                "height": 335,
                "box_count": 2
            },
            {
                "id": "101470",
                "name": "Ancient Aliens",
                "url": "https://i.imgflip.com/26am.jpg",
                "width": 500,
                "height": 437,
                "box_count": 2
            }
            ...
        ]
    }
    }
    ```
 * GET /api/cache : route to get the list of past memes (order by creation_date DESC)
    * PARAMETERS : NONE
    * RETURN : 
    ```
    {
    "data":[
            {
                "creation_date": "61579",
                "url": "https://i.imgflip.com/1bij.jpg",
            },
            {
                "creation_date": "101470",
                "url": "https://i.imgflip.com/26am.jpg",
            }
            ...
        ]
    }
    ```
 * POST /api/meme : route to create a new meme 
    * PARAMETERS : template_id, text0, text1
    * RETURN : 
    ```
    {
        "success": true,
        "data": {
            "url": "https://i.imgflip.com/123abc.jpg",
            "page_url": "https://imgflip.com/i/123abc"
        }
    }
    ```

 ### Note 
 The structure of the API could have been divided into different files and folders (controllers, routers, type for example) but it is a very simple api so I have decided to use only one index.ts file to contain all the code. 

