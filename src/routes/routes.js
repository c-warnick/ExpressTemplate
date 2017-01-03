/*
 * @file - set app routing
 */
var auth = require('../controllers/authentication/auth');
var controller = require('../controllers/pages');
var admin = require('../helpers/admin');
var helper = require('../helpers/authentication');
var webhooks = require('../helpers/webhooks');

module.exports = function(app) {
  //authentication

  // Login endpoint
  app.get('/login', auth.login);

  // Logout endpoint
  app.get('/logout', auth.logout);
  app.all('/authenticate', auth.authenticate);

  //About Us
  app.get('/', helper.auth, controller.index);
  app.get('/:drop/:page', helper.auth, controller.dynamicPageLoader);
  app.get('/:page', helper.auth, controller.dynamicPageLoader);






  // app.get('/examples', helper.auth, controller.examples);
  // app.get('/home', helper.auth, controller.index);
  // app.get('/home/dw', helper.auth, controller.dw);
  // app.get('/home/dw/interior', helper.auth, controller.interior);
  // app.get('/home/dw/coupons', helper.auth, controller.coupons);
  // app.get('/home/dw/unsubscribe', helper.auth, controller.unsubscribe);
  // app.get('/home/dw/unsubscribe-success', helper.auth, controller.unsubsuccess);
  // app.get('/home/dw/account', helper.auth, controller.account);
  // app.get('/home/dw/stores', helper.auth, controller.stores);
  // app.get('/home/dw/cart', helper.auth, controller.cart);
  // app.get('/About_Us', helper.auth, auController.index);
  // app.get('/About_Us/Belk_Mediaroom',helper.auth, auController.mediaroom);
  // app.get('/About_Us/Belk_Mediaroom/RecentNews',helper.auth, auController.recent_news);
  // app.get('/About_Us/Belk_Mediaroom/MediaContact',helper.auth, auController.media_contact);
  // app.get('/About_Us/Belk_Mediaroom/DownloadableBelkImages',helper.auth, auController.belk_images);
  // app.get('/About_Us/Belk_Mediaroom/BelkFactSheet',helper.auth, auController.fact_sheets);
  // app.get('/About_Us/Who_We_Are',helper.auth, auController.who_we_are);
  // app.get('/About_Us/Who_We_Are/Our_History',helper.auth, auController.our_history);
  // app.get('/About_Us/Who_We_Are/Mission_Vision_Values',helper.auth, auController.mission_vision_values);
  // app.get('/About_Us/Diversity_And_Inclusion',helper.auth, auController.diversity_and_inclusion);
  // app.get('/About_Us/Diversity_And_Inclusion/Workforce_Inclusion',helper.auth, auController.workforce_inclusion);
  // app.get('/About_Us/Diversity_And_Inclusion/Employee_Resource_Groups',helper.auth, auController.employee_resource_groups);
  // app.get('/About_Us/Diversity_And_Inclusion/Customer_Diversity',helper.auth, auController.customer_diversity);
  // app.get('/About_Us/Diversity_And_Inclusion/Supplier_Diversity',helper.auth, auController.supplier_diversity);
  // app.get('/About_Us/Diversity_And_Inclusion/Awards',helper.auth, auController.awards);
  // app.get('/About_Us/Compliance',helper.auth, auController.compliance);
  // app.get('/About_Us/ConflictMinerals',helper.auth, auController.conflict_minerals);
  // app.get('/About_Us/Sustainability',helper.auth, auController.sustainability);
  // app.get('/About_Us/Community',helper.auth, auController.belk_gives);
  // app.get('/About_Us/Community/Our_Commitment',helper.auth, auController.our_commitment);
  // app.get('/About_Us/Community/Current_Efforts',helper.auth, auController.current_efforts);
  // app.get('/About_Us/Vendor_Information',helper.auth, auController.vendor_information);
  // app.get('/About_Us/Store_Events',helper.auth, auController.store_events);

  //Testing
  // app.get('/testing/image-load',helper.auth, testController.image_load);

  //Gifts with Purchases
  // app.get('/GWP',helper.auth, gwpController.index);

  //Gifts with Purchases
  // app.get('/clp',helper.auth, clpController.index);

  //Customer Service Pages
  // app.get('/Customer_Service/Shipping_Information',helper.auth, csController.shipping_information);
  // app.get('/Customer_Service/FAQ', helper.auth, csController.faqs);
  // app.get('/Customer_Service/SizingCharts', helper.auth, csController.sizing_charts);
  // app.get('/Customer_Service/RebateCenter', helper.auth, csController.rebate_center);


 
 
 

  //app.get('/admin/users', helper.auth, navigation.adminNav, adminController.users);
  //app.get('/admin/pages', helper.auth, navigation.adminNav, adminController.pages);
  //app.get('/admin/pages/:pageId', helper.auth, navigation.adminNav, adminController.page);

  //Webhooks
  //Do no request these through the browser
  // app.get('/webhooks/savedata', helper.auth, webhooks.saveData);
  // app.get('/webhooks/addChildPages/:objectId', helper.auth, webhooks.addChildPages);
  // app.get('/webhooks/addScripts', helper.auth, webhooks.addScripts);
  // app.get('/webhooks/addStyleSheets', helper.auth, webhooks.addStyleSheets);
  // app.get('/webhooks/wipeTable/:table', helper.auth, webhooks.wipeTable);
  // app.all('/webhooks/add/:table', helper.auth, webhooks.add);


  //Widget
  //Requested through iFrame
  // app.get('/widget',helper.auth, widgetController.index);
  // app.get('/widget/addContainer',helper.auth, widgetController.addContainer);
  // app.get('/widget/addContentType',helper.auth, widgetController.addContentType);
};
