sap.ui.define([ 
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function(Controller,JSONModel) {
  "use strict";

  return Controller.extend("com.sap.technophilia.courier.controller.Tracking", {

    /**
     * Lifecycle Method - Called when the home page(i.e, tracking page) is instantiated.
     * @public
     */
    onInit: function() {
      var oThis = this;
      var oComponent = oThis.getOwnerComponent();
      oThis._router = oComponent.getRouter();
    },

    /**
     *
     * Event Handler - On click of log-in on the home page
     * @public
     */
    onLogin: function() {
      var oThis = this;
      if (!oThis._oLoginDialog) {
        oThis._oLoginDialog = sap.ui.xmlfragment("com.sap.technophilia.courier.fragment.Login", oThis);
        oThis._oLoginDialog.addStyleClass("sapUiSizeCompact");
        oThis.getView().addDependent(oThis._oLoginDialog);
      }
      oThis._oLoginDialog.open();
    },
    
    onPolicyCheck: function() {
      var oThis = this;
      if (!oThis._oPolicyDialog) {
        oThis._oPolicyDialog = sap.ui.xmlfragment("com.sap.technophilia.courier.fragment.Policy", oThis);
        oThis._oPolicyDialog.addStyleClass("sapUiSizeCompact");
        oThis.getView().addDependent(oThis._oPolicyDialog);
      }
      oThis._oPolicyDialog.open();
    },

	onPolicyClose: function(){
	  var oThis = this;
      oThis._oPolicyDialog.close();
	},

    onManagerLogin: function() {
      var oThis = this;
      oThis._router.navTo("manager");
    },

    onEmployeeLogin: function() {
      var oThis = this;
      oThis._router.navTo("employee");
    },

    onLoginCancel: function() {
      var oThis = this;
      oThis._oLoginDialog.close();
    },
    
    _fetchTracker: function() {
      var tid = this.getView().byId("TrackingID").getValue();
      var oThis = this;
      var oModel = [
        {
          "Location" : "CHENNAI",
          "Date and Time" : "28/07/28 3:25PM",
		  "visible": false
        },
        {
          "Location" : "BANGALORE",
          "Date and Time" : "30/07/28 12:25PM",
		  "visible": false
        },
        {
          "Location" : "MUMBAI",
          "Date and Time" : "30/07/28 11:55PM",
          "visible": true
        }
      ];
      oThis.getView().setModel(new JSONModel(oModel), "orders");
      console.log("done");
    },
    
    onOrderTracking: function(){
    	  var oThis = this;
	      if (!oThis._oOrderDialog) {
	        oThis._oOrderDialog = sap.ui.xmlfragment("com.sap.technophilia.courier.fragment.OrderTracking", oThis);
	        oThis._oOrderDialog.addStyleClass("sapUiSizeCompact");
	        oThis.getView().addDependent(oThis._oOrderDialog);
	      }
	      oThis._oOrderDialog.open();
	      oThis._fetchTracker();
	      
	      
			var jurl = "/sap/opu/odata/sap/ZCOURIER_SERVICE_SRV/CourierSet('TRACK01')?$format=json";
			sap.ui.core.BusyIndicator.show(0);
			var that=this;
				jQuery.ajax({
			// 				beforeSend: function (xhr) {
			//     //xhr.setRequestHeader ("Authorization", "Basic " + btoa("TRAIN01" + ":" + "abcdef"));
			// },
				
			headers: {
			    contentType: "application/json; charset=utf-8",
			    "timeout":300000
			  },
				url: jurl,
				async: true,
				TYPE: 'GET',
				method: 'GET',
				dataType: 'text',
				success: function(data) {
				sap.m.MessageToast.show("success");
				console.log(data);
				sap.ui.core.BusyIndicator.hide();
				},
				error: function(error) {
				sap.ui.core.BusyIndicator.hide();
	            	console.log(error);
					sap.m.MessageToast.show("error");
				},
					timeout:60000

			});
 

	      
	      
	      
    },
    
    onOrderTrackingClose: function(){
    	var oThis = this;
      oThis._oOrderDialog.close();
    }
  });
});