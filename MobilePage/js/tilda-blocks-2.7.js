 
function t142_checkSize(recid){
  var el=$("#rec"+recid).find(".t142__submit");
  if(el.length){
    var btnheight = el.height() + 5;
    var textheight = el[0].scrollHeight;
    if (btnheight < textheight) {
      var btntext = el.text();
      el.addClass("t142__submit-overflowed");
      el.html("<span class=\"t142__text\">" + btntext + "</span>");
    }
  }
} 
function t228_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t228__list_item a[href='"+url+"']").addClass("t-active");
  $(".t228__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t228_checkAnchorLinks(recid) {
    if ($(window).width() >= 960) {
        var t228_navLinks = $("#rec" + recid + " .t228__list_item a:not(.tooltipstered)[href*='#']");
        if (t228_navLinks.length > 0) {
            setTimeout(function(){
              t228_catchScroll(t228_navLinks);
            }, 500);
        }
    }
}

function t228_catchScroll(t228_navLinks) {
    var t228_clickedSectionId = null,
        t228_sections = new Array(),
        t228_sectionIdTonavigationLink = [],
        t228_interval = 100,
        t228_lastCall, t228_timeoutId;
    t228_navLinks = $(t228_navLinks.get().reverse());
    t228_navLinks.each(function() {
        var t228_cursection = t228_getSectionByHref($(this));
        if (typeof t228_cursection.attr("id") != "undefined") {
            t228_sections.push(t228_cursection);
        }
        t228_sectionIdTonavigationLink[t228_cursection.attr("id")] = $(this);
    });
		t228_updateSectionsOffsets(t228_sections);
    t228_sections.sort(function(a, b) {
      return b.attr("data-offset-top") - a.attr("data-offset-top");
    });
		$(window).bind('resize', t_throttle(function(){t228_updateSectionsOffsets(t228_sections);}, 200));
		$('.t228').bind('displayChanged',function(){t228_updateSectionsOffsets(t228_sections);});
		setInterval(function(){t228_updateSectionsOffsets(t228_sections);},5000);
    t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);

    t228_navLinks.click(function() {
        var t228_clickedSection = t228_getSectionByHref($(this));
        if (!$(this).hasClass("tooltipstered") && typeof t228_clickedSection.attr("id") != "undefined") {
            t228_navLinks.removeClass('t-active');
            $(this).addClass('t-active');
            t228_clickedSectionId = t228_getSectionByHref($(this)).attr("id");
        }
    });
    $(window).scroll(function() {
        var t228_now = new Date().getTime();
        if (t228_lastCall && t228_now < (t228_lastCall + t228_interval)) {
            clearTimeout(t228_timeoutId);
            t228_timeoutId = setTimeout(function() {
                t228_lastCall = t228_now;
                t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
            }, t228_interval - (t228_now - t228_lastCall));
        } else {
            t228_lastCall = t228_now;
            t228_clickedSectionId = t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId);
        }
    });
}


function t228_updateSectionsOffsets(sections){
	$(sections).each(function(){
		var t228_curSection = $(this);
		t228_curSection.attr("data-offset-top",t228_curSection.offset().top);
	});
}

function t228_getSectionByHref(curlink) {
      var t228_curLinkValue = curlink.attr('href').replace(/\s+/g, '').replace(/.*#/, '');
      if (curlink.is('[href*="#rec"]')) {
          return $(".r[id='" + t228_curLinkValue + "']");
      } else {
          return $(".r[data-record-type='215']").has("a[name='" + t228_curLinkValue + "']");
      }
  }

function t228_highlightNavLinks(t228_navLinks, t228_sections, t228_sectionIdTonavigationLink, t228_clickedSectionId) {
    var t228_scrollPosition = $(window).scrollTop(),
        t228_valueToReturn = t228_clickedSectionId;
    /*if first section is not at the page top (under first blocks)*/
    if (t228_sections.length != 0 && t228_clickedSectionId == null && t228_sections[t228_sections.length-1].attr("data-offset-top") > (t228_scrollPosition + 300)){
      t228_navLinks.removeClass('t-active');
      return null;
    }

    $(t228_sections).each(function(e) {
        var t228_curSection = $(this),
            t228_sectionTop = t228_curSection.attr("data-offset-top"),
            t228_id = t228_curSection.attr('id'),
            t228_navLink = t228_sectionIdTonavigationLink[t228_id];
        if (((t228_scrollPosition + 300) >= t228_sectionTop) || (t228_sections[0].attr("id") == t228_id && t228_scrollPosition >= $(document).height() - $(window).height())) {
            if (t228_clickedSectionId == null && !t228_navLink.hasClass('t-active')) {
                t228_navLinks.removeClass('t-active');
                t228_navLink.addClass('t-active');
                t228_valueToReturn = null;
            } else {
                if (t228_clickedSectionId != null && t228_id == t228_clickedSectionId) {
                    t228_valueToReturn = null;
                }
            }
            return false;
        }
    });
    return t228_valueToReturn;
}

function t228_setPath(){
}

function t228_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var left_exist=el.find('.t228__leftcontainer').length;
      var left_w=el.find('.t228__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t228__rightcontainer').length;
      var right_w=el.find('.t228__rightcontainer').outerWidth(true);
	  var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t228__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      var padd_w=40;
      var maincontainer_width=el.find(".t228__maincontainer").outerWidth();
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
		  if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t228__leftside").css("min-width",max_w+"px");
            el.find(".t228__rightside").css("min-width",max_w+"px");
            el.find(".t228__list").removeClass("t228__list_hidden");
          }
       }else{
          el.find(".t228__leftside").css("min-width","");
          el.find(".t228__rightside").css("min-width","");  
          
      }
    });
  }
}

function t228_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);
      }
      });
      }else{
        $(".t228").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t228_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t228").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");  
                                el.css("visibility","visible");
                                var topoffset = el.data('top-offset');
                                if (topoffset && parseInt(topoffset) > 0) {
                                    el.animate({"opacity": "1","top": topoffset+"px"}, 200,function() {
                                    });
                                    
                                } else {
                                    el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                    });
                                }
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
							el.css("opacity","0");	
                          }
                  }
           });
      }

}

function t228_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t228_createMobileMenu(recid){
  var window_width=$(window).width(),
      el=$("#rec"+recid),
      menu=el.find(".t228"),
      burger=el.find(".t228__mobile");
  burger.click(function(e){
    menu.fadeToggle(300);
    $(this).toggleClass("t228_opened")
  })
  $(window).bind('resize', t_throttle(function(){
    window_width=$(window).width();
    if(window_width>980){
      menu.fadeIn(0);
    }
  }, 200));
}
 
function t270_scroll(hash, offset) {
    var $root = $('html, body');
    var target = "";
    try {
        target = $(hash);
    } catch(event) {
        console.log("Exception t270: " + event.message);
        return true;
    }
    if (target.length == 0) {
        target = $('a[name="' + hash.substr(1) + '"]');
        if (target.length == 0) {
            return true;
        }
    }
    $root.animate({
        scrollTop: target.offset().top - offset
    }, 500, function() {
        if(history.pushState) {
            history.pushState(null, null, hash);
        } else {
            window.location.hash = hash;
        }
    });
    return true;
} 
function t282_showMenu(recid){
  var el=$("#rec"+recid);
  el.find('.t282__burger, .t282__menu__item:not(".tooltipstered"):not(".t282__menu__item_submenu"), .t282__overlay').click(function(){
    if ($(this).is(".t282__menu__item.tooltipstered, .t794__tm-link")) { return; }  
    $('body').toggleClass('t282_opened');
    el.find('.t282__menu__container, .t282__overlay').toggleClass('t282__closed');
    el.find(".t282__menu__container").css({'top':(el.find(".t282__container").height()+'px')});
  });
  $('.t282').bind('clickedAnchorInTooltipMenu',function(){
    $('body').removeClass('t282_opened');
    $('#rec'+recid+' .t282__menu__container, #rec'+recid+' .t282__overlay').addClass('t282__closed');
  });
  
  if (el.find('.t-menusub__link-item')) {
    el.find('.t-menusub__link-item').on('click', function() {
      $('body').removeClass('t282_opened');
      $('#rec' + recid + ' .t282__menu__container, #rec' + recid + ' .t282__overlay').addClass('t282__closed')
    })
  }
}

function t282_changeSize(recid){
  var el=$("#rec"+recid);
  var bottomheight = el.find(".t282__menu__container");
  var headerheight = el.find(".t282__container");
  var menu = bottomheight.height() + headerheight.height();
  var win = $(window).height();
  if (menu > win ) {
    $("#nav"+recid).addClass('t282__menu_static');
  }
  else {
    $("#nav"+recid).removeClass('t282__menu_static');
  }
}

function t282_changeBgOpacityMenu(recid) {
 var window_width=$(window).width();
 var record = $("#rec"+recid);
 record.find(".t282__container__bg").each(function() {
    var el=$(this);
    var bgcolor=el.attr("data-bgcolor-rgba");
    var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
    var bgopacity=el.attr("data-bgopacity");
    var bgopacity_afterscroll=el.attr("data-bgopacity2");
    var menu_shadow=el.attr("data-menu-shadow");
    if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if (bgopacity_afterscroll != "0" && bgopacity_afterscroll != "0.0") {
          el.css('box-shadow',menu_shadow);
        } else {
          el.css('box-shadow','none');
        }
    }else{
        el.css("background-color",bgcolor);
        if (bgopacity != "0" && bgopacity != "0.0") {
          el.css('box-shadow',menu_shadow);
        } else {
          el.css('box-shadow','none');
        }
    }
 });
}

function t282_highlight(recid){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t282__menu a[href='"+url+"']").addClass("t-active");
  $(".t282__menu a[href='"+url+"/']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"']").addClass("t-active");
  $(".t282__menu a[href='"+pathname+"/']").addClass("t-active");
  $(".t282__menu a[href='/"+pathname+"/']").addClass("t-active");
}

function t282_appearMenu(recid) {
      var window_width=$(window).width();
           $(".t282").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");  
                                el.css("visibility","visible");
                                el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                });       
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });

}

 
    var t386 = {};
    
    t386.equalheight = function(recid) {

        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
            
        $('#rec'+recid+' .t386__textwrapper').each(function() {
     
            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;
       
            if (currentRowStart != topPostion) {
                for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0;
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    };
 
function t403_showMore(recid) {
  var el=$('#rec'+recid).find(".t403");
  el.find(".t403__container-table").hide();
  cards_size = el.find(".t403__container-table").size();
  cards_count=parseInt(el.attr("data-show-count"));
  x=cards_count;
  y=cards_count;
  el.find('.t403__container-table:lt('+x+')').show();
  el.find('.t403__showmore').click(function () {
      x= (x+y <= cards_size) ? x+y : cards_size;
      el.find('.t403__container-table:lt('+x+')').show();
      if(x == cards_size){
          el.find('.t403__showmore').hide();
      }
  });
} 
function  t431_createTable(recid,tablehead,tabledata,tablecolsize,hastargetblank,btnstyles,t431__tdstyles,t431__thstyles,t431__oddrowstyles,t431__evenrowstyles){
	var t431__arrayColSize = t431_parseData(tablecolsize);
	var t431__arrayHead = t431_parseData(tablehead);
    var t431__arrayData = t431_parseData(tabledata);

	var t431__maxcolnumber = t431__findMaxRowLengthInTable(t431__arrayHead,t431__arrayData);
	var t431__colWidth = t431__setColumnsWidth(t431__arrayColSize,t431__maxcolnumber,recid);
	if (t431__colWidth[0].myText && t431__colWidth[0].myText[t431__colWidth[0].myText.length - 1] == "%") {
		for (var i=0; i<t431__colWidth.length; i++) {
			t431__colWidth[i].myText = t431__colWidth[i].myText.slice(0,-1);
			t431__colWidth[i].myText += "vw";
		}
	}

	var t431__container = $('#rec'+recid+' .t431 .t-container .t431__table');
	var t431__htmlTable = "";
	if (t431__arrayHead) { t431__htmlTable += t431__generateHtml(recid,t431__arrayHead,"th",hastargetblank,t431__colWidth,btnstyles,t431__thstyles,null,null,t431__maxcolnumber);}
	t431__container.append(t431__htmlTable);
	t431__htmlTable = "";
	if (t431__arrayData) { t431__htmlTable += t431__generateHtml(recid,t431__arrayData,"td",hastargetblank,t431__colWidth,btnstyles,t431__tdstyles,t431__oddrowstyles,t431__evenrowstyles,t431__maxcolnumber);}
    t431__container.append(t431__htmlTable);
};


/*add display:block to thead and tbody for vertical scroll, set th width to fix unequal col width*/
function t431_setHeadWidth(recid) {
  if ($(window).width() > 960) {
    var tBody = $('#rec' + recid + ' .t431 .t431__tbody');
    var tHead = $('#rec' + recid + ' .t431 .t431__thead');
    tBody.css("display", "block");
    tHead.css("display", "block");

    var colWidth = $('#rec' + recid + ' .t431 .t431__tbody tr:first').children().map(function() {
      return $(this).width();
    });

    var vBorder = "";
    if ($('#rec' + recid + ' .t431 .t431__tbody tr td:first').css('border-left-width').length >= 3) {
      vBorder = $('#rec' + recid + ' .t431 .t431__tbody tr td:first').css('border-left-width').slice(0, -2);
    }

    $('#rec' + recid + ' .t431 .t431__thead tr').children().each(function(i, el) {
      if ($(el).is(":last-child")) {
        $(el).width(colWidth[i] + (tBody.width() - $('#rec' + recid + ' .t431 .t431__tbody tr:first').width()));
      } else {
        $(el).width(colWidth[i] + (+vBorder));
      }
    });
  }
}

function t431__findMaxRowLengthInTable(arrayHead, arrayData) {
  var headMaxLength = 0;
  var dataMaxLength = 0;
  if (arrayHead) {
    headMaxLength = t431__findMaxRowLengInArray(arrayHead);
  }
  if (arrayData) {
    dataMaxLength = t431__findMaxRowLengInArray(arrayData);
  }
  if (dataMaxLength > headMaxLength) {
    return dataMaxLength;
  } else {
    return headMaxLength;
  }
}

function t431__findMaxRowLengInArray(curArray) {
  var maxLength = 0;
  for (var i = 0; i < curArray.length; i++) {
    if (curArray[i].length > maxLength) {
      maxLength = curArray[i].length;
    }
  }
  return maxLength;
}

function t431__setColumnsWidth(colWidth, colsNumber, recid) {
  if (colWidth) {
    return colWidth[0];
  } else {
    var tableWidth = $('#rec' + recid + ' .t431 .t-container .t-col').width();
    return (tableWidth / colsNumber + "px");
  }
}

function t431__generateHtml(recid,arrayValues,coltag,hastargetblank,colWidth,btnstyles,colstyles,oddrowstyles,evenrowstyles,maxcolnumber) {
	var t431__htmlpart = "";


	if (coltag == "td") {
		var t431__theadorbodytag = "tbody";
	} else {
		var t431__theadorbodytag = "thead";
	}
	t431__htmlpart += "<" + t431__theadorbodytag + " class=\"t431__" + t431__theadorbodytag + "\">";

	/*remove forst body row top border, if table head has bottom border*/
	if($('#rec'+recid+' .t431 .t-container .t431__thead th').length>0 && $('#rec'+recid+' .t431 .t-container .t431__thead th').css("border-bottom-width")[0]!="0") {
		var t431__firstbodyrowstyle = "border-top: 0 !important;";
	}

	for (var i=0; i<arrayValues.length; i++) {

		/*add classes for striped table*/
		if (coltag == "td") {
			if ((i + 1) % 2 > 0) {
				t431__htmlpart += "<tr class=\"t431__oddrow\"" + "style=\"" + oddrowstyles + "\">";
			} else { t431__htmlpart += "<tr class=\"t431__evenrow\"" + "style=\"" + evenrowstyles + "\">";}
		} else {
			t431__htmlpart += "<tr>";
		}

		var t431__addingcols = 0;
		if (arrayValues[i].length<maxcolnumber) {
			t431__addingcols = maxcolnumber - arrayValues[i].length;
        }
		for (var j=0; j<(arrayValues[i].length + t431__addingcols); j++) {
			if (arrayValues[i][j]) {
				/*define col width*/
                if(Array.isArray(colWidth) && colWidth[j]) {
                    var t431__curWidth = colWidth[j].myText;
                } else { var t431__curWidth = colWidth;}

				 if (i==0 && coltag=="td") {
					var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + t431__firstbodyrowstyle + "\">";
				} else {
					var t431__colwithattr = "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">";
				}

                if (arrayValues[i][j].myHref) {
                    var t431__tblank = "";
                    if (hastargetblank) {var t431__tblank = "target=\"_blank\"";}
                    /*define link type*/
                    if (arrayValues[i][j].myHrefType == "link") {
                        var t431__linkwithattr = "<a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + ">";
                        var t431__linkclosetag = "</a>";
                    } else {
                        var t431__linkwithattr = "<div class=\"t431__btnwrapper\"><a href=\"" + arrayValues[i][j].myHref + "\"" + t431__tblank + " class=\"t-btn t-btn_sm\" style=\"" + btnstyles + "\"><table style=\"width:100%; height:100%;\"><tr><td>";
                        var t431__linkclosetag = "</td></tr></table></a></div>";
                    }
                    t431__htmlpart += t431__colwithattr + t431__linkwithattr + arrayValues[i][j].myText + t431__linkclosetag + "</" + coltag + ">";
                } else {
                    t431__htmlpart += t431__colwithattr + arrayValues[i][j].myText + "</" + coltag + ">";
                }
			} else {
					t431__htmlpart += "<" + coltag + " class=\"t431__" + coltag + "\" style=\"width:" + t431__curWidth + ";" + colstyles + "\">" + "</" + coltag + ">";
			}
		}
		t431__htmlpart += "</tr>";
	}
	t431__htmlpart += "</" + t431__theadorbodytag + ">";
	return t431__htmlpart;
};

function t431_parseData(data) {
  if (data !== "" && typeof data != "undefined") {
    data = t431__addBrTag(data);
    var arrayTable = [];
    var arrayRow = [];
    var curItem = { myText: "", myHref: "", myHrefType: "" };
    var hasLink = "";
    var hasLinkWithSpace = "";
    var hasBtn = "";
    var hasBtnWithSpace = "";
    var endLine = "";
    for (var i = 0; i < data.length; i++) {
      /*col end and check of special symbols: «>», «<», «&&#187; and « »*/
      if (data[i] == ";" && !(data.slice(i - 4, i) == "&lt;" || data.slice(i - 4, i) == "&gt;" || data.slice(i - 5, i) == "&amp;" || data.slice(i - 6, i) == "&nbsp;")) {
        arrayRow.push(curItem);
        curItem = { myText: "", myHref: "" };
        hasLink = "";
        hasLinkWithSpace = "";
        hasBtn = "";
        hasBtnWithSpace = "";
      } else {
        if (hasLink == "link=" || hasLinkWithSpace == " link=" || hasBtn == "button=" || hasBtnWithSpace == " button=") {
          if (curItem.myHref === "" && hasLink === "link=") {
            curItem.myText = curItem.myText.slice(0, -5);
            curItem.myHrefType = "link";
          } else {
            if (curItem.myHref === "" && hasLinkWithSpace === " link=") {
              curItem.myText = curItem.myText.slice(0, -6);
              curItem.myHrefType = "link";
            } else {
              if (curItem.myHref === "" && hasBtn === "button=") {
                curItem.myText = curItem.myText.slice(0, -7);
                curItem.myHrefType = "btn";
              } else {
                if (curItem.myHref === "" && hasBtnWithSpace === " button=") {
                  curItem.myText = curItem.myText.slice(0, -8);
                  curItem.myHrefType = "btn";
                }
              }
            }
          }
          curItem.myHref += (data[i]);
        } else {
          curItem.myText += (data[i]);
          hasLink = t431__checkSubstr("link=", hasLink, data[i]);
          hasLinkWithSpace = t431__checkSubstr(" link=", hasLinkWithSpace, data[i]);
          hasBtn = t431__checkSubstr("button=", hasBtn, data[i]);
          hasBtnWithSpace = t431__checkSubstr(" button=", hasBtnWithSpace, data[i]);
        }
        endLine = t431__checkSubstr("<br />", endLine, data[i]);
        if (endLine == "<br />") {
          if (curItem.myHref) {
            curItem.myHref = curItem.myHref.slice(0, -6);
          } else {
            curItem.myText = curItem.myText.slice(0, -6);
          }
          arrayRow.push(curItem);
          arrayTable.push(arrayRow);
          curItem = { myText: "", myHref: "" };
          hasLink = "";
          hasLinkWithSpace = "";
          hasBtn = "";
          hasBtnWithSpace = "";
          arrayRow = [];
        }
      }
    }
    if (arrayRow.length > 0 || curItem.myText !== "") {
      if (curItem !== "") {
        arrayRow.push(curItem);
      }
      arrayTable.push(arrayRow);
    }
  }
  return arrayTable;
}

/* checking a step by step combining of t431__targetSubstr*/
function t431__checkSubstr(targetSubstr, curSubstr, curSymbol) {
  if (!curSubstr && curSymbol == targetSubstr[0]) {
    return curSymbol;
  } else {
    if (curSubstr) {
      for (var i = 0; i < (targetSubstr.length - 1); i++) {
        if (curSubstr[curSubstr.length - 1] == targetSubstr[i] && curSymbol == targetSubstr[i + 1]) {
          return (curSubstr += curSymbol);
        }
      }
    }
  }
}

function t431__addBrTag(oldStringItem) {
  var newStringItem = "";
  for (var i = 0; i < oldStringItem.length; i++) {
    if (oldStringItem[i] == "\n" || oldStringItem[i] == "\r") {
      newStringItem += "<br />";
    } else {
      newStringItem += oldStringItem[i];
    }
  }

  return newStringItem;
}
 
function t448_setHeight(recid) {
  var el=$("#rec"+recid);
  var coverheight = el.find(".t-cover").height();
  var coverwrapper = el.find(".t448-cover__wrapper");
  var textheight = el.find(".t448__wrapper").innerHeight();
  var imgheight = el.find(".t448__screenshot").height();
  var height = textheight + imgheight;
  var newheight = coverheight - imgheight;
  var container = el.find(".t448");
  var attr = container.attr("data-crop-image");

  if (typeof attr !== typeof undefined && attr !== false) {
    container.addClass("t448__no-overflow");
    container.css("height", coverwrapper.height());
  }

  if (coverheight > height) {
    el.addClass("t448__stretched");
    coverwrapper.css("height",newheight);
    if (typeof attr !== typeof undefined && attr !== false) {
      container.removeClass("t448__no-overflow");
      container.css("height", "");
    }
  } else {
    el.removeClass("t448__stretched");
    coverwrapper.css("height","");
  }
} 
function t509_setHeight(recid) {  
  var t509__el=$("#rec"+recid);	
  var t509__image = t509__el.find(".t509__blockimg");
  t509__image.each(function() {
    var t509__width = $(this).attr("data-image-width");
    var t509__height = $(this).attr("data-image-height");	
    var t509__ratio = t509__height/t509__width;
    var t509__padding = t509__ratio*100;    	
    $(this).css("padding-bottom",t509__padding+"%");		
  });
  
  if ($(window).width()>960){
    var t509__textwr = t509__el.find(".t509__textwrapper");
    var t509__deskimg = t509__el.find(".t509__desktopimg");
    t509__textwr.each(function() {    
    $(this).css("height", t509__deskimg.innerHeight());	
    });
  }
}
 
function t557_init(recid,snowtype){
	$('<img/>').attr('src', 'https://static.tildacdn.com/img/snowflakes_1.png').load(function() {$(this).remove();});
	$('<img/>').attr('src', 'https://static.tildacdn.com/img/snowflakes_2.png').load(function() {$(this).remove();});
	$('<img/>').attr('src', 'https://static.tildacdn.com/img/snowflakes_3.png').load(function() {
		$(this).remove();
		t557__addSnow(recid,snowtype);
	});
}

function t557__addSnow(recid,snowtype){
  	var el=$('#rec'+recid),
  		t557_ids=el.find('.t557__snow-recid-holder').attr('data-snow-rec-ids').split(',');
	if (t557_ids!=""){
        t557_ids.forEach(function(rec_id, i, arr){
						var t557_zeroattr=$('#rec'+rec_id).attr('data-record-type');						
						if(t557_zeroattr==396){
							var t557_wrappertype=" .t396__artboard";						
						}else{							
							var t557_wrappertype=" .t-cover";						
						}
						var t557_cover=document.querySelector('#rec'+rec_id+t557_wrappertype);
						if (t557_cover!=null){
								var t557_snow = document.createElement('div');
								t557_snow.className = snowtype;
								t557_cover.appendChild(t557_snow);	
						}            
        });
	} else {
		t557_cover=$('.t-cover').first();
		var t557_snow = document.createElement('div');
		t557_snow.className = snowtype;
        t557_cover.append(t557_snow);
	}
	$('.'+snowtype).animate({"opacity": "1"}, 1000, function() {});
}
 
function t592_init(recid){
  var element = $('#rec'+recid).find('.t592__descr');

  var highestBox = 0;

  element.css('height','');

  element.each(function(){
    if($(this).height() > highestBox)highestBox = $(this).height(); 
  });

  if($(window).width()>=960){
      element.css('height', highestBox); 
  }else{
     element.css('height', '');    
  }
}; 
function t609_setHeight(recid) {  
  var el=$("#rec"+recid); 
  var image = el.find(".t609__bgimg");
  image.each(function() {
    var width = $(this).attr("data-image-width");
    var height = $(this).attr("data-image-height"); 
    var ratio = height/width;
    var padding = ratio*100;      
    $(this).css("padding-bottom", padding+"%");    
  });
}

function t609_init(recid){
  var el = $('#rec'+recid),
      element = el.find('.t609__descr'),
      highestBox = 0;

  element.css('height','');

  element.each(function(){
    if($(this).height() > highestBox)highestBox = $(this).height(); 
  });

  if($(window).width()>=960){
      element.css('height', highestBox); 
  }else{
     element.css('height', '');    
  }
} 
function t654_showPanel(recid){
  var t654_el = $('#rec'+recid),
      t654_block = t654_el.find('.t654'),
      t654_closeBtn = t654_el.find('.t654__icon-close'),
      t654_storageItem = t654_block.attr('data-storage-item'),		
      t654_lastOpen = localStorage.getItem(t654_storageItem),
      t654_delta = t654_block.attr('data-storage-delta')*86400,
      t654_today = Math.floor(Date.now() / 1000),
      t654_curDelta = t654_today - t654_lastOpen;
  if (t654_lastOpen==null || t654_curDelta>=t654_delta){
	t654_block.removeClass('t654_closed');
  }
  t654_closeBtn.click(function(e){
    t654_block.addClass('t654_closed');
	if (t654_delta){localStorage.setItem(t654_storageItem, Math.floor(Date.now() / 1000));}    
    e.preventDefault();
  });
}


function t654_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t654").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);
      }
      });
      }else{
        $(".t654").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t654_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t654").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                if (el.hasClass('t654_top')){
                                  el.css("top","-50px");
                                  el.css("visibility","visible");
                                  el.animate({"opacity": "1","top": "0px"}, 200,function() {});
                                }else{
                                  el.css("bottom","-50px");
                                  el.css("visibility","visible");
                                  el.animate({"opacity": "1","bottom": "0px"}, 200,function() {});
                                }
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t654_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t654").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || menushadow==' '){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}
 
function t698_fixcontentheight(id){
        /* correct cover height if content more when cover height */
        var el = $("#rec" + id);
        var hcover=el.find(".t-cover").height();
        var hcontent=el.find("div[data-hook-content]").outerHeight();
        if(hcontent>300 && hcover<hcontent){
         var hcontent=hcontent+120;
         if(hcontent>1000){hcontent+=100;}
         console.log('auto correct cover height: '+hcontent);
         el.find(".t-cover").height(hcontent);
         el.find(".t-cover__filter").height(hcontent);
         el.find(".t-cover__carrier").height(hcontent);
         el.find(".t-cover__wrapper").height(hcontent);
         if($isMobile == false){
          setTimeout(function() {
           var divvideo=el.find(".t-cover__carrier");
           if(divvideo.find('iframe').length>0){
            console.log('correct video from cover_fixcontentheight');
      setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
     }
    }, 2000);
   }
        }
 }

function t698_onSuccess(t698_form){
	var t698_inputsWrapper = t698_form.find('.t-form__inputsbox');
    var t698_inputsHeight = t698_inputsWrapper.height();
    var t698_inputsOffset = t698_inputsWrapper.offset().top;
    var t698_inputsBottom = t698_inputsHeight + t698_inputsOffset;
	var t698_targetOffset = t698_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t698_target = t698_targetOffset - 200;
    }	else {
        var t698_target = t698_targetOffset - 100;
    }

    if (t698_targetOffset > $(window).scrollTop() || ($(document).height() - t698_inputsBottom) < ($(window).height() - 100)) {
        t698_inputsWrapper.addClass('t698__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t698_target}, 400);
        setTimeout(function(){t698_inputsWrapper.addClass('t698__inputsbox_hidden');}, 400);
    }

	var successurl = t698_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

} 
function t712_onSuccess(t712_form){
	var t712_inputsWrapper = t712_form.find('.t-form__inputsbox');
    var t712_inputsHeight = t712_inputsWrapper.height();
    var t712_inputsOffset = t712_inputsWrapper.offset().top;
    var t712_inputsBottom = t712_inputsHeight + t712_inputsOffset;
	var t712_targetOffset = t712_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t712_target = t712_targetOffset - 200;
    }	else {
        var t712_target = t712_targetOffset - 100;
    }

    if (t712_targetOffset > $(window).scrollTop() || ($(document).height() - t712_inputsBottom) < ($(window).height() - 100)) {
        t712_inputsWrapper.addClass('t712__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);		
    } else {
        $('html, body').animate({ scrollTop: t712_target}, 400);
        setTimeout(function(){t712_inputsWrapper.addClass('t712__inputsbox_hidden');}, 400);
    }

	var successurl = t712_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}


function t712_fixcontentheight(id){
        /* correct cover height if content more when cover height */
        var el = $("#rec" + id);
        var hcover=el.find(".t-cover").height();
        var hcontent=el.find("div[data-hook-content]").outerHeight();
        if(hcontent>300 && hcover<hcontent){
         var hcontent=hcontent+120;
         if(hcontent>1000){hcontent+=100;}
         console.log('auto correct cover height: '+hcontent);
         el.find(".t-cover").height(hcontent);
         el.find(".t-cover__filter").height(hcontent);
         el.find(".t-cover__carrier").height(hcontent);
         el.find(".t-cover__wrapper").height(hcontent);
         if($isMobile == false){
          setTimeout(function() {
           var divvideo=el.find(".t-cover__carrier");
           if(divvideo.find('iframe').length>0){
            console.log('correct video from cover_fixcontentheight');
      setWidthHeightYoutubeVideo(divvideo, hcontent+'px');
     }
    }, 2000);
   }
        }
 } 
function t718_onSuccess(t718_form){
	var t718_inputsWrapper = t718_form.find('.t-form__inputsbox');
    var t718_inputsHeight = t718_inputsWrapper.height();
    var t718_inputsOffset = t718_inputsWrapper.offset().top;
    var t718_inputsBottom = t718_inputsHeight + t718_inputsOffset;
	var t718_targetOffset = t718_form.find('.t-form__successbox').offset().top;

    if ($(window).width()>960) {
        var t718_target = t718_targetOffset - 200;
    }	else {
        var t718_target = t718_targetOffset - 100;
    }

    if (t718_targetOffset > $(window).scrollTop() || ($(document).height() - t718_inputsBottom) < ($(window).height() - 100)) {
        t718_inputsWrapper.addClass('t718__inputsbox_hidden');
		setTimeout(function(){
			if ($(window).height() > $('.t-body').height()) {$('.t-tildalabel').animate({ opacity:0 }, 50);}
		}, 300);
    } else {
        $('html, body').animate({ scrollTop: t718_target}, 400);
        setTimeout(function(){t718_inputsWrapper.addClass('t718__inputsbox_hidden');}, 400);
    }

	var successurl = t718_form.data('success-url');
    if(successurl && successurl.length > 0) {
        setTimeout(function(){
            window.location.href= successurl;
        },500);
    }

}
 
function t815_init(recid){
    var rec = $('#rec'+recid);
    var el = rec.find('.t815');
    var isFixed = (el.css('position') == 'fixed');
    var redactorMode = el.hasClass('t815_redactor-mode');

    if (!redactorMode) {
      	el.removeClass('t815__beforeready');

      	if (isFixed && el.attr('data-bgopacity-two')) {
            t815_changebgopacitymenu(recid);
            $(window).bind('scroll', t_throttle(function(){t815_changebgopacitymenu(recid)}, 200));
      	}

        if (isFixed && el.attr('data-appearoffset')) {
            el.removeClass('t815__beforeready');
            t815_appearMenu(recid);
            $(window).bind('scroll', t_throttle(function(){t815_appearMenu(recid)}, 200));
        }
    }

    t815_setBg(recid);
    $(window).bind('resize', t_throttle(function(){t815_setBg(recid);}, 200));
}


function t815_setBg(recid) {
    var window_width = $(window).width();
    if (window_width > 980) {
        $(".t815").each(function() {
            var el = $(this);
            if (el.attr('data-bgcolor-setbyscript') == "yes") {
                var bgcolor = el.attr("data-bgcolor-rgba");
                el.css("background-color",bgcolor);
            }
        });
    } else {
        $(".t815").each(function() {
            var el=$(this);
            var bgcolor = el.attr("data-bgcolor-hex");
            el.css("background-color",bgcolor);
            el.attr("data-bgcolor-setbyscript","yes");
        });
    }
}

function t815_appearMenu(recid) {
    var window_width = $(window).width();
    if (window_width > 980){
        $(".t815").each(function() {
            var el = $(this);
            var appearoffset = el.attr("data-appearoffset");
            if (appearoffset!="") {
                if(appearoffset.indexOf('vh') > -1) {
                    appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                }

                appearoffset = parseInt(appearoffset, 10);

                if ($(window).scrollTop() >= appearoffset) {
                    if (el.css('visibility') == 'hidden') {
                        el.finish();
                        el.css("top","-50px");
                        el.css("visibility","visible");
                        el.animate({"opacity": "1","top": "0px"}, 200, function() {});
                    }
                } else {
                    el.stop();
                    el.css("visibility","hidden");
                }
            }
        });
    }
}

function t815_changebgopacitymenu(recid) {
    var window_width = $(window).width();
    if(window_width > 980){
        $(".t815").each(function() {
            var el = $(this);
            var bgcolor = el.attr("data-bgcolor-rgba");
            var bgcolor_afterscroll = el.attr("data-bgcolor-rgba-afterscroll");
            var bgopacityone = el.attr("data-bgopacity");
            var bgopacitytwo = el.attr("data-bgopacity-two");
            var menushadow = el.attr("data-menushadow");
            if (menushadow == '100') {
                var menushadowvalue = menushadow;
            } else {
                var menushadowvalue = '0.'+menushadow;
            }
            if ($(window).scrollTop() > 20) {
                el.css("background-color", bgcolor_afterscroll);
                if(bgopacitytwo == '0' || menushadow == ' '){
                  el.css("box-shadow", "none");
                } else {
                  el.css("box-shadow", "0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            } else {
                el.css("background-color",bgcolor);
                if (bgopacityone == '0.0' || menushadow == ' '){
                  el.css("box-shadow","none");
                } else {
                  el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
                }
            }
        });
    }
}
 
function t849_init(recid) {
  var rec = $('#rec' + recid);
  var toggler = rec.find('.t849__header');

  toggler.click(function() {
    $(this).toggleClass('t849__opened');
    $(this).next().slideToggle();
    if(window.lazy == 'y') {t_lazyload_update();}
  });
}
 
function t911_init(recid) {
  t911_checkPhoneNumber(recid);
}

function t911_checkPhoneNumber(recid) {
  var el = $('#rec' + recid);
  var whatsapp = el.find('.t911__whatsapp').attr('data-messenger-whatsapp');
  var telegram = el.find('.t911__telegram').attr('data-messenger-telegram');
  var telegramLink = el
    .find('.t911__telegram_link')
    .attr('data-messenger-telegram-link');
  var vk = el.find('.t911__vk').attr('data-messenger-vk');
  var skype = el.find('.t911__skype').attr('data-messenger-skype');
  var skypeChat = el
    .find('.t911__skype_chat')
    .attr('data-messenger-skype-chat');
  var mail = el.find('.t911__mail').attr('data-messenger-mail');
  var viber = el.find('.t911__viber').attr('data-messenger-viber');
  var fb = el.find('.t911__fb').attr('data-messenger-fb');
  var phone = el.find('.t911__phone').attr('data-messenger-phone');

  if (typeof telegramLink != 'undefined') {
    if (telegramLink.search(/http/i) !== -1) {
      el.find('.t911__telegram_link').attr('href', telegramLink);
    } else {
      if (telegramLink.search(/tg/i) !== -1) {
        el.find('.t911__telegram_link').attr('href', telegramLink);
      } else {
        el.find('.t911__telegram_link').attr('href', 'https://' + telegramLink);
      }
    }
  }

  if (typeof whatsapp != 'undefined') {
    el.find('.t911__whatsapp').attr(
      'href',
      'https://api.whatsapp.com/send?phone=' +
        whatsapp.replace(/[+?^${}()|[\]\\\s]/g, '')
    );
  }

  el.find('.t911__telegram').attr('href', 'https://t.me/' + telegram);
  el.find('.t911__vk').attr('href', 'https://vk.me/' + vk);

  if (typeof skype != 'undefined') {
    el.find('.t911__skype').attr(
      'href',
      'skype:' + skype.replace(/[+?^${}()|[\]\\\s]/g, '') + '?call'
    );
  }

  if (typeof skypeChat != 'undefined') {
    el.find('.t911__skype_chat').attr(
      'href',
      'skype:' + skypeChat.replace(/[+?^${}()|[\]\\\s]/g, '') + '?chat'
    );
  }

  if (typeof viber != 'undefined') {
    el.find('.t911__viber').attr(
      'href',
      'viber://chat?number=%2B' + viber.replace(/[+?^${}()|[\]\\\s]/g, '')
    );
  }

  el.find('.t911__mail').attr('href', 'mailto:' + mail);

  el.find('.t911__fb').attr('href', 'https://m.me/' + fb);

  if (typeof phone != 'undefined') {
    el.find('.t911__phone').attr(
      'href',
      'tel:+' + phone.replace(/[+?^${}()|[\]\\\s]/g, '')
    );
  }
}
