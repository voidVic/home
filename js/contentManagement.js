var contents = {};

window.onload = function(){
	boxInitFunction();

	contents = {
		methods: {
			renderNav: function(){
				for(var i = 0 ; i < contentData.nav.length ; i++ ){
					cdom.navUl.appendChild(cmt.createAndGetLi(contentData.nav[i]));
				}
			},
			createAndGetLi: function(liObj){
				var li = document.createElement('LI');
				li.innerHTML = '<span>' + liObj.title + '</span>';
				li.addEventListener('click', function(){
					boxes.methods.showContent(liObj.id, li.getElementsByTagName('span')[0]);
				});
				return li;
			}
		},
		events: function(){

		},
		initializers: function(){
			cmt.renderNav();
		},
		doms: {
			navUl: document.getElementById('navUl'),
			navCont: document.getElementById('navContent'),
			contHeader: document.getElementById('contHeader'),
			contMatter: document.getElementById('contMatter')
		}
	};

	var cdom = contents.doms;
	var cmt = contents.methods;
	contents.events();
	contents.initializers();
}


contentData = {
	"header": "Welcome Text",
	"nav": [
			{"title": "Tile 1", "id": 1},
			{"title": "Tile 2", "id": 2},
			{"title": "#3 Tile", "id": 3},
			{"title": "4th one", "id": 4}
		]
	/*"nav": [
			{"title": "About", "id": 1},
			{"title": "Skills", "id": 2},
			{"title": "Work", "id": 3},
			{"title": "Contact", "id": 4}
		]*/
}
