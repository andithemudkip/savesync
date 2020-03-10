const { watch } = require ('chokidar');
const { dirsToWatch } = require ('./db.json');

const { Task } = require ('@alpha-manager/core');

let files = [];

const watcher = watch (dirsToWatch, {
    // ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
});

watcher
    .on('add', path => {
        console.log (`File ${path} has been added`)
        files.push (path);
        console.log (files);
    })
    .on('change', path => console.log (`File ${path} has been changed`))
    .on('unlink', path => {
        console.log (`File ${path} has been removed`)
        files.splice (files.findIndex (file => file === path), 1);
        console.log (files);
    });

let sync = new Task ()
    .do (() => {
        console.log ('sync');
    })
    .every (5).second ()
    .start ();

