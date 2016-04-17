var boxes = {};
boxInitFunction = function(){
	 boxes = {
		methods: {
	    renderBox : function(){
	      for(var i = 0 ; i < dom.xBox ; i++){
	        for(var j = 0 ; j < dom.yBox ; j++){
	          var box = document.createElement('DIV');
	          box.className = 'box';
	          dom.cont.appendChild(box);
	          dom.boxArr.push(box);
	        }
	      }
	      mt.randomizeBox();
	    },
	    
	    randomizeBox: function(){
	    	for(var i = 0 ; i < dom.xBox*dom.yBox ; i++){
	      	dom.boxArr[i].style.left = mt.random(dom.xLow, dom.xUp) + '%';
	      	dom.boxArr[i].style.top = mt.random(dom.yLow, dom.yUp) + '%';
	      	dom.boxArr[i].style.transform = 'rotate('+ mt.random(0, 90) +'deg)';
	      	dom.boxArr[i].className = 'box';
	      }
	    },
	    
	    random : function(l, u){
	    	return Math.random() * u + l;
	    },

	    serializeBox: function(){
		    for( var i = 0 ; i < dom.xBox ; i++){
		        for( var j = 0 ; j < dom.yBox ; j++){
		          dom.boxArr[(i*dom.yBox) + j].style.left = dom.navCont.offsetLeft + ( j * dom.blkSize );
		          dom.boxArr[(i*dom.yBox) + j].style.top = dom.navCont.offsetTop + ( i * dom.blkSize );
		          dom.boxArr[(i*dom.yBox) + j].style.transform = 'rotate(0deg)';
		          dom.boxArr[(i*dom.yBox) + j].className = 'box merged-box';
		        }
		    }
	    },

	    showContent: function(navId, span){

			if(dom.currentNavSpan){
				dom.currentNavSpan.className = '';
	    		dom.currentNavSpan.parentNode.className = '';
	    		dom.navCont.className = '';

			}
	    	if(navId == dom.currentNav){
	    		dom.currentNav = null;
	    		mt.randomizeBox();
	    	}else{
	    		if(dom.currentNav != null){
	    			mt.randomizeBox();
	    		}
	    		dom.currentNav = navId;
	    		dom.currentNavSpan = span;
	    		setTimeout(function(){
	    			mt.serializeBox();
	    			dom.currentNavSpan.parentNode.className = 'invertedNav';
	    			setTimeout(function(){
		    			dom.navCont.className = 'showNavCont';
		    		}, 400);
	    			//mt.animateSpanToHeader(dom.currentNavSpan);
	    		}, dom.switchingDelay);
	    	}
	    },

	    chkWindowWidth: function(width){
	    	if(width <= 800){
	    		dom.navBar.className = 'navBar open';
	    		mt.showBackdrop();
	    		dom.isNavOpen = true;
	    	}
	    	if(width > 800){
	    		dom.navBar.className = 'navBar';
	    		dom.backDrop.style.display = 'none';
	    		dom.isNavOpen = false;
	    	}
	    },

	    showHideNav: function(){
	    	if(window.innerWidth < 800){
	    		if(dom.isNavOpen){
	    			dom.navBar.className = 'navBar';
	    			dom.backDrop.style.display = 'none';
	    		}else{
	    			dom.navBar.className = 'navBar open';
	    			mt.showBackdrop();
	    		}
	    		dom.isNavOpen = !dom.isNavOpen;
	    	}
	    },
	    showBackdrop: function(){
	    	window.setTimeout(function(){
	    		dom.backDrop.style.display = 'block';
	    	}, 500);
	    }

	    /*animateSpanToHeader: function(span){
	    	span.className = 'movingSpan';
	    	var lPos = span.offsetLeft;
	    	var tPos = span.offsetTop;
			dom.currentNavSpan.style.left = lPos;
			dom.currentNavSpan.style.top = tPos;
	    	var anim = setInterval(frameL, 5);
	    	function frameL(){
	    		if(lPos >= ( dom.xLow + 20 )){
	    			clearInterval(anim);
	    			animT = setInterval(frameR, 5);
	    		}
	    		lPos = lPos+2;
	    		span.style.left = lPos + 'px';
	    	}

	    	function frameR(){
	    		if(tPos <= ( dom.yLow + 20 )){
	    			clearInterval(animT);
	    		span.className = 'movingSpan biggerFont';
	    		}
	    		tPos = tPos-2;
	    		span.style.top = tPos + 'px';
	    	}
	    }*/
	  
	  },
	  events: function(){
	  	window.addEventListener('resize', function(e){
	  		mt.chkWindowWidth(e.target.innerWidth);
	  	});
	  	dom.navPic.addEventListener('click', mt.showHideNav);
	  },
	  initializer: function(){
	  mt.chkWindowWidth(window.innerWidth);
	  mt.renderBox();
	  dom.navCont.style.height = (dom.xBox * dom.blkSize) + 'px';
	  dom.navCont.style.width = (dom.yBox * dom.blkSize) + 'px';
	  dom.navCont.style.left = dom.xLow + '%';
	  dom.navCont.style.top = dom.yLow + '%';
	  },
	  doms: {
		  xBox: 5,
		  yBox: 7,
		  xLow: 24,
		  xUp: 70,
		  yLow: 5,
		  yUp: 80,
		  blkSize: 100,
		  boxArr: [],
		  switchingDelay: 400,
		  currentNav: null,
		  currentNavSpan: null,
		  isNavOpen: true,
		  cont: document.getElementsByClassName('container')[0],
		  navCont: document.getElementById('navContent'),
		  navBar: document.getElementById('navBar'),
		  navPic: document.getElementsByClassName('nav-pic')[0],
		  backDrop: document.getElementsByClassName('back-drop')[0]
	  }
	};

	var mt = boxes.methods;
	var dom = boxes.doms;
	boxes.events();
	boxes.initializer();
}
