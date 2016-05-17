/*! springshare 1.11.0 */
var springSpace=springSpace||{};springSpace.util={},springSpace.common={},springSpace.validation={},springSpace.dynForm={},springSpace.lang={},springSpace.ui={},springSpace.googleSearch={},springSpace.session={},springSpace.util._construct=function(){function Util(){LOADING_DOTS='<img border="0" src="//s3.amazonaws.com/libapps/apps/common/images/loading_dots.gif" />'}Util.prototype.loadJS=function(a,b,c,d){{var e,f=document,g=f.getElementsByTagName(a)[0];/^http:/.test(f.location)?"http":"https"}f.getElementById(c)||(e=f.createElement(a),e.id=c,e.src=b,e.onload=d,g.parentNode.insertBefore(e,g))},Util.prototype.setProp=function(a,b){return null!==a&&"undefined"!=typeof a?a:b},Util.prototype.setConfig=function(a){return"undefined"==typeof a?{}:a},Util.prototype.setObjProp=function(a,b,c){a in c||(c[a]=b)},Util.prototype.replaceAll=function(config){var ignore_case=this.setProp(config.ignoreCase,!1),regex="/"+config.searchTerm+"/g";return ignore_case&&(regex+="i"),config.str.replace(eval(regex),config.replaceWith)},Util.prototype.parseQS=function(a){var b={},c=a.qs.replace("?","").split("&");return jQuery.each(c,function(a,c){var d=c.split("=");b[d[0]]=d[1]}),b},Util.prototype.getQSParam=function(a){var b=this.parseQS(a),c=this.setProp(a["default"],"");return"undefined"!=typeof b[a.name]?b[a.name]:c},Util.prototype.getScriptPathLeader=function(){var a=location.pathname;return"/"==a.charAt(a.length-1)?"/":""},Util.prototype.stringFormat=function(a,b){return a.replace(/%(\d+)/g,function(a,c){return b[--c]})},this.Util=Util},springSpace.util._construct(),springSpace.Util=new springSpace.util.Util,springSpace.common._construct=function(){function a(){this.submit_button,this.baseURL=""}a.prototype.getFeed=function(a,b){var c=window.jQuery||$;c.get(a,function(a){c(".s-lg-rss-"+b).html(a),c("[data-toggle='popover']").popover()})},a.prototype.showEnhancedBookData=function(a){springSpace.UI.alert({title:a.title,url:"content_process.php?action="+a.action+"&key="+a.key+"&content_id="+a.content_id,width:"450",height:"250"})},a.prototype.submitPoll=function(a){var b=jQuery("#"+a.form_id);this.submit_button=a.button,springSpace.UI.changeButtonStatus({clicked_text:"Submitting...",status:"clicked",button:this.submit_button}),xhr=jQuery.ajax({url:a.url,dataType:"jsonp",jsonpCallback:"springSpace.Common.submitPollCallback",data:b.serialize()})},a.prototype.submitPollCallback=function(a){var b=this;springSpace.Common.apiLoad?alert("Thank you for submitting your response."):jQuery.ajax({url:springSpace.Common.baseURL+"content_process.php",dataType:"json",cache:!1,data:{action:springSpace.Common.constant.PROCESSING.ACTION_DISPLAY_POLL,content_id:a.data.html.content_id,key:a.data.html.key},success:function(a){jQuery("#s-lg-content-votes-"+a.data.content_id).html(a.data.content),b.showPoll({pane:"votes",elt_id:a.data.content_id}),springSpace.UI.changeButtonStatus({active_text:"Submit",status:"active",button:b.submit_button})},error:function(a,b,c){alert("Oops, sorry! Something unexpected happened: "+c+" \n\nThat might not mean much to you, but it probably does to the Springy Techs...you can let them know at support@springshare.com.")}})},a.prototype.showPoll=function(a){return"votes"==a.pane?(jQuery("#s-lg-content-poll-"+a.elt_id).hide(),jQuery("#s-lg-content-votes-"+a.elt_id).show(),jQuery("#s-lg-show-votes-"+a.elt_id).hide()):"poll"==a.pane&&(jQuery("#s-lg-content-poll-"+a.elt_id).show(),jQuery("#s-lg-content-votes-"+a.elt_id).hide(),jQuery("#s-lg-show-votes-"+a.elt_id).show(),jQuery("#s-lg-show-votes-"+a.elt_id+" button").removeAttr("disabled")),!1},this.Common=a},springSpace.common._construct(),springSpace.Common=new springSpace.common.Common,springSpace.ui._construct=function(){function a(){this.alertObj=null,this.alertConfig=null,this.CONST={conf_close_delay:2e3,load_img_notify:"//s3.amazonaws.com/libapps/apps/common/images/ajax-loader.gif",refresh_page_msg:'<i class="fa fa-refresh"></i> Refreshing page...'}}a.prototype.hoverColor=function(a){console.log("hoverColor"),jQuery(a.hoverEltSelector).hover(function(){jQuery(a.targetEltSelector).css("background",a.hoverColor),console.log("target")},function(){jQuery(a.targetEltSelector).css("background",""),console.log("hover out")})},a.prototype.focus=function(a){a=springSpace.Util.setConfig(a);var b=springSpace.Util.setProp(a.id,".s-lib-focus");jQuery(b).focus(),jQuery('a[data-toggle="tab"]').on("shown.bs.tab",function(){jQuery(b).focus()})},a.prototype.popover=function(a){jQuery("#"+a.elt_id).popover(a)},a.prototype.showEditable=function(a){var b=springSpace.Util.setProp(a.source_id,""),c=springSpace.Util.setProp(a.id,"");c.length>0&&jQuery("#"+b).click(function(a){a.stopPropagation(),jQuery("#"+c).editable("toggle")})},a.prototype.initPopOvers=function(){jQuery("[data-toggle='popover']").popover()},a.prototype.initHelpPopOvers=function(){jQuery("[data-toggle='help-popover-info']").popover({container:"body",placement:"auto right",trigger:"hover click",html:!0,template:'<div class="popover s-lib-help-popover" role="tooltip"><div class="popover-content"></div></div>'})},a.prototype.initChosen=function(){jQuery(".chosen-select").chosen(),jQuery(".chosen-select-deselect").chosen({allow_single_deselect:!0})},a.prototype.setEltVal=function(a){jQuery("#"+a.id).val(a.value)},a.prototype.alert=function(a){if(!jQuery("#s-lib-alert-content").length)return console.log("API error: div #s-lib-alert-content not defined."),!1;jQuery("#s-lib-alert-content").html('<div class="s-lg-text-greyout bold text-center pad-med">Loading...</div>'),"undefined"==typeof a&&(a={}),this.alertConfig=a;var b=this,c=springSpace.Util.setProp(a.resizable,!0),d=springSpace.Util.setProp(a.async,!0),e=springSpace.Util.setProp(a.modal,!0),f=springSpace.Util.setProp(a.title,"[ADD TITLE]"),g=springSpace.Util.setProp(a.content,"[content]"),h=springSpace.Util.setProp(a.url,null),i=springSpace.Util.setProp(a.data,null),j=springSpace.Util.setProp(a.width,400),k=springSpace.Util.setProp(a.height,400),l=springSpace.Util.setProp(a.no_button,!1),m=springSpace.Util.setProp(a.button_class_ok,"btn-primary"),n=(l?[]:springSpace.Util.setProp(a.button_styles,{0:["btn","btn-small"]}),springSpace.Util.setProp(a.load_callback,null)),o=l?{}:springSpace.Util.setProp(a.buttons,{OK:function(){jQuery(this).dialog("close")}});return null!==h?jQuery.ajax({url:h,cache:!1,data:i,async:d,success:function(a){jQuery("#s-lib-alert-content").html(a),b.initPopOvers()}}):jQuery("#s-lib-alert-content").html(g),dialogConfig={title:f,resizable:c,autoResize:!0,width:j,height:k,modal:e,buttons:o,open:function(){$buttonPane=jQuery(".ui-dialog-buttonset"),$buttonPane.children().addClass("btn").addClass("btn-sm").addClass("btn-default");var a=$buttonPane.find("button:first");a.attr("id","s-lib-alert-btn-first"),m&&a.addClass(m),$buttonPane.find("button").addClass("margin-right-med"),null!==n&&n()},resize:function(){jQuery("#s-lib-alert").dialog("option","position","center")}},this.alertObj=jQuery("#s-lib-alert"),this.alertObj.dialog(dialogConfig),!1},a.prototype.getAlertButton=function(a){return springSpace.Util.setObjProp("name","",a),""!==a.name?jQuery(".ui-dialog-buttonset :button:contains('"+a.name+"')"):{}},a.prototype.error=function(a){springSpace.UI.alert({title:"Error",width:800,height:400,content:'<div class="alert alert-danger">Sorry, an error occurred while processing your request. If you continue to receive this error please send the following error code along with a description of the action you were attempting to support@springshare.com.<BR><HR>'+a}),springSpace.UI.refreshAlert()},a.prototype.refreshAlert=function(){this.closeAlert(),this.alert(this.alertConfig)},a.prototype.closeAlert=function(){jQuery("#s-lib-alert-content").empty(),jQuery("#s-lib-alert").dialog("destroy")},a.prototype.centerAlert=function(){jQuery("#s-lib-alert").dialog("option","position",["center","center"])},a.prototype.alertError=function(a){var b=springSpace.Util.setProp(a.error,"Undefined"),c=springSpace.Util.setProp(a.custom_msg,""),d=springSpace.Util.setProp(a.title,"Error!"),e=""!==c?c:'<div class="alert alert-danger">Hmmm...that wasn\'t supposed to happen: ('+b+"). Try it again and see if it takes. If not let support@springshare.com know.</div>",f=springSpace.Util.setProp(a.width,300),g=springSpace.Util.setProp(a.height,250);springSpace.UI.alert({title:d,height:g,width:f,content:e})},a.prototype.alertScrollToField=function(a){if(springSpace.Util.setObjProp("main_tab_id","s-lg-add-content-tab",a),springSpace.Util.setObjProp("scroll_to_id","",a),jQuery("#"+a.main_tab_id).hasClass("active")){var b=jQuery("#s-lib-alert");scrollTo=jQuery("#"+a.scroll_to_id),"undefined"!=typeof scrollTo.offset()&&b.animate({scrollTop:scrollTo.offset().top-b.offset().top+b.scrollTop()})}else jQuery("#"+a.main_tab_id+" a").tab("show"),jQuery("#"+a.main_tab_id+" a").on("shown.bs.tab",function(){var b=jQuery("#s-lib-alert");scrollTo=jQuery("#"+a.scroll_to_id),"undefined"!=typeof scrollTo.offset()&&b.animate({scrollTop:scrollTo.offset().top-b.offset().top+b.scrollTop()})})},a.prototype.scrollToHashId=function(a){springSpace.Util.setObjProp("scroll_to_id","",a);var b=document.location.href.replace(location.hash,"");window.document.location.href=b+"#"+a.scroll_to_id},a.prototype.initContentTabs=function(){jQuery(".s-lib-jqtabs").tabs({create:function(){jQuery(".s-lib-jqtabs").show(),jQuery(".s-lib-ctabs-loading").hide()}})},a.prototype.changeButtonStatus=function(a){var b=springSpace.Util.setProp(a.status,""),c=springSpace.Util.setProp(a.disabled,jQuery(a.button).attr("disabled")),d=springSpace.Util.setProp(a.text,jQuery(a.button).html()),e=springSpace.Util.setProp(a["class"],jQuery(a.button).attr("class")),f=springSpace.Util.setProp(a.active_text,"Save"),g=springSpace.Util.setProp(a.clicked_text,"Saving..."),h=springSpace.Util.setProp(a.conf_text,"Saved!"),i=springSpace.Util.setProp(a.active_class,"btn-primary"),j=(springSpace.Util.setProp(a.clicked_class,"btn-primary"),springSpace.Util.setProp(a.conf_class,"btn-success"));if(""==b)jQuery(a.button).html(d),jQuery(a.button).attr("disabled",c),jQuery(a.button).attr("class",e);else if("clicked"==b)jQuery(a.button).html(g),jQuery(a.button).attr("disabled",!0);else if("conf"==b){var k=springSpace.Util.setProp(a.timeout,4e3);jQuery(a.button).removeClass(i),jQuery(a.button).addClass(j),jQuery(a.button).html(h),jQuery(a.button).attr("disabled",!1),setTimeout(function(){jQuery(a.button).removeClass(j),jQuery(a.button).addClass(i),jQuery(a.button).html(f)},k)}else"active"==b&&(jQuery(a.button).removeClass(j),jQuery(a.button).addClass(i),jQuery(a.button).attr("disabled",!1),jQuery(a.button).html(f))},a.prototype.changeSaveButtonStatus=function(a){var b={};b.save="active",b.saving="clicked",b.saved="conf",a.active_text||(a.active_text="Save"),a.clicked_text||(a.clicked_text="Saving..."),a.conf_text||(a.conf_text="Saved"),this.changeButtonStatus({active_text:a.active_text,clicked_text:a.clicked_text,conf_text:a.conf_text,status:b[a.status],button:a.button})},a.prototype.xhrPopover=function(){jQuery(".s-lib-popover").popover({container:"body",html:!0,content:function(){return jQuery.ajax({url:jQuery(this).data("ajload"),type:"get",dataType:"json",async:!1,success:function(a){jQuery("#s-lib-popover-content").html(a.data.content)}}),jQuery("#s-lib-popover-content").html()}}).click(function(a){jQuery(".s-lib-popover").not(this).popover("hide"),jQuery(".popover-title").html(jQuery(this).data("original-title")+'<button type="button" class="close">&times;</button>'),jQuery(".close, .btn-close").click(function(){jQuery(".s-lib-popover").popover("hide")}),a.preventDefault()}),jQuery(".popclose").on("click",function(){console.log("hi")})},a.prototype.closeXhrPopover=function(){jQuery(".s-lib-popover").popover("hide")},a.prototype.scrollToTop=function(a){var b=springSpace.Util.setProp(a.scroll_time,1500),c=springSpace.Util.setProp(a.position,0);jQuery("html, body").animate({scrollTop:c},b)},a.prototype.clickOnEnter=function(a){jQuery("."+a.class_name).keyup(function(b){13==b.keyCode&&(b.preventDefault(),jQuery("#"+a.button_id).click())})},a.prototype.disableSubmitOnEnter=function(a){jQuery("."+a.class_name).bind("keypress",function(a){return 13==a.keyCode&&"textarea"!=a.target.tagName.toLowerCase()?!1:void 0})},a.prototype.notifyInit=function(){jQuery.notification||(jQuery.notification=function(a,b){function c(){clearTimeout(h),k.fadeOut(b.hideSpeed,function(){jQuery(this).remove()})}if(""!==a&&void 0!==a&&null!==a){b=jQuery.extend(!0,{className:"jquery-notification",duration:2e3,freezeOnHover:!1,hideSpeed:250,position:"center",showSpeed:250,zIndex:99999},b),jQuery("#jquery-notification").length>0&&(b.showSpeed=0),jQuery("#jquery-notification").remove();var d,e,f,g,h,i=jQuery(window).width(),j=jQuery(window).height(),k=jQuery('<div id="jquery-notification" />');switch(k.appendTo(jQuery("BODY")).addClass(b.className).html(a).css({position:"fixed",display:"none",zIndex:b.zIndex}).mouseover(function(){b.freezeOnHover&&clearTimeout(h),jQuery(this).addClass(b.className+"-hover")}).mouseout(function(){jQuery(this).removeClass(b.className+"-hover"),b.freezeOnHover&&(h=setTimeout(c,b.duration))}).click(c).wrapInner('<div id="jquery-notification-message" />'),d=k.outerWidth(),e=k.outerHeight(),b.position){case"top":f=0,g=i/2-d/2;break;case"top-left":f=0,g=0;break;case"top-right":f=0,g=i-d;break;case"bottom":f=j-e,g=i/2-d/2;break;case"bottom-left":f=j-e,g=0;break;case"bottom-right":f=j-e,g=i-d;break;case"left":f=j/2-e/2,g=0;break;case"right":f=j/2-e/2,g=i-d;break;default:case"center":f=j/2-e/2,g=i/2-d/2}k.css({top:f,left:g}).fadeIn(b.showSpeed,function(){h=setTimeout(c,b.duration)})}})},a.prototype.notify=function(a){switch(this.notifyInit(),springSpace.Util.setObjProp("msg","",a),springSpace.Util.setObjProp("duration",5e3,a),springSpace.Util.setObjProp("mode","custom",a),settings={duration:a.duration},a.mode){case"custom":break;case"load":a.msg='<img src="'+springSpace.UI.CONST.load_img_notify+'" alt="Working..." />';break;case"success":a.msg="Success.";break;case"error":a.msg="Error: Please try again.",settings={className:"jquery-notification-error",duration:a.duration}}("undefined"==typeof a.msg||""==a.msg)&&(a.msg="Error: Please try again."),jQuery.notification(a.msg,settings)},a.prototype.notifyStop=function(){jQuery("#jquery-notification").hide()},a.prototype.disableButton=function(a){springSpace.Util.setObjProp("btn_id","s-lib-alert-btn-first",a),jQuery("#"+a.btn_id).addClass("disabled")},a.prototype.enableButton=function(a){springSpace.Util.setObjProp("btn_id","s-lib-alert-btn-first",a),jQuery("#"+a.btn_id).removeClass("disabled")},this.UI=a},springSpace.ui._construct(),springSpace.UI=new springSpace.ui.UI,springSpace.validation._construct=function(){function a(){}a.prototype.required=function(a){var b=springSpace.Util.setProp(a.field_type,!1);return"checkbox"==b?jQuery("#"+a.id).is(":checked"):"text"==b?""!=jQuery("#"+a.id).val().trim():void 0},a.prototype.checkbox=function(a){return this.require_checked=springSpace.Util.setProp(a.require_checked,!1),this.require_checked?jQuery("#"+a.id).is(":checked")?!0:!1:!0},a.prototype.checkbox_group=function(a){return this.require_checked=springSpace.Util.setProp(a.require_checked,!1),this.require_checked?jQuery("input[name='"+a.group_name+"']:checked").length>0:!0},a.prototype.email=function(a){this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.val=springSpace.Util.setProp(jQuery.trim(a.val),"");var b=/^([\w-'\.\/]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;return this.allow_empty&&""==this.val?!0:b.test(this.val)?!0:!1},a.prototype.email_list=function(a){if(this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.val=springSpace.Util.setProp(jQuery.trim(a.val),""),""==this.val)return this.allow_empty;var b=this.val.replace(";",",").split(","),c=this,d=!0;return jQuery.each(b,function(a,b){d=d&&c.email({val:b,allow_empty:this.allow_empty})}),d},a.prototype.url=function(a){this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.allow_relative=springSpace.Util.setProp(a.allow_relative,!1),this.val=springSpace.Util.setProp(jQuery.trim(a.val),"");var b=/^$|^\/.+/gi,c=/^$|^https?:\/\/.+/gi;return""==this.val?this.allow_empty:this.allow_relative?b.test(this.val)||c.test(this.val):c.test(this.val)},a.prototype.url_ldap=function(a){this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.allow_relative=springSpace.Util.setProp(a.allow_relative,!1),this.val=springSpace.Util.setProp(jQuery.trim(a.val),"");var b=/^$|^\/.+/gi,c=/^$|^ldaps?:\/\/.+/gi;return""==this.val?this.allow_empty:this.allow_relative?b.test(this.val)||c.test(this.val):c.test(this.val)},a.prototype.url_cas=function(a){this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.allow_relative=springSpace.Util.setProp(a.allow_relative,!1),this.val=springSpace.Util.setProp(jQuery.trim(a.val),"");var b=/^$|^\/.+/gi,c=/^$|^https:\/\/.+\/serviceValidate/gi;return""==this.val?this.allow_empty:this.allow_relative?b.test(this.val)||c.test(this.val):c.test(this.val)},a.prototype.slug=function(a){this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.val=springSpace.Util.setProp(jQuery.trim(a.val),"");var b=/^[a-zA-Z0-9_\/-]+$/g;return this.allow_empty&&""==this.val?!0:b.test(this.val)?!0:!1},a.prototype.slug_unique=function(a){this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.val=springSpace.Util.setProp(jQuery.trim(a.val),"");var b=springSpace.Util.setProp(jQuery.trim(a.friendly_id),0),c=springSpace.Util.setProp(jQuery.trim(a.prefix),"");if(this.allow_empty&&""==this.val)return!0;var d=!0;return xhr=jQuery.ajax({url:"friendly_process.php",type:"POST",async:!1,dataType:"json",data:{action:184,friendly_id:b,slug:this.val,prefix:c,key:"auth_key"},success:function(a){d=1==a.data.status},error:function(){}}),d},a.prototype.max_length=function(a){this.val=jQuery("#"+a.id).val();var b=springSpace.Util.setProp(jQuery.trim(a.max_length),0),c=springSpace.Util.setProp(a.use_form_msg,!0);if(0==b||this.val.length<=b)return jQuery("#form-msg-"+a.id).html("").toggle(!1),!0;var d="You have reached the maximum length of this field - "+b+" characters.";return c?setTimeout(function(){jQuery("#form-msg-"+a.id).html(d).toggle(!0)},250):alert(d),jQuery("#"+a.id).val(this.val.substring(0,b)),!1},a.prototype.ip=function(a){this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.val=springSpace.Util.setProp(jQuery.trim(a.val),"");var b=this.val.split(".");return""==this.val?this.allow_empty:4!=b.length?!1:b[0]>=0&&b[0]<=255&&b[1]>=0&&b[1]<=255&&b[2]>=0&&b[2]<=255&&b[3]>=0&&b[3]<=255},a.prototype.number=function(a){return this.allow_empty=springSpace.Util.setProp(a.allow_empty,!0),this.val=springSpace.Util.setProp(jQuery.trim(a.val),""),""==this.val||0==this.val?this.allow_empty:jQuery.isNumeric(this.val)&&this.val>0},this.Validation=a},springSpace.validation._construct(),springSpace.Validation=new springSpace.validation.Validation,springSpace.dynForm._construct=function(){function a(a){this.elt_ref=springSpace.Util.setProp(a.elt_ref,""),this.data_field=!1,this.fields=springSpace.Util.setProp(a.fields,{}),this.form_id=springSpace.Util.setProp(a.form_id,""),this.url=springSpace.Util.setProp(a.url,""),this.method=springSpace.Util.setProp(a.method,"POST"),this.button=springSpace.Util.setProp(a.button,null),this.form=jQuery("<form>"),this.msg_obj=springSpace.Util.setProp(a.msg_obj,null),this.msg_time=springSpace.Util.setProp(a.msg_time,4e3),this.auto_submit=springSpace.Util.setProp(a.auto_submit,!0),this.return_type=springSpace.Util.setProp(a.return_type,"json"),this.callback=springSpace.Util.setProp(a.callback,null)}a.prototype.setProp=function(a,b){return a?a:b},a.prototype.build=function(){var a=this;jQuery(this.elt_ref).click(function(){if(a.form=jQuery("<form>"),jQuery(this).attr("data-field")){var b=jQuery(this).attr("data-field");a.form.append(jQuery("<input>",{name:"value",value:jQuery("#"+b).val(),type:"hidden"})),a.form.append(jQuery("<input>",{name:"name",value:b,type:"hidden"}))}else a.form.append(jQuery("<input>",{name:"value",value:jQuery(this).val(),type:"hidden"})),a.form.append(jQuery("<input>",{name:"name",value:jQuery(this).attr("name"),type:"hidden"}));jQuery.each(a.fields,function(b,c){a.form.append(jQuery("<input>",{name:c.name,value:c.val,type:c.type}))}),a.auto_submit&&a.submit()})},a.prototype.buildStandard=function(){var a=this.elt_ref?jQuery(this.elt_ref):"";if(jQuery(a).attr("data-field")){var b=jQuery(a).attr("data-field");this.form.append(jQuery("<input>",{name:"value",value:jQuery("#"+b).val(),type:"hidden"})),this.form.append(jQuery("<input>",{name:"name",value:b,type:"hidden"}))}else a&&(this.form.append(jQuery("<input>",{name:"value",value:jQuery(a).val(),type:"hidden"})),this.form.append(jQuery("<input>",{name:"name",value:jQuery(a).attr("name"),type:"hidden"})));var c=this;jQuery.each(c.fields,function(a,b){c.form.append(jQuery("<input>",{name:b.name,value:b.val,type:b.type}))}),this.auto_submit&&this.submit()},a.prototype.submit=function(){var a=this;springSpace.UI.changeSaveButtonStatus({status:"saving",button:a.button}),xhr=jQuery.ajax({url:this.url,type:this.method,dataType:this.return_type,data:this.form.serialize(),success:function(b,c){null!==a.callback?a.callback(b,c):a.msg_obj&&a.button&&(springSpace.UI.changeSaveButtonStatus({status:"saved",button:a.button}),setTimeout(function(){springSpace.UI.changeSaveButtonStatus({status:"save",button:a.button})},a.msg_time))},error:function(a,b,c){c&&alert("Oops, sorry! Something unexpected happened: "+c+" \n\nThat might not mean much to you, but it probably does to the Springy Techs...you can let them know at support@springshare.com.")}})},this.DynForm=a},springSpace.dynForm._construct(),springSpace.googleSearch._construct=function(){function a(a){this.config=a,this.searchField="",this.search_type=springSpace.Util.setProp(a.search_type,"web")}a.prototype.getSearchObj=function(a){var b;return"web"==this.search_type?b=new a.search.WebSearch:"patent"==this.search_type?b=new a.search.PatentSearch:"books"==this.search_type?b=new a.search.BookSearch:"scholar"==this.search_type&&(b=new a.search.ScholarSearch),b},a.prototype.Search=function(a){this.googleSearch=this.getSearchObj(a),this.googleSearch.setSearchCompleteCallback(this,this.searchComplete,null);var b=document.forms[this.config.form_name];return this.searchField=b[this.config.field_name],""==this.searchField.value?!1:(document.getElementById("patent_search_content_"+this.config.content_id).innerHTML='<img alt=Loading src="//s3.amazonaws.com/libapps/apps/common/images/loading_dots.gif" align="top">',this.googleSearch.setResultSetSize(this.config.num_results),this.googleSearch.execute(this.searchField.value),a.search.Search.getBranding("branding_"+this.config.content_id),void(document.getElementById("branding_"+this.config.content_id).style.display="block"))},a.prototype.searchComplete=function(){if(document.getElementById("patent_search_content_"+this.config.content_id).innerHTML="",this.googleSearch.results&&this.googleSearch.results.length>0){for(var a=0;a<this.googleSearch.results.length;a++){var b=this.googleSearch.results[a].html.cloneNode(!0);document.getElementById("patent_search_content_"+this.config.content_id).appendChild(b)}var c=document.createElement("div");c.innerHTML='<div style="padding: 10px 0 0 0;"><a href="http://www.google.com/search?tbm=pts&tbo=1&hl=en&q='+escape(this.searchField.value)+'" target="_blank">View more results</a></div>',document.getElementById("patent_search_content_"+this.config.content_id).appendChild(c)}},this.GoogleSearch=a},springSpace.googleSearch._construct(),springSpace.UI.imagePreview=function(){xOffset=5,yOffset=5,jQuery("a.preview").click(function(){var a=jQuery(this).data("title");""==a&&(a="Image Preview"),springSpace.UI.alert({title:a,content:"<p id='preview'><img src='"+jQuery(this).data("src")+"' alt='Image preview' style='padding-right: 3px; max-width:100%; max-height:100%;' /></p>"}),springSpace.UI.centerAlert()})},springSpace.UI.closeImagePreview=function(a){a.title=a.t,jQuery("#preview").remove()},springSpace.UI.displayErItem=function(a){springSpace.Util.setProp(a.processing_url,"/er_process.php"),springSpace.Util.setProp(a.site_id,0),springSpace.Util.setProp(a.er_item_id,0),springSpace.Util.setProp(a.er_course_id,0),springSpace.Util.setProp(a.view_mode,0),springSpace.Util.setProp(a.width,800),springSpace.Util.setProp(a.height,500),jQuery(window).width()<800&&(a.width=jQuery(window).width()-15),jQuery(window).height()<500&&(a.height=jQuery(window).height()-15),springSpace.UI.alert({title:"View Item",url:a.processing_url+"?action=199",width:a.width,height:a.height,data:{site_id:a.site_id,er_item_id:a.er_item_id,er_course_id:a.er_course_id,view_mode:a.view_mode},type:"GET",buttons:{Close:function(){springSpace.UI.closeAlert()}}})},springSpace.session._construct=function(){function a(){this.session_data=null,this.session_check_callback=function(){},this.CONST={ACTION_SET_LG_SESSION_COOKIE:null},this.auth_reload_script="",this.auth_messages={cookie_failure:""}}a.prototype.getLGSessionStatus=function(a){return springSpace.Util.setObjProp("session_id",null,a),springSpace.Util.setObjProp("data",{},a),this.session_check_callback=a.callback,xhr=jQuery.ajax({url:a.url,dataType:"jsonp",xhrFields:{withCredentials:!0},crossDomain:!0,cache:!1,jsonpCallback:"springSpace.Session.getLGSessionStatusCallback",data:a.data}),xhr},a.prototype.getLGSessionStatusCallback=function(a){a.data.session&&!jQuery.isEmptyObject(a.data.session)?(this.session_data=a.data.session,xhr=jQuery.ajax({url:"/auth_process.php",cache:!1,dataType:"json",data:{action:springSpace.Session.CONST.ACTION_AUTH_SET_LG_SESSION_COOKIE,account_id:a.data.session.account_id,site_id:a.data.session.site_id,customer_id:a.data.session.customer_id,account_level:a.data.session.level,acl:a.data.session.acl,auth_reload:a.data.auth_reload},success:function(b){switch(b.errCode){case 200:console.log(b.data.msg+" for "+a.data.session.email),1==b.data.auth_reload&&(springSpace.Session.auth_reload_script.length>0?top.window.document.location.href=springSpace.Session.auth_reload_script:console.log("Error with LG session processing. No auth_reload_script specified."));break;default:console.log("Error with LG session processing. "+b.errCode)}},error:function(a,b,c){console.log("Error with LG session processing. "+c)}})):(1==a.data.auth_reload&&(springSpace.UI.notifyStop(),jQuery("body").append(springSpace.Session.auth_messages.cookie_failure.text)),console.log("No s_public_lgs cookie. Darn."))},a.prototype.imgReq=function(a){return console.log(a),document.images?(a.imgs[a.idx]=new Image,a.imgs[a.idx].src=a.src):document.write('<img alt="Springshare session processing." src="'+a.src+'" style="height: 0px; width: 0px; display: none;" />'),!0},this.Session=a},springSpace.session._construct(),springSpace.Session=new springSpace.session.Session;