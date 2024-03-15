import VisLog from "@silver-zepp/vis-log";
import EasyStorage from "@silver-zepp/easy-storage"; // "../libs/easy-storage"

const vis = new VisLog();
const storage = new EasyStorage();

const namesArr =  [ 
  "Emma", 	"Olivia", 	"Ada", 		"Isabella", 	"Mia",
  "James", 	"William", 	"Charles", 	"Richard", "Benjamin"
]


Page({
  onInit(){
    vis.updateSettings({ line_count: 10 });
  },
  build() {
    // check if specific key exists
		if (!storage.hasKey("name"))
      vis.error("The storage is fresh. Using the default values");
    else 
      vis.warn("-> OLD data loaded");

    // get the keys that you saved before. if none - return the default values.
    // setting the "default" value or as in this example "DefaultName" is not required
    // let my_var = storage.getKey("health"); // general usage 
    vis.log("name : " 	+ storage.getKey("name", "DefaultName"));
    vis.log("age : " 	+ storage.getKey("age", 77));

    // save new keys
    storage.setKey("name"	, getRandomName());
    storage.setKey("age"	, getRandomAge());

    vis.warn("-> NEW data saved");
    vis.log("name : " 	+ storage.getKey("name"));
    vis.log("age : " 	+ storage.getKey("age"));

    // prints all contents of the storage
    vis.log("Contents: " + storage.getAllKeys(true));
    
    // for the case when you want to remove all the user data 
    // example: [button] Clear app data 
    //storage.deleteAll();
  },
  onDestroy(){
    // save everything on app close, in case you have autosave disabled
		//storage.saveAll();
  }
})

// helpers
function getRandomName(){ return namesArr[Math.floor(Math.random() * namesArr.length)] }
function getRandomAge(){ return Math.floor(Math.random() * (60 - 10) + 10) }