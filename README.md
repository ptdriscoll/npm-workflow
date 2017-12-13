# An npm workflow

This is an npm workflow, in a Windows environment, for a KLRN Passport campaign landing page. 

The page is built with a customized download of Bootstrap 3 and custom JavaScript. The Bootstrap download settings are saved in src/assets/config.json. 

The hero's image and text, and the main headline, are dynamically customized based on URL values passed in with Google Analytics UTM parameters. For example, here are values to use for the show Victoria in a campaign called Passport-2017:

- ?utm_source=facebook
- &utm_medium=cpc
- &utm_campaign=Passport-2017
- &utm_content=Victoria   

### Live page 
(This version is sliced into PHP, and the UTM values get saved to a cookie)  

- http://pbs.klrn.org/passport/
- http://pbs.klrn.org/passport/?utm_source=facebook&utm_medium=cpc&utm_campaign=Passport-2017&utm_content=Victoria

### Start

Dependent JavaScript files are added to src/assets/js/ and require() statements are used in custom.js, along with any custom scripts, to pull everything together.

Custom JavaScript has also been added to index.html to manage custom content, mainly by parsing Google Analytics' UTM parameters and adding them as classes to the body tag. This JavaScript code is located here only so it can be replaced by PHP in an optional separate process.  

Dependent CSS files are put in src/assets/css/ and custom CSS is added to custom.css while @import statements are used in styles.css to pull everything together.

Each campaign has its own folder for hero images, created in src/assets/ - the image paths are added in src/assets/css/custom.css.  

`npm start` will run browserfiy to compile the JavaScript, and live-server to start a live-reload server on port 8080 and open the development web page in a Chrome browswer.

### Build

Each new image folder for a campaign should be listed in the `prod:setup-custom` command in scripts in package.json, so that they're reproduced in production. For example, here is the command with folders for Passport-Launch and Passport-2017:  

```
"prod:setup-custom": "mkdirp dist/assets/img-passport-launch dist/assets/img-passport-2017",
``` 
    
Each campaign's image folder must also have a unique npm command to copy images to production. For example, here's the command for the img-passport-2017 folder:

```
"prod:copy-images-custom-2017": "copy src\\assets\\img-passport-2017\\* dist\\assets\\img-passport-2017\\",
```   

NOTE: this workflow was written in a Windows environment, and uses commands such as copy and type to manage output to the dist folder, as well as `\\` where needed.

ANOTHER NOTE: `uncss` is run before appending the custom.css, because the dynamic custom styles will otherwise be read as unused and stripped out.

`npm run build` will copy index.html and the images, concat, compress and clean the JavaScript and CSS, put everything in a dist folder, start another server on port 8088 and open the production web page in a Chrome browswer.  

### Adding a new campaign

1. Create a new image folder with a unique name in src\assets and add hero images
2. Add custom labels and titles to the `custom_content` JavaScript object in src/index.html
   - For example: **?utm_source=facebook&utm_medium=cpc&utm_campaign=Passport-2017&utm_content=Victoria**
   - Make sure the UTM parameter for the campaign name has "Passport" in it: **utm_campaign=Passport-2017**
   - Make sure the content parameters match thekeys in `custom_content`: **&utm_content=Victoria**
4. Edit src/assets/css/custom.css to pull in the hero images, align labels and titles, etc., using classes matchng URL UTM values, which get added to the body tag

### Adding content to an existing campaign

1. Add new hero images to campaign's unique folder in src/assets/
2. Follow steps 2-4 in "Adding a new campaign"

### References

- https://getbootstrap.com/
- https://docs.npmjs.com/misc/scripts
- https://www.npmjs.com/package/autoprefixer
- https://www.npmjs.com/package/browserify
- https://www.npmjs.com/package/clean-css
- https://www.npmjs.com/package/jshint
- https://www.npmjs.com/package/live-server
- https://www.npmjs.com/package/mkdirp
- https://www.npmjs.com/package/npm-run-all
- https://www.npmjs.com/package/postcss-cli
- https://www.npmjs.com/package/uglify-js
- https://www.npmjs.com/package/uncss
- https://support.google.com/analytics/answer/1033863?hl=en
3. Create a Google Analytics campaign code for each piece of content: