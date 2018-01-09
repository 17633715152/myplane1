


//我的飞机

let myPlane = {
	
	//属性
	ele: null,
	fireInterval: 300, //子弹发射间隔
	
	//方法
	init: function(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "myplane";
		this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
		this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px"
		return this;
	},
	
	//发射子弹
	fire(){
		this.timer = setInterval(()=>{
			//创建子弹对象
			var bullet = new Bullet();
			bullet.init().move();
			
		}, this.fireInterval);
	},
	
	//移动
	move(){
		//拖拽
		this.ele.onmousedown = function(e){
			e = e || event;
			var disx = e.offsetX;
			var disy = e.offsetY;
			
			document.onmousemove = function(e){
				e = e || event;
				var x = e.pageX - disx - gameEngine.ele.offsetLeft;
				if (x < 0) x = 0;
				if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
					x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = e.pageY - disy + "px";
			}
			document.onmouseup = function(){
				document.onmousemove = document.onmouseup = null;
			}
		}
	},
	
	//爆炸
	boom(callback){
		//停止发射子弹
		clearInterval(this.timer);
		
		//动画
		var dieImgs = ["images2/me_die1.png", "images2/me_die2.png", "images2/me_die3.png", "images2/me_die4.png"]
		var i = 0;
		var dieTimer = setInterval(()=>{
			
			if (i >= dieImgs.length) {
				clearInterval(dieTimer);
				gameEngine.ele.removeChild(myPlane.ele);
				
				callback(); //回调
				
			}
			else {
				myPlane.ele.style.backgroundImage = "url("+ dieImgs[i++] +")";
			}
			
		}, 100);
	}
	
}
















