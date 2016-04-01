# GithubDashboard

Generating the Dashboard of your Github Repositories.

## DEMO

Here's the [GithubDashboard] of my Github repositories.

[GithubDashboard]: http://askeing.github.io/GithubDashboard/

![screenshot](https://github.com/askeing/GithubDashboard/raw/master/img/screenshot.png)

## Build Your Dashboard

You have to install [make], [Node.js] and [npm] before building your own dashboard.

[make]: https://www.gnu.org/software/make/
[Node.js]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/

Then you have to edit the config file `src/config/config.json`:

```json
{
  "username": "YOUR GITHUB ACCT",
  "url": "https://github.com/YOUR GITHUB ACCT/",
  "head_title": "YOUR TITIL IN HEAD TAG",
  "title": "YOUR TITLE",
  "description": "YOUR DESCRIPTION",
  "fb_og_image": "FULL FAVICON URL FOR FACEBOOK",
  "avatar_url": "YOUR AVATAR URL",
  "avatar_url_size": "180px",
  "github_fork": false,
  "footer_link": [
    {
      "name": "GitHub",
      "link": "https://github.com/YOUR GITHUB ACCT/"
    }
  ]
}
```

And change the `src/favicon.png` to your own.

```bash
$ cp PATH/TO/YOUR/favicon.png src/favicon.png
```

Okay, then you can build the dashboard by `make build`:

```bash
$ make build
./node_modules/.bin/grunt
Running "clean:dest" (clean) task
>> 1 path cleaned.

Running "uglify:javascript_files" (uglify) task
File dest/js/all.min.js created: 160.24 kB → 155.08 kB
>> 1 file created.

Running "cssmin:css_files" (cssmin) task
>> 1 file created. 172.8 kB → 167.37 kB

Running "compile-handlebars:index" (compile-handlebars) task

Running "copy:config" (copy) task
Created 1 directory, copied 1 file

Running "copy:js" (copy) task
Copied 2 files

Running "copy:fonts" (copy) task
Created 1 directory, copied 11 files

Running "copy:root" (copy) task
Copied 1 file

Done, without errors.
```

Your dashboard will be put under `dest` folder:

```bash
$ ls dest/
config      css         favicon.png fonts       index.html  js
```

## Run on localhost

You can run simple HTTP server on localhost for testing.

The most simple way is start a server by [Python], I write the `make run` command for quickly testing:

```bash
$ make run
~/askeing-proj/GithubDashboard/dest ~/askeing-proj/GithubDashboard
Starting server on port 8000, you can press Crtl+C to stop it...
```

Then you can open browser and access `http://localhost:8000/`.

Press `Ctrl + C` in your terminal will stop the SimpleHTTPServer.

[Python]: https://www.python.org/

## Publish

You can put your dashboard on the Github.io or your own server.

If you want to put it on the Github.io, please checkout to `gh-pages` branch, and copy all files from `dest` to the root folder. After that, remove the empty `dest` folder.
