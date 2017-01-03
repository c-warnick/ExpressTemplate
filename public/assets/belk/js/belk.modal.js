(function (wnd){
	'use strict';
	//private variables
	var belk=wnd.belk||{},
		srcFilename='belk.modal.js',
		U='undefined',
		E='',C='.',F='function',ODC='<div class="',D='</div>',PM='mask',PBM='belk-modal',PBMT='belk-modal-title',PBMC='belk-modal-content',PBMM='belk-modal-mask',PB='body',PC='<a class="close"></a>',
		SA='auto',SS='scroll',SH='hidden',SOX='overflow-x:',SOY='overflow-y:',AEF=function(){},
		CSS='.belk-modal{' +
		'	background:none repeat scroll 0 0 #fff;' +
		'	padding:30px;' +
		'}' +
		'.belk-modal-mask .mask{' +
		'	background:none no-repeat scroll 0 0 #000;' +
		'	height:100%;' +
		'	left:0;' +
		'	opacity:0.6;' +
		'	position:relative;' +
		'	top:0;' +
		'	width:100%;' +
		'}' +
		'.belk-modal .close {' +
		'	cursor:pointer;' +
		'	float:right;' +
		'	height:20px;' +
		'	position:relative;' +
		'	right:-15px;' +
		'	font-size:14px;' +
		'	top:-15px;}' +
		'.belk-modal .close:before {' +
		'	content:"Close [X]"; ' +
		'}' +
		'.belk-modal.video .belk-modal-content {' +
		'	background: none no-repeat scroll 0 0 #000;' +
		'}' +
		'#bcVideoContainer .videoListContainer .videoList .list .videoItem .thumbContainer,.belkBCBasic {' +
		'	position:relative;' +
		'}' +
		'.belk-modal-title {' +
		'	color: #107bc0;' +
		'	font-size: 20px;' +
		'	font-weight: bolder;' +
		'	line-height: 24px;' +
		'	margin: 15px 0 0;' +
		'	padding: 0;' +
		'	position: absolute;' +
		'	top: 0;' +
		'}',
		widthRange={min:200,max:800},
		heightRange={min:200,max:700},
		defaults={
			width:400,height:200,
			title:E,
			content:'Modal content was not defined.',
			closeFirst:true,closeable:true,mask:true,maskClose:true,
			vScroll:true,hScroll:true,scrollLock:true,
			addClass:E,
			maskOpenAni:fadeInAni,
			maskCloseAni:fadeOutAni,
			modalOpenAni:fadeInAni,
			modalCloseAni:fadeOutAni,
			events:{
				beforeOpen:AEF,
				afterOpen:AEF,
				beforeClose:AEF,
				afterClose:AEF,
				positionModal:AEF
			}
		},
		mc=undefined,nmc=defaults,ch=AEF, // ch: close handler
		overflowX=E;

	belk.err=belk.err||{log:AEF};// temp place holder for belk.err.log until included in jsps
	if (U !== typeof belk.modal) return;

	//private functions
	function fadeInAni(o,a){
		o.fadeIn({duration:200,always:a});
	}
	function fadeOutAni(o,a){
		o.fadeOut({duration:200,always:a});
	}
	function showMask(){
		try{
			mc.maskOpenAni($(C+PBMM),alwaysOpenMask);
		} catch(e) {
			belk.err.log(srcFilename,'function showMask',e,true);
			alwaysOpenMask();
		}
	}
	function showModal(){
		try{
			mc.modalOpenAni($(C+PBM),alwaysOpenModal);
		}catch(e){
			belk.err.log(srcFilename,'function showModal',e,true);
			alwaysOpenModal();
		}
	}
	function hideModal(){
		try{
			mc.modalCloseAni($(C+PBM),alwaysCloseModal);
		}catch(e){
			belk.err.log(srcFilename,'function hideModal',e,true);
			alwaysCloseModal();
		}
	}
	function hideMask(){
		try{
			mc.maskCloseAni($(C+PBMM),alwaysCloseMask);
		}catch(e){
			belk.err.log(srcFilename,'function hideMask',e,true);
			alwaysCloseMask();
		}
	}
	function alwaysOpenMask(){
		$(C+PBMM).show(showModal);
	}
	function alwaysOpenModal(){
		$(C+PBM).show(function(){
			try{mc.events.afterOpen();}catch(e){
				belk.err.log(srcFilename,'function alwaysOpenModal',e,false);
			}
		});
	}
	function alwaysCloseModal(){
		$(C+PBM).hide(function(){
			if (mc.mask) hideMask();
			else {
				removeModalAndMask();
			}
		});
	}
	function alwaysCloseMask(){
		$(C+PBMM).hide(removeModalAndMask);
	}
	function removeModalAndMask(){
		if (mc.mask) $(C+PBMM).remove();
		$(C+PBM).remove();
		if (mc.scrollLock) unlockScroll();
		try{
			mc.events.afterClose();
		}catch(e) {
			belk.err.log(srcFilename,'function removeModalAndMask,mc.events.afterClose',e,false);
		}
		mc=undefined;
		try{ch();}catch(e){}
		ch=AEF;
	}
	function lockScroll(){
		var b=$(PB);
		overflowX=b.css(SOX);
		b.css('overflow-x',SH);
		b.css('overflow-y',SH);
		b.attr(SS,'no');
	}
	function unlockScroll(){
		var b=$(PB);
		b.attr(SS,'yes');
		b.css('overflow-x',overflowX);
		b.css('overflow-y','visible');
	}
	function cleanNumber(v){
		if (U !== typeof v){
			v=String(v);
			v=v.replace(SA,'0');
			v=v.replace(/[^0-9]/g,E);
			return Number(v);
		}else{
			return(0);
		}
	}
	function positionModalOnWindowResize(){
		var mo = $(C+PBM),
			ma = $(C+PBMM),
			moWidth=mo.outerWidth(false),
			moHeight=mo.outerHeight(false),
			winWidth=$(wnd).width(),
			winHeight=$(wnd).height(),
			left=winWidth/2-moWidth/2,
			top=winHeight/2-moHeight/2,
			dWidth=$(document).width(),
			dHeight=$(document).height(),
			maWidth=dWidth+'px',
			maHeight=dHeight+'px';
		if ('absolute'===mo.css('position')) top += $(wnd).scrollTop();
		if (0 > left) left=0;
		if (0 > top) top=0;
		mo.css({left:left,top:top});
		ma.css({width:maWidth,minWidth:maWidth,height:maHeight,minHeight:maHeight});
		try{mc.events.positionModal();}catch(e){}
	}
	function clipToRange(v,r){
		return Math.min(Math.max(v, r.min), r.max);
	}
	function processConfig(c){
		mc=$.extend(true,{},defaults,c);
		mc.width=clipToRange(cleanNumber(mc.width),widthRange);
		mc.height=clipToRange(cleanNumber(mc.height),heightRange);
	}
	function isTouchDevice(){
		try {
			document.createEvent('TouchEvent');
			return true;
		} catch(e) {
			return false;
		}
	}
	function orientationChange(){
		wnd.addEventListener('orientationchange',function (){
			positionModalOnWindowResize();
		},false);
	}
	function openModal(){
		var htmlStr='',close,modal;
		processConfig(nmc);
		nmc=defaults;
		if (mc.mask) htmlStr+=ODC+PBMM+'" style="position:absolute;top:0;left:0;z-index:2147483647;display:none;">'+ODC+PM+'">'+D+D;
		htmlStr+=ODC+PBM+' '+mc.addClass.trim()+'" style="position:fixed;min-width:'+mc.width+'px;width:'+mc.width+'px;min-height:'+mc.height+'px;height:'+mc.height+'px;z-index:2147483647;display:none;">';
		if (mc.closeable && mc.closeFirst) htmlStr+=PC;
		if (E!==mc.title) htmlStr+=ODC+PBMT+'" style="position:absolute;color:#107bc0;font-size:20px;font-weight:bolder;line-height:24px;padding:0;">'+mc.title+D;
		htmlStr+=ODC+PBMC+'" style="width:'+mc.width+'px;height:'+mc.height+'px;';
		if (mc.hScroll) htmlStr+=SOX+SA+';';
		else htmlStr+=SOX+SH+';';
		if (mc.vScroll) htmlStr+=SOY+SA+';';
		else htmlStr+=SOY+SH+';';
		htmlStr+='">'+mc.content+D;
		if (mc.closeable && !mc.closeFirst) htmlStr+=PC;
		htmlStr+=D;
		if (mc.scrollLock) lockScroll();
		$('body').append(htmlStr);
		positionModalOnWindowResize();
		$(wnd).resize(positionModalOnWindowResize);
		if (isTouchDevice()) orientationChange(); // fix for tablet devices
		if (!mc.scrollLock && 'absolute'===$(C+PBM).css('position')) $(wnd).scroll(positionModalOnWindowResize);
		if (mc.closeable) {
			modal=$(C+PBM);
			close=$(C+PBM+' .close');
			modal.height(mc.height + close.height());
			close.click(closeModal);
			if (mc.maskClose) $(C+PBMM).click(closeModal);
		}
		try{mc.events.beforeOpen();}catch(e){
			belk.err.log(srcFilename,'function openModal',e,true);
		}
		if (mc.mask) showMask();
		else showModal();
	}
	function closeModal(h){
		ch=(F===typeof h)?h:AEF;
		try{mc.events.beforeClose();}catch(e){
			belk.err.log(srcFilename,'function closeModal',e,false);
		}
		hideModal();
	}
	//public interface
	belk.modal={
		version:'1.0.3.0',
		open:function (m) {
			try{
				nmc=m||{};
				if (U===typeof mc) openModal();
				else closeModal(openModal);
			}catch(e){
				belk.err.log(srcFilename,'belk.modal.open:function',e,false);
			}
		},
		close:function(h){
			try{
				closeModal(h);
			}catch(e){
				belk.err.log(srcFilename,'belk.modal.close:function',e,false);
			}
		},
		getClasses:function(){
			return String({mask:{modalMaskClass:PBMM,maskClass:PM},modal:{modalClass:PBM,modalContentClass:PBMC}});
		}
	};

	(function appendCSS() {
		var s = document.createElement('style');
		s.type = 'text/css';
		s.innerHTML = CSS;
		document.head.appendChild(s);
	})();
})(window);
