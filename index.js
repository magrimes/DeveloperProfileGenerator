const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
const electron = require('electron');

inquirer
    .prompt([{
        type: "input",
        message: "Please enter GitHub username.",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "Green",
            "Blue",
            "Pink",
            "Red",
        ]
    }
    ])
    
    .then(function ({ username, color }) {
    
        const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then(function (res) {
            const githubData = res.data;

            fs.writeFile('first.html', `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Developer Profile</title>
            </head>
            <body>
              <h1><span style="color:${color}"> ${githubData.name}</span></h1>
            <hr>
            <img src="${githubData.avatar_url}" alt="profile-pic">
            <br>
            <p><h3>Bio:</h3> ${githubData.bio}
            <br>
            <h3>Location:</h3> ${githubData.location}
            <br>
            <h3>Link to GitHub:</h3><a href="${githubData.html_url}">Click</a>
            <h3>Number of Public Repos:</h3> ${githubData.public_repos}
            <br>
            <h3>Number of Followers:</h3> ${githubData.followers}
            <br>
            <h3>Following:</h3> ${githubData.following}
            </p>  
            </body>
            </html>`, function (err) {
                if (err) throw err;

                const html = fs.readFileSync('./first.html', 'utf8');
                const options = { format: 'Letter' };

                pdf.create(html, options).toFile('.devprofile.pdf', function (err, res) {
                    if (err) return console.log(err);
                    console.log(res);
                });
            });
        });
    });
    