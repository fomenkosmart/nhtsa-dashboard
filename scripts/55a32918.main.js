function checkLoading(){}function showSpinner(){$(".spinner-overlay").css("display","block"),window.setTimeout(function(){$(".spinner-overlay").css("opacity",.8)},0)}function hideSpinner(){$(".spinner-overlay").css("opacity",0),window.setTimeout(function(){$(".spinner-overlay").css("display","none")},500)}function showDetailsSpinner(){$(".details-spinner-overlay").css("display","block"),window.setTimeout(function(){$(".details-spinner-overlay").css("opacity",.8)},0)}function hideDetailsSpinner(){$(".details-spinner-overlay").css("opacity",0),window.setTimeout(function(){$(".details-spinner-overlay").css("display","none")},500)}function positionSplat(){var a=$(".make-wrapper"),b=$(".overlay-splat"),c=$(".overlay-title");b.css("width",3*a.width()),b.css("height",a.height()+200),b.css("left",a.width()/2+a.offset().left-b.width()/2),c.css("top",a.offset().top),c.css("left",a.offset().left+a.width()+75+"px")}function positionHoodReleaseButton(){var a=$(".dashboard").height()-67;$(".button-container").css("top",a+"px")}function toggleYScrollability(){$("body").height()<verticalScrollThreshold?$("body").css("overflow-y","visible"):$("body").css("overflow-y","hidden")}function showAboutOverlay(){$(".overlay-splat").hide(),$(".overlay-title").hide(),$overlay.css({"background-image":"none","background-color":"rgba(0,0,0,0.8)"});var a=$(".about-block");$overlay.css("display","inline"),$overlay.velocity({opacity:1}),a.css("display","block"),a.velocity({opacity:1})}function hideAboutOverlay(){var a=$(".about-block");$overlay.velocity({opacity:0},{display:"none"}),a.velocity({opacity:0},{display:"none"})}function positionCarImageInBackground(){var a=$(".dashboard").offset().left+$(".dashboard").width()-465+"px";if($(window).height()<verticalScrollThreshold)var b=verticalScrollThreshold-323+"px";else var b=$(window).height()-323+"px";$("body").css({"background-position":a+" "+b})}function hideOverlay(){$(".make-header").css("z-index",1),$(".make-bar-chart").css("z-index",1),$overlay.velocity({opacity:0},{display:"none"}),$(".overlay-description").velocity({opacity:0},{display:"none"}),$(".overlay-instructions").velocity({opacity:0},{display:"none"})}function openHood(){var a=$(".button-container"),b=2e3;a.addClass("active"),detailsOffset=0,hasNextDetails=!0,getDetails(),$(".dashboard-foreground").velocity({rotateX:90},{easing:"easeOutBack",duration:b,complete:function(){a.find(".show-data").hide(),a.find(".arrow-bottom").hide()}});var c=$("#total-count-text").text();$("#dashboard-background-total").text(numberWithCommas(c)),$.Velocity.hook($(".dashboard-foreground"),"transformOrigin","0px 0px"),$.Velocity.hook($(".dashboard-foreground"),"perspectiveOrigin","0px 0px")}function closeHood(){var a=$(".button-container"),b=2e3;$(".dashboard-foreground").velocity({rotateX:0},{duration:b,complete:function(){records.reset(),a.removeClass("active"),a.find(".show-data").show(),a.find(".arrow-bottom").show()}}),$.Velocity.hook($(".dashboard-foreground"),"transformOrigin","0px 0px")}function numberWithCommas(a){return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function resizeBackgrid(){var a=$backgridContainer.height()-$backgridContainer.find("thead").height();$backgridTBody.css("height",a);var b=$backgridContainer.width()-441;$(".backgrid thead th.description").css("width",b+1).css("min-width",b+1).css("max-width",b+1),$(".backgrid tbody td.description").css("width",b).css("min-width",b).css("max-width",b)}function makePreviewEndpointURL(){var a=secure?"https://":"http://";return a+=host+"/service/stream/preview",a+="?key="+apiKey}function getDetails(){0===detailsOffset&&showDetailsSpinner(),loadingDetails=!0;var a=countTextVis.controller.state.filters.toJSON(),b=makeVis.controller.state.get("streamSourceId"),c=makePreviewEndpointURL(),d=50,e={count:d,offset:detailsOffset,fromTime:7889472e5,toTime:14049756e5,restrictions:a,streamSourceId:b,timestampField:"failtimestamp_real"};$.ajax({type:"POST",url:c,data:JSON.stringify(e),contentType:"application/json"}).done(function(a){hasNextDetails=a.hasNext,records.add(a.documents),detailsOffset+=d,loadingDetails=!1,resizeBackgrid(),hideDetailsSpinner()}).fail(function(a){console.log("ERROR: ",a),loadingDetails=!1,hideDetailsSpinner()})}var apiKey="5423cab5e4b0bc6347610a8b",host="live.zoomdata.com/zoomdata",secure=!0,sourceName="Vehicle Complaints",lifted=!1,hasNextDetails=!0,loadingDetails=!1,detailsOffset=0,verticalScrollThreshold=590,stateAbbreviationLookup={Alabama:"AL",Alaska:"AK",Arizona:"AZ",Arkansas:"AR",California:"CA",Colorado:"CO",Connecticut:"CT",Delaware:"DE",Florida:"FL",Georgia:"GA",Hawaii:"HI",Idaho:"ID",Illinois:"IL",Indiana:"IN",Iowa:"IA",Kansas:"KS",Kentucky:"KY",Louisiana:"LA",Maine:"ME",Maryland:"MD",Massachusetts:"MA",Michigan:"MI",Minnesota:"MN",Mississippi:"MS",Missouri:"MO",Montana:"MT",Nebraska:"NE",Nevada:"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND",Ohio:"OH",Oklahoma:"OK",Oregon:"OR",Pennsylvania:"PA","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD",Tennessee:"TN",Texas:"TX",Utah:"UT",Vermont:"VT",Virginia:"VA",Washington:"WA","West Virginia":"WV",Wisconsin:"WI",Wyoming:"WY"},loading=[],makeVis,modelVis,trendVis,countTextVis,crashesGaugeVis,injuriesGaugeVis,firesGaugeVis,speedGaugeVis,scatterplotVis,mapVis,$makeBarChart=$("#make-bar-chart"),$modelBarChart=$("#model-bar-chart"),$trendVis=$("#trend"),$totalCountText=$("#total-count-text"),$crashesGauge=$("#crashes-gauge"),$injuriesGauge=$("#injuries-gauge"),$firesGauge=$("#fires-gauge"),$speedGauge=$("#speed-gauge"),$scatterplot=$("#scatterplot"),$map=$("#map"),$overlay=$(".overlay"),$backgridContainer=$(".backgrid-container"),Record=Backbone.Model.extend({}),Records=Backbone.Collection.extend({model:Record}),records=new Records,BooleanStringFormatter=_.extend({},Backgrid.CellFormatter.prototype,{fromRaw:function(a){return a&&""!==a&&"0"!==a?"Y":"•"}}),BooleanStringCell=Backgrid.StringCell.extend({render:function(){return BooleanStringCell.__super__.render.apply(this,arguments),"•"===this.$el.text()&&this.el.classList.add("bullet"),this},formatter:BooleanStringFormatter}),NAStringFormatter=_.extend({},Backgrid.CellFormatter.prototype,{fromRaw:function(a){return a&&""!==a&&"0"!==a?a:"n/a"}}),NAStringCell=Backgrid.StringCell.extend({formatter:NAStringFormatter}),StateAbbreviationStringFormatter=_.extend({},Backgrid.CellFormatter.prototype,{fromRaw:function(a){return stateAbbreviationLookup[a]}}),StateAbbreviationCell=Backgrid.StringCell.extend({formatter:StateAbbreviationStringFormatter}),Rotated45HeaderCell=Backgrid.HeaderCell.extend({render:function(){Rotated45HeaderCell.__super__.render.apply(this,arguments);var a=this.$el.text(),b=$("<div><span>"+a+"</span></div>");return this.$el.html(b),this}}),columns=[{name:"make",label:"MAKE",editable:!1,sortable:!1,cell:"string"},{name:"model",label:"MODEL",editable:!1,sortable:!1,cell:"string"},{name:"year",label:"YEAR",editable:!1,sortable:!1,cell:"string"},{name:"state",label:"STATE",editable:!1,sortable:!1,cell:StateAbbreviationCell},{name:"crashed",label:"CRASH",editable:!1,sortable:!1,cell:BooleanStringCell,headerCell:Rotated45HeaderCell},{name:"fire",label:"FIRE",editable:!1,sortable:!1,cell:BooleanStringCell,headerCell:Rotated45HeaderCell},{name:"injured",label:"INJURY",editable:!1,sortable:!1,cell:BooleanStringCell,headerCell:Rotated45HeaderCell},{name:"speed",label:"MPH",editable:!1,sortable:!1,cell:NAStringCell,headerCell:Rotated45HeaderCell},{name:"description",label:"FAILED COMPONENT",editable:!1,sortable:!1,cell:Backgrid.Cell.extend({className:"string-cell description",formatter:Backgrid.StringFormatter})}],grid=new Backgrid.Grid({columns:columns,collection:records});$backgridContainer.append(grid.render().el);var $backgridTBody=$backgridContainer.find("tbody");resizeBackgrid(),$backgridTBody.scroll(function(){this.scrollHeight-$backgridTBody.height()-this.scrollTop<200&&hasNextDetails&&!loadingDetails&&getDetails()}),$(document).ready(function(){$("button.reset").on("mousedown",function(){var a=$modelBarChart.find("div.active");a.toggleClass("active",!1),Zoomdata.eventDispatcher.trigger("filter:years:reset");var b={path:"model"};modelVis.controller.state.removeFilter(b),countTextVis.controller.state.removeFilter(b),crashesGaugeVis.controller.state.removeFilter(b),injuriesGaugeVis.controller.state.removeFilter(b),firesGaugeVis.controller.state.removeFilter(b),speedGaugeVis.controller.state.removeFilter(b),scatterplotVis.controller.state.removeFilter(b),mapVis&&mapVis.controller.state.removeFilter(b)}),$(".button-container").click(function(){var a=$(this);a.hasClass("active")?closeHood():openHood()}),$(".close-hood").click(function(){closeHood()}),$(".js-about-button").click(function(){showAboutOverlay()}),$(".js-close-about-button").click(function(){hideAboutOverlay()}),$(".tabs .tab-links a").on("click",function(a){var b=$(this).attr("href");$(".tabs "+b).css("display","inline").siblings().hide(),$(this).parent("li").addClass("active").siblings().removeClass("active"),a.preventDefault(),mapVis||"#map-tab"!==b||zoomdataClient.visualize({visualization:"Vehicle Complaints US Map",source:sourceName,element:$map.get(0)}).done(function(a){mapVis=a;var b=countTextVis.controller.state.filters.toJSON();mapVis.controller.state.addFilters(b)})}),positionSplat(),positionCarImageInBackground(),positionHoodReleaseButton(),toggleYScrollability()}),$(window).resize(function(){resizeBackgrid(),makeVis.controller._controller.resize($makeBarChart.width(),$makeBarChart.height()),modelVis.controller._controller.resize($modelBarChart.width(),$modelBarChart.height()),trendVis.controller._controller.resize($trendVis.width(),$trendVis.height()),scatterplotVis.controller._controller.resize($scatterplot.width(),$scatterplot.height()),mapVis&&mapVis.controller._controller.resize($map.width(),$map.height()),positionSplat(),positionCarImageInBackground(),positionHoodReleaseButton(),toggleYScrollability()});var zoomdataClient=new ZoomdataClient({apiKey:apiKey,host:host,secure:secure});zoomdataClient.visualize({visualization:"Horizontal Bars by Make",source:sourceName,element:$makeBarChart.get(0)}).done(function(a){makeVis=a,a.controller.elementsManager.on("interaction",function(a){$overlay.is(":visible")&&hideOverlay();var b=$makeBarChart.find("div.active");b.toggleClass("active",!1),a.$el.toggleClass("active");var c=a.data().group,d={operation:"IN",path:"make",value:[c]},e={path:"model"};modelVis.controller.state.setFilter(d),countTextVis.controller.state.removeFilter(e,{silent:!0}),countTextVis.controller.state.setFilter(d),crashesGaugeVis.controller.state.removeFilter(e,{silent:!0}),crashesGaugeVis.controller.state.setFilter(d),injuriesGaugeVis.controller.state.removeFilter(e,{silent:!0}),injuriesGaugeVis.controller.state.setFilter(d),firesGaugeVis.controller.state.removeFilter(e,{silent:!0}),firesGaugeVis.controller.state.setFilter(d),speedGaugeVis.controller.state.removeFilter(e,{silent:!0}),speedGaugeVis.controller.state.setFilter(d),scatterplotVis.controller.state.removeFilter(e,{silent:!0}),scatterplotVis.controller.state.setFilter(d),mapVis&&(mapVis.controller.state.removeFilter(e,{silent:!0}),mapVis.controller.state.setFilter(d))})}),zoomdataClient.visualize({visualization:"Total Count Text",source:sourceName,element:$totalCountText.get(0)}).done(function(a){countTextVis=a}),zoomdataClient.visualize({visualization:"Vehicle Crashes Gauge",source:sourceName,element:$crashesGauge.get(0)}).done(function(a){crashesGaugeVis=a}),zoomdataClient.visualize({visualization:"Vehicle Injuries Gauge",source:sourceName,element:$injuriesGauge.get(0)}).done(function(a){injuriesGaugeVis=a}),zoomdataClient.visualize({visualization:"Vehicle Fires Gauge",source:sourceName,element:$firesGauge.get(0)}).done(function(a){firesGaugeVis=a}),zoomdataClient.visualize({visualization:"Vehicle Speed Gauge",source:sourceName,element:$speedGauge.get(0)}).done(function(a){speedGaugeVis=a}),zoomdataClient.visualize({visualization:"Vehicle Complaints Scatterplot",source:sourceName,element:$scatterplot.get(0)}).done(function(a){scatterplotVis=a}),zoomdataClient.visualize({visualization:"Horizontal Bars by Model",source:sourceName,element:$modelBarChart.get(0)}).done(function(a){modelVis=a,a.controller.elementsManager.on("interaction",function(a){var b=$modelBarChart.find("div.active");b.toggleClass("active",!1),a.$el.toggleClass("active");var c=a.data().group,d={operation:"IN",path:"model",value:[c]};countTextVis.controller.state.setFilter(d),crashesGaugeVis.controller.state.setFilter(d),injuriesGaugeVis.controller.state.setFilter(d),firesGaugeVis.controller.state.setFilter(d),speedGaugeVis.controller.state.setFilter(d),scatterplotVis.controller.state.setFilter(d),mapVis&&mapVis.controller.state.setFilter(d)})}),zoomdataClient.visualize({visualization:"Brushing Year",source:sourceName,element:$trendVis.get(0)}).done(function(a){trendVis=a,Zoomdata.eventDispatcher.on("filter:years",function(a){if(a.length>0){var b={operation:"IN",path:"year",value:a};countTextVis.controller.state.setFilter(b),crashesGaugeVis.controller.state.setFilter(b),injuriesGaugeVis.controller.state.setFilter(b),firesGaugeVis.controller.state.setFilter(b),speedGaugeVis.controller.state.setFilter(b),scatterplotVis.controller.state.setFilter(b),mapVis&&mapVis.controller.state.setFilter(b)}else{var b={path:"year"};countTextVis.controller.state.removeFilter(b),crashesGaugeVis.controller.state.removeFilter(b),injuriesGaugeVis.controller.state.removeFilter(b),firesGaugeVis.controller.state.removeFilter(b),speedGaugeVis.controller.state.removeFilter(b),scatterplotVis.controller.state.removeFilter(b),mapVis&&mapVis.controller.state.removeFilter(b)}})});