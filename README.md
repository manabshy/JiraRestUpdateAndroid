# androidAppWo
Android Web App constructed using HTML5,CSS3,AngularJS,JavaScript and packaged using PhoneGap and Cordova for android.
This Web App communicates with JIRA via REST Api to perform CRUD Operations
You need to have Local instance of JIRA working on your PC

For more information - please check the link below -

You need Android Studio to deploy it in the Emulator or run it on your Android device

For more Information -

http://docs.phonegap.com/en/edge/guide_platforms_android_index.md.html#Android%20Platform%20Guide

1.You need to add the install the camera cordova plugin
	use the below command

	cordova plugin add org.apache.cordova.camera
	
2.Add configuration details in config.xml and  AndroidManifest.xml

For Android - 

(in app/res/xml/config.xml)
<feature name="Camera">
    <param name="android-package" value="org.apache.cordova.camera.CameraLauncher" />
</feature>


(in app/AndroidManifest)
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

For further information - Please read the below article:

http://docs.phonegap.com/en/edge/cordova_camera_camera.md.html#camera.getPicture

Some useful commands below:

How to run this within Android Studio
1. Open Android Studio - Click on File - New - Project - Project From Version Control - GitHub
2. Enter the GitHub details - For Git Repository URL - https://github.com/manabshy/androidAppWo.git
3. Click on Clone
4. Configure the project - Please notice for a message  - "Android project detected"
5. Open the Terminal Window in Android Studio or a separate one
6. Run the below commands to build the app and launch it in the emulator


cordova phonegap

$ cordova create hello com.example.hello HelloWorld
$ cd hello
$ cordova platform add android
$ cordova build
$ cordova emulate android   /* This pushes the app to the home screen - Emulator and launches it: */

In Android Studio

File - New - Import Project

select the folder - “android" inside platforms as below

/Users/manan/Sites/myproject/phonegap_projects/wo/platforms/android

Preview it in the emulator

*** how to modify ***

Modify the codes
Start the build as described above
Preview it in the emulator
**** JIRA ***********
you at - /Applications/atlassian-jira-6.4.5-standalone/bin

START THE JIRA Using the Command :

 ./start-jira.sh

/*****Some configuration information on JIRA - if required ******/

installing JIRA Standalone on MAC

conf/server.xml - edit the connector port to 9090

bin ./catalina.sh run
bin ./shutdown.sh
bin ./start.sh

Set the JIRA Home - WEB-INF/classes/cata.properties

/*****If getting below errors******/

No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost' is therefore not allowed access

Fix:

Close the chrome, Open the Terminal (If close doesn’t work then - Force Quit - Chrome on mac) - Then run the below command

open -a Google\ Chrome --args --disable-web-security

The above command will let you bypass the error  


/****Enable Device Debugging on Chrome ****/
on the address bar of the Chrome browser:

chrome://inspect

/***Run the App on Actual Device***/

cordova run android


/***Something to Note****/

You develop at -  /Users/manan/Sites/myproject/phonegap_projects/wo/www

When you do the build codes gets deployed to /Users/manan/Sites/myproject/phonegap_projects/wo/platforms/android/assets/www




 
