var belk = window.belk || {};
(function () {
	if (undefined != belk.video) return;
	var U = undefined,
	N = null,
	S = '-_-',
	CZ = '#000000',
	M1 = ' media events add failed',
	M2 = ' default onTemplateReady called',
	BCP = '//admin.brightcove.com/js/',
	BBCB = 'belkBCBasic',
	BBCP = 'belkBCProduct',
	SP = 'player',
	SCVI = 'belk.video.utils.closeVideoInfo();',
	SOF = 'overflow',
	SS = 'scroll',
	SSEL = 'selected',
	SA = 'auto',
	SL = 'left',
	ST = 'top',
	SLCW = 'width:{{listContainerWidth}}px;',
	SLW = 'left:{{width}}px;',
	PB = 'body',
	PPVC = 'bcVideoContainer',
	PVLC = 'videoListContainer',
	PVMW = 'bcVideoModalWindow',
	PVMM = 'bcVideoModalMask',
	PVT = 'bcVideoThumb',
	PVI = 'bcVideoInfo',
	PVL	= 'videoList',
	PVIT = 'videoItem',
	VHA = 'belk.video.state.player{{playerNumber}}.context.onTemplate',
	VH = 'height:{{height}}px;',
	VIDDIV = '<div id="{{tagId}}" class="',
	VIDSTY = '" rel="player{{playerNumber}}" style="background-color:{{backgroundColor}};width:{{width}}px;'+VH+'">',
	PN = '<param name="',
	PV = '" value="',
	PE = '" />'+PN,
	E = '" />',
	D = '</div>',
	VIDOBJ = '<div style="display:none">'+D+'<object id="{{objectId}}" class="BrightcoveExperience">'+PN+'bgcolor'+PV+'{{backgroundColor}}'+PE+'width'+PV+'{{width}}'+PE+'height'+PV+'{{height}}'+PE+'playerID'+PV+'{{playerId}}'+PE+'playerKey'+PV+'{{playerKey}}'+PE+'isVid'+PV+'true'+PE+'isUI'+PV+'true'+PE+'dynamicStreaming'+PV+'true'+PE+'@videoPlayer'+PV+'{{videoId}}'+PE+'autoStart'+PV+'{{autoStart}}'+PE+'templateLoadHandler'+PV+VHA+'Loaded'+PE+'templateReadyHandler'+PV+VHA+'Ready'+PE+'wmode'+PV+'transparent'+E+'{{forceHTMLPlayer}}</object>'+D;
	belk.video = {
		version:'2.6.0.0',
		state:{
			js:{isBasicLoaded:false,isBasicLoading:false,isSmartLoaded:false,isSmartLoading:false},
			players:[],playerRequestList:[],playerInstances:0,playerDupBlockFix:[],
			requests:[],
			isModalOpen:false,
			lockScroll:{overflow:SA,scroll:'yes'}
		},
		config:{
			defaults:{width:520,height:297,backgroundColor:CZ},
			js:{basic:BCP+'BrightcoveExperiences.js',smart:BCP+'api/SmartPlayerAPI.js'},
			players:{
				basic:{
					playerId:'1491113621001',playerKey:'AQ~~,AAABE5oc-0k~,DvT1j5GwtfKJi2QUtGqFNddX9JHTyYJ7',
					defaults:{width:320,height:180,backgroundColor:CZ},
					alterContainer:true,
					template:VIDDIV+BBCB+VIDSTY+VIDOBJ,
					handlers:{
						onTemplateReady:function (event) {
							belk.video.utils.trackVideo(U,U,5,0,0,BBCB+M2);
						},
						onTemplateLoaded:function (id) {
							var ut = belk.video.utils;
							var htmlId = SP+ut.cleanNumber(id);
							var p = belk.video.state[htmlId];
							var c = p.context;
							belk.video.patches.enableCloseForBasicPlayerInModal(c);
							var bapi = brightcove.api;
							if (U != bapi) {
								c.bcPlayer = bapi.getExperience(id);
								c.bcAPIModules = bapi.modules.APIModules;
								c.bcEvents = bapi.events;
								c.readyDoneFlag = false;
								var tr = ut.track;
								var api = null;
								c.onTemplateReady = function (event) {
									if (c.readyDoneFlag) return;
									c.readyDoneFlag = true;
									c.hasPlayed = false;
									if (U != c.bcPlayer) {
										try {
											api = c.bcPlayerAPI = c.bcPlayer.getModule(c.bcAPIModules.VIDEO_PLAYER);
											api.ael = api.addEventListener;
											var me = c.bcEvents.MediaEvent;
											api.ael(me.CHANGE,c.onMediaChange);
											api.ael(me.PLAY,c.onMediaPlay);
											api.ael(me.SEEK_NOTIFY,c.onMediaSeek);
											api.ael(me.STOP,c.onMediaStop);
											api.ael(me.COMPLETE,c.onMediaComplete);
											api.ael(me.ERROR,c.onMediaError);
										} catch (e) {
											ut.trackVideo(U,U,5,0,0,BBCB+M1);
										}
										api.getCurrentVideo(function (media) {
											c.media = media;
											tr(event,media,0); // 0 - launch
											if ( (p.config.autoStart) && (api.canPlayWithoutInteraction())) api.play();
										});
									}
								 }
								 c.onMediaPlay = function (event) {
								 	ut.playEvent(event,p,c);
								 }
								 c.onMediaSeek = function (event) {
								 	tr(event,c.media,4); // 4 - scrub/seek
								 }
								 c.onMediaStop = function (event) {
								 	tr(event,c.media,1); // 1 - pause
								 }
								 c.onMediaComplete = function (event) {
								 	tr(event,c.media,3); // 3 - complete
								 }
								 c.onMediaChange = function (event) {
									 c.bcPlayerAPI.getCurrentVideo(function (media) {
										 c.media = media;
										 tr(event,media,0); // 0 - launch
									 });
								 }
								 c.onMediaError = function (event) {
								 	tr(event,c.media,5); // 5 - error
								 }
							}
						} // END onTemplateLoaded
					}
				},
				product:{
					playerId:'1661946248001',playerKey:'AQ~~,AAABE5oc-0k~,DvT1j5GwtfI6r8OALTZxMvjuvbaQMlEB',
					defaults:{width:520,height:297,backgroundColor:CZ,listWidth:130,autoPlay:false},
					alterContainer:false,
					template:VIDDIV+BBCP+VIDSTY+VIDOBJ+'<div class="'+PVI+'" style="'+SLCW+SLW+'"><div class="infoList">'+D+D+'<div class="'+PVLC+'" style="'+VH+SLW+'top:0;'+SLCW+'display:none;"><div class="bar">'+D+'<div id="{{tagId}}VideoList" class="'+PVL+'" style="'+VH+SLCW+'"><div class="list" style="'+SLCW+'">'+D+D+D,
					handlers:{
						onTemplateReady:function (event) {
							belk.video.utils.trackVideo(U,U,5,0,0,BCP+M2);
						},
						onTemplateLoaded:function (id) {
							var ut = belk.video.utils;
							var htmlId = SP+ut.cleanNumber(id);
							var p = belk.video.state[htmlId];
							var c = p.context;
							var bapi = brightcove.api;
							if (U != bapi) {
								c.bcPlayer = bapi.getExperience(id);
								c.bcAPIModules = bapi.modules.APIModules;
								c.bcEvents = bapi.events;
								c.readyDoneFlag = false;
								var tr = ut.track;
								var api = null;
								c.onTemplateReady = function (event) {
									if (c.readyDoneFlag) return;
									c.readyDoneFlag = true;
									if (U != c.bcPlayer) {
										try {
											api = c.bcPlayerAPI = c.bcPlayer.getModule(c.bcAPIModules.VIDEO_PLAYER);
											api.ael = api.addEventListener;
											var me = c.bcEvents.MediaEvent;
											api.ael(me.CHANGE,c.onMediaChange);
											api.ael(me.PLAY,c.onMediaPlay);
											api.ael(me.PROGRESS,c.onMediaProgress);
											api.ael(me.SEEK_NOTIFY,c.onMediaSeek);
											api.ael(me.STOP,c.onMediaStop);
											api.ael(me.COMPLETE,c.onMediaComplete);
											api.ael(me.ERROR,c.onMediaError);
										} catch (e) {
											ut.trackVideo(U,U,5,0,0,BBCP+M1);
										}
										c.bcPlayerAPI.getCurrentVideo(function (media) {
											var m = c.media = media;
											ut.trackVideo(m.id,m.customFields.category,0,0,m.length); // 0 - launch
											if (c.bcPlayerAPI.canPlayWithoutInteraction()) c.bcPlayerAPI.play();
										});
										var obj = $('#'+PPVC+' #'+htmlId).parent();
										var vl = obj.find('.'+PVLC);
										var items = p.config.items;
										var ilen = items.length;
										var htmlString = '';
										var it = vl.find('.'+PVL+' .list');
										var il = obj.find('.'+PVI+' .infoList')
						               		if (ilen > 1) {
											for (var i=0;i<ilen;i++) {
												htmlString = '<div id="'+PVIT+i+'" class="'+PVIT+(i==0?' first '+SSEL:'')+'" rel="'+items[i].id+'">'+'<div class="thumbContainer"><img id="'+PVT+i+'" class="'+PVT+'" src="'+items[i].thumbnailURL+'"/>'+D+D;
												it.append(htmlString);
												il.append('<div class="infoItem">'+items[i].name+D);
											}
						                   	obj.find('.'+PVLC+' .'+PVL+' .list .'+PVIT).click(function (e) {
												if (!$(e.currentTarget).hasClass(SSEL)) {
													c.currentVideo = $(e.currentTarget).attr('rel');
													c.bcPlayerAPI.loadVideoByID(c.currentVideo);
													$('#'+PPVC+' .'+PVLC+' .'+PVL+' .list .'+PVIT).removeClass(SSEL);
													$(e.currentTarget).addClass(SSEL);
													ut.closeVideoInfo();
												} else if (!c.bcPlayerAPI.isPlaying()){
													c.bcPlayerAPI.play();
												}
											});
											vl.fadeIn();
											ut.touchScroll(htmlId+'VideoList');
										}
					     	         	c.bcPlayerAPI.loadVideoByID(items[0].id);
										obj.find('.'+PVI).css({'display':'block','opacity':'0'});
										vl.mouseenter(ut.openVideoInfo);
										vl.mouseleave(ut.closeVideoInfo);
										vl.find('.'+PVL).scroll(function(e) {
											ut.openVideoInfo();
										    $('#'+PPVC+' .'+PVI).css(ST,'-'+$(e.currentTarget).scrollTop()+'px');
										    obj = $('#'+PPVC+' .'+PVLC+' .bar');
											if (U == belk.video.state.barRate) {
												var ph = belk.video.config.players.product.height;
												var h = (ph / ilen);
												var r = (ph - h) / ($('#'+PPVC+' .'+PVLC+' .'+PVL+' .list').height() - ph);
												obj.css({left:'133px',top:'0px',width:'5px',background:'#505050',height:h+'px'});
												belk.video.state.barRate = r;
											}
											obj.css(ST,$(e.currentTarget).scrollTop()*belk.video.state.barRate+'px');
											clearTimeout(belk.video.state.saveTimeout);
											belk.video.state.saveTimeout = setTimeout(SCVI,5000);
										});
									}
								}
								c.onMediaChange = function (event) {
									c.hasPlayed = false;
									c.bcPlayerAPI.getCurrentVideo(function (media) {
										c.media = media;
										ut.track(event,media,0); // 0 - launch
									});
								}
								c.onMediaPlay = function (event) {
									ut.playEvent(event,p,c);
								}
								c.onMediaProgress = function (event) {
									if (!belk.video.state.isModalOpen) c.bcPlayerAPI.seek(0);
								}
								c.onMediaSeek = function (event) {
									ut.track(event,c.media,4); // 4 - scrub/seek
								}
								c.onMediaStop = function (event) {
									ut.track(event,c.media,1); // 1 - pause
								}
								c.onMediaComplete = function (event) {
									ut.track(event,c.media,3); // 3 - complete
								}
								c.onMediaError = function (event) {
									ut.track(event,c.media,5); // 5 - error
								}
							}
						} // END onTemplateLoaded
					}
				}
			} // END players
		},
		utils:{
			init:function () {
				$(document).ready(function (){
					belk.video.utils.initClickToPlay();
					belk.video.utils.productDetailVideos();
					belk.video.utils.pygVideos();
				});
			},
			initClickToPlay:function () {
				$('[class*=clickToPlay]').each(function (i,e) {
					e = $(e);
    				var r = /^(?:.*\s+|\s*)clickToPlay([0-9]*)(?:\s*|\s+.*)$/;
    				var p = r.exec(e.attr("class"));
    				if ( (N != p) && ('' != (p=p[1])) ) {
						e.click(function () {
            				belk.video.play(p);
        				});
					}	 
				});
			},
			playEvent:function (e,p,c) {
				var t = 'Click';
				if (p.config.autoStart && c.bcPlayerAPI.canPlayWithoutInteraction() && !c.hasPlayed) t = 'Auto';
				belk.video.utils.track(event,c.media,2,t); // 2 - play + type
				c.hasPlayed = true;
			},
			track:function (e,m,n,d) {
			    belk.video.utils.trackVideo(m.id,m.customFields.category,n,(0==n)?0:e.position,m.length,(5==n)?e.code:'',(2==n)?d:U);
			},
			trackVideo:function (id,category,status,position,length,details) {
				belk.err = belk.err || {};
				belk.err.log = belk.err.log || function(s,l,e,r){};
				if(typeof cmCreateElementTag === 'function'){
					cmCreateElementTag(
							(U != id)?id:"NO_ID","Video",S+S+S+S+S+S+S+S+S+S+S+S+
							((U != status)?status:"")+S+((U != position)?Math.ceil(position):"")+S+
							((U != length)?Math.ceil(length/1000):"")+"-_-"+((U != details)?details:"")+S+
							((U != category)?category:"NO_CATEGORY")
						);
				} else {
					//raygun error log
					belk.err.log("belk.video.js", "belk.video.utils.trackVideo(" + (U != id)?id:"NO_ID","Video",S+S+S+S+S+S+S+S+S+S+S+S+
							((U != status)?status:"")+S+((U != position)?Math.ceil(position):"")+S+
							((U != length)?Math.ceil(length/1000):"")+"-_-"+((U != details)?details:"")+S+
							((U != category)?category:"NO_CATEGORY") +")" ,"cmCreateElementTag is of type " + typeof cmCreateElementTag,false);
					setTimeout(function(){
						//raygun error log
						belk.err.log("belk.video.js", "belk.video.utils.trackVideo(" + a +", " + b + ", " + c + ", " + d + ", " + e +")" ,"cmCreateElementTag is of type " + typeof cmCreateElementTag + " after 1000ms",false);
					},1000);
				}	
			},
			createExperiences:function () {
				if (belk.video.state.js.isBasicLoaded) brightcove.createExperiences();
			},
			createPlayerNumber:function () {
				return belk.video.state.playerInstances++;
			},
			createPlayerTagId:function (playerId) {
	     		return SP+playerId;
			},
			createExperienceTagId:function (playerId) {
				return 'experience'+playerId;
			},
			createModalTagId:function (playerId) {
				return 'videoModal'+playerId;
			},
			checkDimension:function (dim,pd,gd) {
				if ( (U == dim) || (N == dim) || (isNaN(dim)) ) {
					if ( (U == pd) || (N == pd) || (isNaN(pd)) ) dim = gd;
					else dim = pd;
				}
				return dim;
			},
			loadJs:function (playerType) {
	          	var st = belk.video.state;
	          	var cj = belk.video.config.js;
	          	var js = st.js;
				if (!js.isBasicLoaded && !js.isBasicLoading) {
					js.isBasicLoading = true;
					$.getScript(cj.basic,function () {
						js.isBasicLoading = false;
						js.isBasicLoaded = true;
						var bce = brightcove.createExperiences;
						if (!js.isSmartLoaded && !js.isSmartLoading) {
							js.isSmartLoading = true;
							$.getScript(cj.smart,function () {
								js.isSmartLoading = false;
								js.isSmartLoaded = true;
								if (st.players.length > 0) bce();
							});
						} else if (st.players.length > 0) bce();
					});
				}
			},
			markup:function (html,data) {
		    	var m;
				var i = 0;
				var match = html.match(data instanceof Array ? /{{\d+}}/g : /{{\w+}}/g) || [];
				while (m = match[i++]) {
					html = html.replace(m, data[m.substr(2, m.length-4)]);
				}
				return html;
			},
			getURLParms:function () {
				var arr = String(window.location.href).split("?");
				if (arr.length > 1) arr = arr[1].split("&");
				else arr = new Array();
				for (;0<arr.length;) {
					var t = arr[0].split("=");
					arr.splice(0,1);
					if ("" != t[0]) arr[t[0]] = (t[1] || "");
				}
				return arr;
			},
			append:function (pt,parms) {
				var ut = belk.video.utils;
				var df = belk.video.config.defaults;
				var st = belk.video.state;
				ut.loadJs(pt);
				if ( (U == parms.autoStart) || (N == parms.autoStart) ) parms.autoStart = false;
				if ( (U == parms.backgroundColor) || (N == parms.backgroundColor) ) {
					if ( (U == pt.defaults.backgroundColor) || (N == pt.defaults.backgroundColor) ) {
						parms.backgroundColor = df.backgroundColor;
					} else {
						parms.backgroundColor = pt.defaults.backgroundColor;
					}
				}
				var po = {};
				po.config = parms;
				po.config.playerId = pt.playerId;
				po.config.playerKey = pt.playerKey;
				po.isPlayerAdded = false;
				var urlParms = ut.getURLParms();
				po.config.forceHTMLPlayer = ('true' == urlParms['vForce'])?''+PN+'forceHTML'+PV+'true" />':'';
				po.playerType = pt;
				po.context = {started:false,hasPlayed:false};
				for (i in pt.handlers) {
					po.context[i] = pt.handlers[i];
				}
				po.context.tagId = po.config.tagId;
				st.playerRequestList.push(po);
				$(document).ready(createPlayers);
				function createPlayers() {
					var po = st.playerRequestList[0];
					while (U != po) {
						if (!po.isPlayerAdded) {
							st[SP+po.config.playerNumber] = po;
							var html = ut.markup(pt.template,po.config);
							var loc=po.config.loc='#'+po.config.locId;

							// BEGIN new code for belk.modal.js integration
							if ('#'===loc) {
								loc='.'+po.config.locClass;
							}

							//$('#'+po.config.locId).append(html);
							$(loc).append(html);
							// END new code for belk.modal.js integration

							po.isPlayerAdded = true;
						}
						po = st.playerRequestList.shift();
						st.players[po.config.playerNumber]=po;
						po = st.playerRequestList[0];
					}
					ut.createExperiences();
				}
				return po;
			},
			isDuplicate:function (str) {
				var d = belk.video.state.playerDupBlockFix;
				if (d[str] == true) {
					return true;
				} else {
					d[str] = true;
					return false;
				}
			},
			openVideoInfo:function () {
				var obj = $('#'+PPVC+' .'+PVI);
				obj.stop();
				obj.animate({left:'390px',opacity:'1.0'});
			},
			closeVideoInfo:function () {
				var obj = $('#'+PPVC+' .'+PVI);
				obj.stop();
				obj.animate({left:'520px',opacity:'0'});
			},
			closeModalVideoPlayer:function () {				
				var playerRef = $('.'+BBCP).attr('rel');
				if (U !== playerRef) { 								
					var c = belk.video.state[playerRef].context;
					try {
						var me = c.bcEvents.MediaEvent;
						var api = null;
						api = c.bcPlayerAPI;
						api.rel = api.removeEventListener;
						api.rel(me.CHANGE,c.onMediaChange);
						api.rel(me.BEGIN,c.onMediaBegin);
						api.rel(me.PLAY,c.onMediaPlay);
						api.rel(me.PROGRESS,c.onMediaProgress);
						api.rel(me.SEEK_NOTIFY,c.onMediaSeek);
						api.rel(me.STOP,c.onMediaStop);
						api.rel(me.COMPLETE,c.onMediaComplete);
						api.rel(me.ERROR,c.onMediaError);
						api.pause();
						api.getVideoPosition(function (data) {
							var m = c.media;
							belk.video.utils.trackVideo(m.id,m.customFields.category,6,data,m.length); //6 - close
						});
					} catch(e) {
					}
				}
				belk.video.state.isModalOpen = false;
			},
			cleanNumber:function (value) {
				if (U != value) {
					value = value.replace(SA,'0');
					value = value.replace(/[^0-9]/g,'');
					return Number(value);
				} else {
					return(0);
				}
			},
			launchModalVideoPlayer:function (items) {
	          	var ut = belk.video.utils,																																	
	          		pd = belk.video.config.players.product,
	          		df = pd.defaults,
	          		parms = {},
	          		vLength=items.length,
	          		calWidth=df.width,
	          		listWidth=0;
				if (vLength > 1) listWidth += df.listWidth;
				if (vLength > 3) listWidth += 15;
				calWidth += listWidth;
				parms.locId = PPVC;
				parms.items = items;
				parms.videoId = items[0].id;
				parms.listContainerWidth = listWidth;
				parms.autoStart = false;
				belk.video.state.isModalOpen = true;
				belk.modal.open({width:calWidth,height:df.height,addClass:'video',hScroll:false,vScroll:false,
									content:'<div id="'+PPVC+'" style="height:'+df.height+'px;width:'+calWidth+'px;">'+D,
									events:{afterOpen:function() { belk.video.append(pd,parms);},beforeClose:function() {ut.closeModalVideoPlayer();} } });
			},
			videoThumbTakeover:function (i,l) { // i for items and l for location
				if ( (U == l) || (N == l) || ('' == l) || (' ' == l) ) return;
				else l+=' ';
				if ( (U != i) && (i.length > 0) ) {
					var o = $('<a></a>');
					o.addClass('videoThumb');
					o.attr('title',i.length+' videos');
					o.css('cursor','pointer');
					o.click(function () {belk.video.utils.launchModalVideoPlayer(i); });
					$(l + '.videoThumb').remove();
					var loc = $(l);
					loc.append(o);
					loc.show();
				}
			},
			parseVideoListCustomFieldsProduct:function (v) { // v for videos - this is intended to parse each video's product list before a split or sort is done.
				for (var i=0;i<v.length;i++) {
					var str = v[i].customFields.product;
					str = str.replace(/ /g,'');
					str = str.replace(/~/g,'\r');
					var pl = str.split('\r');
					for (;0<pl.length;) {
						var t = pl[0].split(':');
						pl.splice(0,1);
						if ("" != t[0]) pl[t[0]] = (t[1] || "");
					}
					v[i].products = pl;
				}
			},
			splitVideoListByProduct:function (v,p) { // v for videos and p for products - this is intended to split the videos into separates lists for each product in the second list
				var byp = [];
				for (var pi=0;pi<p.length;pi++) {
					var bp = byp[p[pi].vendorstyle];
					if ( (U == bp) || (N == bp) ) {
						bp = byp[p[pi].vendorstyle] = [];
						for (var vi=0;vi<v.length;vi++) {
							var vp = v[vi].products;
							var prod = vp[p[pi].vendorstyle];
							if ( (U != prod) && (N != prod) ) {
								bp.push(v[vi]);
							}
						}
					}
				}
				return byp;
			},
			requestProductsPlaylist:function (p) { // p for products
				var reql = belk.video.state.requests;
				var str = '//api.brightcove.com/services/library?command=search_videos&video_fields=id,name,thumbnailURL,customFields&custom_fields=product&get_item_count=true&callback=belk.video.state.requests['+
					reql.length+'].onLoaded&token=aXy2ZVRb7ePRn3rlCAyc7Hd58NIlzc_M7IhJmL8p8BjSxE_g3uXiww..';
				var l = p.length;
				reql.push({
					onLoaded :function (data) {
						var di = data.items;
						if (di.length > 0) {
							$('.removeMe').remove();
							var ut = belk.video.utils;
							ut.parseVideoListCustomFieldsProduct(di);
							var vbyp = ut.splitVideoListByProduct(di,p);
							for (n in vbyp) {
								ut.sortPlayList(vbyp[n]);
							}
							for (var i=0;i<l;i++) {
								var vid = vbyp[p[i].vendorstyle], loc = p[i].pattern;
								ut.videoThumbTakeover(vid,loc);
								if ( (U != p[i].patch) && (N != p[i].patch) ) {
									$(p[i].patch + ' .swatch_list a').click({v:vid,l:loc},function (e) {
										ut.videoThumbTakeover(e.data.v,e.data.l); 
									});
								}
							}
						}
					}
				});
				for (var i=0;i<l;i++) str += "&any=product:"+p[i].vendorstyle;
				$('head').append('<script src="'+str+'" class="removeMe"></script>');
			},
			isTouchDevice:function () {
				try {
					document.createEvent("TouchEvent");
					return true;
				} catch(e) {
					return false;
				}
			},
			touchScroll:function (id) {
				var ut = belk.video.utils;
				if (ut.isTouchDevice()) {
					var st = belk.video.state;
					var el=document.getElementById(id);
					var scrollStartPos=0;
					document.getElementById(id).addEventListener('touchstart', function(event) {
						scrollStartPos=this.scrollTop+event.touches[0].pageY;
						ut.openVideoInfo();
						clearTimeout(st.saveTimeout);
						st.saveTimeout = setTimeout(SCVI,5000);
					},false);
					document.getElementById(id).addEventListener('touchmove', function(event) {
						this.scrollTop=scrollStartPos-event.touches[0].pageY;
						event.preventDefault();
					},false);
				}
			},
			sortPlayList:function (list) {
				for (var i=0;i<list.length;i++) {
					var productStr = list[i].customFields.product;
					productStr = productStr.replace(/ /g,'');
					productStr = productStr.replace(/~/g,'\r');
					var pList = productStr.split('\r');
					for (;0<pList.length;) {
						var t = pList[0].split(':');
						pList.splice(0,1);
						if ("" != t[0]) pList[t[0]] = (t[1] || "");
					}
					list[i].pList = pList;
				}
			},
			productDetailVideos:function () {
				var p1 = String(window.location).split('PRD~');
				if (p1.length > 1) {
					var p2 = p1[1].split('/');
					if ('' != p2[0]) belk.video.product(p2[0]);
				}
			},
			pygVideos:function () {
				if ($('body.pickGift').length) {
					var products = [];
					var pList = $('.prod_child_product[rel]');
					for (var i=0;i<pList.length;i++) {
						var product = {};
						var classes = $(pList[i]).attr('class').split(' ');
						for (var j=0;j<classes.length;j++) {
							if (classes[j].indexOf('prod_') == 0) { 
								if ('' != classes[j].replace(/[^0-9]/g,'')) {
									product.pattern = '.'+classes[j]+' .alternate_images';
									product.patch = '.'+classes[j]+' + .prod_options';
									break;
								}
							}
						}
						product.vendorstyle = $(pList[i]).attr('rel');
						products.push(product);
					}
					if (products.length > 0) belk.video.products(products);
				}
			}
		},
		patches:{
			enableCloseForBasicPlayerInModal:function (c) {
				var close = $('#'+c.tagId).parent().parent().find('.close');
				close.click(function () {
					c.bcPlayerAPI.pause();
				});
				$('div#mask').click(function () {
					$('.window .close').click();
				});	
			}
		},
		append:function (playerType,parms) {
			var ut = belk.video.utils;
			var pn = parms.playerNumber = ut.createPlayerNumber();
			parms.tagId = ut.createPlayerTagId(pn);
			parms.objectId = ut.createExperienceTagId(pn);
			var cd = ut.checkDimension;
			var d = belk.video.config.defaults;
			parms.width = cd(parms.width,playerType.defaults.width,d.width);
			parms.height = cd(parms.height,playerType.defaults.height,d.height);
			if (playerType.alterContainer) {
				$('#'+parms.locId).css({width:parms.width+'px',height:parms.height+'px','background-color':d.backgroundColor});
			}
			return ut.append(playerType,parms);
		},
		basic:function (locId,videoId,width,height,autoStart) {
			if (belk.video.utils.isDuplicate('locId:'+locId+';videoId:'+videoId+';width:'+width+';height:'+height+';autoStart:'+autoStart)) { return N; }
			return belk.video.append(belk.video.config.players.basic,{locId:locId,videoId:videoId,width:width,height:height,autoStart:autoStart});
		},
		product:function (vs) { // vs for vendorstyle
			var ut = belk.video.utils;
     		if (ut.isDuplicate('vendorstyle:'+vs)) { return N; }
			ut.requestProductsPlaylist([{vendorstyle:vs,pattern:'#alternate_images',patch:'#prod_options'}]);
		},
		products:function (products) {
			if ( (U == products) || (N == products) ) return;
			var ut = belk.video.utils;
			if (ut.isDuplicate('products:'+products)) return;
			ut.requestProductsPlaylist(products);
		},
		play:function (videoId) {
			belk.video.utils.launchModalVideoPlayer([{id:videoId}]);
		}
	}
	belk.video.utils.init();
})();