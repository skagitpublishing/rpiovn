//This is an old file created before the plugin template. It add the NRP project and user views
//to the default ConnextCMS view. 

define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',
  'bootstrap.min',
  //'js.cookie',
	'../../js/app/views/leftMenuView',
  '../../js/app/views/dashboardView',
  '../../js/app/views/pagesView',
  '../../js/app/views/postsView',
  '../../js/app/views/imageLibraryView',
  '../../js/app/views/imageAddNewView',
  '../../js/app/views/pagesAddNewView',
  '../../js/app/views/postsAddNewView',
  '../../js/app/views/fileLibraryView',  
  '../../js/app/model/ImageUploadModel',
  '../../js/app/model/ImageUploadCollection',
  '../../js/app/model/PostModel',
  '../../js/app/model/PostCollection',
  '../../js/app/model/PostCategoryModel',
  '../../js/app/model/PostCategoryCollection',
  '../../js/app/model/FileUploadModel',
  '../../js/app/model/FileUploadCollection',
  '../../js/app/views/categoriesView',
  '../../js/app/model/PageModel',
  '../../js/app/model/PageCollection',
  '../../js/app/model/PageSectionModel',
  '../../js/app/model/PageSectionCollection',
  '../../js/app/views/sectionsView',
  '../../js/app/model/PrivatePageModel',
  '../../js/app/model/PrivatePageCollection',
  '../../js/app/views/modalView.js',
  '../../js/app/model/NRPUserModel',
  '../../js/app/model/NRPUsersCollection',
  '../../js/app/views/NRPUsersView',
  '../../js/app/views/NRPProjectsView',
  '../../js/app/model/NRPProjectModel',
  '../../js/app/model/NRPProjectCollection',
  'adminlte',
  'logs',
  '../../js/serversettings'
//], function ($, _, Backbone, Bootstrap, Cookie,
], function ($, _, Backbone, Bootstrap,
              LeftMenuView, DashboardView, PagesView, PostsView, ImageLibraryView, ImageAddNewView, 
              PagesAddNewView, PostsAddNewView, FileLibraryView, ImageUploadModel, ImageUploadCollection, PostModel, PostsCollection,
              PostCategoryModel, PostCategoryCollection, FileUploadModel, FileUploadCollection, CategoriesView,
              PageModel, PagesCollection, PageSectionModel, PageSectionCollection, SectionsView,
              PrivatePageModel, PrivatePagesCollection,
              ModalView,
              NRPUserModel, NRPUsersCollection, NRPUsersView, NRPProjectsView, NRPProjectModel, NRPProjectCollection,
              AdminLTE, Logs, serverData) {

  /* 
  TO-DO:
  -tree-view menu on left menu bar isn't working exactly the way I want it to. When you click the Media drop-down, it opens,
  but when you click off of it, it doesn't necessaryily close. It should close when another link is clicked.
  
  */
  
  
  //Global Variables
  global = new Object(); //This is where all global variables will be stored.  
  global.serverIp = serverData.serverIp; 
  global.serverPort = serverData.serverPort;
  global.privatePagesSection = serverData.privatePagesSection;
  global.nrpPort = "8000";
  global.nodemailerPort = "3000";
  var csrftoken = ""; //Will host the CSRF token for POST calls.
  
  //TinyMCE state.
  global.tinymce = new Object();
  global.tinymce.initialized = false;
  global.tinymce.currentModelIndex = null;
  global.tinymce.selectedImage = null;
  
  //debugger;
  
  detectBrowser(); //Log the current browser and OS being used.
  
  global.leftMenuView = new LeftMenuView();
  global.leftMenuView.render();

  
  //Initialize the dashboard
  global.dashboardView = new DashboardView();
  //debugger;
  global.dashboardView.render();
  
  global.pagesView = new PagesView();
  global.postsView = new PostsView();
  //pagesView.render();
  
  global.imageLibraryView = new ImageLibraryView();
  //imageLibraryView.render();
  
  global.imageAddNewView = new ImageAddNewView();
  
  global.pagesAddNewView = new PagesAddNewView();
  global.postsAddNewView = new PostsAddNewView();
  
  global.fileLibraryView = new FileLibraryView();
  
  global.categoriesView = new CategoriesView();
  global.sectionsView = new SectionsView();
  
  //Create the modal and render the view.
  global.modalView = new ModalView();
  global.modalView.render();
  
  
  //Generate the ImageUpload Collection if it hasn't been created yet.
  if(global.imageUploadCollection == undefined) {
    //debugger;
    global.imageUploadCollection = new ImageUploadCollection(); //Collection Instance
    global.imageUploadCollection.fetch();
  }
  
  //POST MODEL AND COLLECTION
  //Generate the Post Collection if it hasn't been created yet.
  if(global.postsCollection == undefined) {

    global.postModel = new PostModel();

    global.postsCollection = new PostsCollection(); //Collection Instance
    global.postsCollection.fetch(); 
  }
  
  
  //POST CATEGORY MODEL AND COLLECTION
  //Generate the PostCategory Collection if it hasn't been created yet.
  if(global.postCategoryCollection == undefined) {
    //debugger;

    global.postCategoryModel = new PostCategoryModel();

    global.postCategoryCollection = new PostCategoryCollection(); //Collection Instance
    global.postCategoryCollection.fetch(); 
  }
  
  //FILE UPLOAD MODEL AND COLLECTION
  if(global.fileUploadCollection == undefined) {
    //debugger;
    global.fileUploadCollection = new FileUploadCollection(); //Collection Instance
    global.fileUploadCollection.fetch();
  }
  
  //PAGE MODEL AND COLLECITON
  //Generate the Post Collection if it hasn't been created yet.
  if(global.pagesCollection == undefined) {

    global.pageModel = new PageModel();

    global.pagesCollection = new PagesCollection(); //Collection Instance
    global.pagesCollection.fetch(); 
  }
  
  //PAGE SECTION MODEL AND COLLECTION
  //Generate the PageSection Collection if it hasn't been created yet.
  if(global.pageSectionCollection == undefined) {
    //debugger;

    global.pageSectionModel = new PageSectionModel();

    global.pageSectionCollection = new PageSectionCollection(); //Collection Instance
    global.pageSectionCollection.fetch(); 
  }
  
  //NRP USER MODEL AND COLLECTION
  if(global.nrpUsersCollection == undefined) {
    //debugger;

    global.nrpUserModel = new NRPUserModel();

    global.nrpUsersCollection = new NRPUsersCollection(); //Collection Instance
    global.nrpUsersCollection.fetch(); 
  }
  global.nrpUsersView = new NRPUsersView();
  
  //NRP PROJECTS MODEL, COLLECTION, AND VIEW
  if(global.nrpProjectsCollection == undefined) {
      global.nrpProjectModel = new NRPProjectModel();
      
      global.nrpProjectCollection = new NRPProjectCollection();
      global.nrpProjectCollection.fetch();
  }
  global.nrpProjectsView = new NRPProjectsView();
    
  /*** BEGIN TESTING CODE ***/
  //debugger;
  
  //Move the Cookie plugin to the global scope.
  //global.cookie = Cookie;
    
  /*** END TESTING CODE ***/
  
  
  log.push('Finished executing main_dashboard_app.js');
  
  
  /*** BEGIN GLOBAL FUNCTIONS ***/
  
  /*** END GLOBAL FUNCTIONS ***/
});
