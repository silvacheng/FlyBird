(function () {
    window.Game=Class.extend({
        init:function (option) {
            option=option || {};
            var self=this;//备份指针
            this.fps=option.fps || 60;//每秒钟走过帧数

            //实例化帧工具类
            this.frameUtil=new FrameUtil();
            this.canvas=document.getElementById(option.canvasId);
            this.ctx=this.canvas.getContext('2d');

            //实例化本地图片数据工具类
            this.staticSourceUtil=new StaticSourceUtil();
            this.allImageObj={};//用于存放所有的图片dom对象
            // 调用其中的方法,加载本地的图片资源 ---> 所有的图片dom对象, 总的图片个数, 已经加载的图片个数
            this.staticSourceUtil.loadImage('r.json',function (allImageObj,allImageCount,loadImageCount) {
                //console.log(allImageObj,allImageCount,loadImageCount);
                if(allImageCount == loadImageCount){
                    self.allImageObj=allImageObj;
                    self.ready();
                }
            });
        },
        //准备状态
        ready:function () {
            var self = this;
            // 是否开始
            this.isGameBegin = true;
            game.ctx.drawImage(game.allImageObj['gamebegin'],(game.canvas.width-337)*0.5,(game.canvas.height-75)*0.5);
            game.canvas.addEventListener('click', function () {
                if (self.isGameBegin){
                    // 改变游戏开始状态
                    self.isGameBegin = false;
                    self.run();
                }
            });
        },
        run:function () {
            var self=this;
            this.timer=setInterval(function () {
                self.runLoop();
            },1000/this.fps);

            // 初始化背景类 --> 房子
            this.fangzi=new Background({
                img:this.allImageObj['fangzi'],
                y:this.canvas.height-256-100,
                width:300,
                height:256,
                speed:2
            });

            // 初始化背景类 --> 树
            this.shu = new Background({
                img: this.allImageObj["shu"],
                y:  this.canvas.height - 216 - 48,
                width: 300,
                height: 216,
                speed: 3
            });

            // 初始化背景类 --> 地板
            this.diban = new Background({
                img: this.allImageObj["diban"],
                y:  this.canvas.height - 48,
                width: 48,
                height: 48,
                speed: 4
            });

            //存放创建的管道数组,防止循环运行runLoop中被清掉
            this.pipeArr=[];

            //初始化鸟
            this.bird=new Bird();

            //是否结束
            this.isGameOver=false;

        },
        runLoop:function () {
            this.frameUtil.render();//清屏
            this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
            this.ctx.fillText('FPS/'+this.frameUtil.realFps,15,15);
            this.ctx.fillText('FNO/'+this.frameUtil.currentFrame,15,30);

            // 更新和渲染背景
            this.fangzi.update();
            this.fangzi.render();

            this.shu.update();
            this.shu.render();

            this.diban.update();
            this.diban.render();

            //初始化管道,每一百帧创建一个管道
            if(!this.isGameOver && this.frameUtil.currentFrame %100 ==0){
                this.pipeArr.push(new Pipe());
            }
            //更新和渲染管道(遍历)
            for(var i=0; i<this.pipeArr.length; i++){
                game.pipeArr[i].update();
                game.pipeArr[i].render();
            }

            //更新和渲染鸟
            this.bird.update();
            this.bird.render();

        },
        pause:function () {
            clearInterval(this.timer);
        },
        gameOver:function () {
            //暂停所有场景
            this.fangzi.pause();
            this.shu.pause();
            this.diban.pause();
            this.pipeArr.forEach(function (item,index) {
                item.pause();
            });

            //鸟的状态改变，死亡
            this.bird.die=true;

            //游戏结束
            this.isGameOver=true;
        }
    });
})();
