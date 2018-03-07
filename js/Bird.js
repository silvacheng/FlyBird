/**
 * Created by Administrator on 2016/10/24.
 */
(function () {
    window.Bird=Class.extend({
        init:function () {
            this.x=(game.canvas.width-85)*0.5;
            this.y=100;
            this.width=85;
            this.height=60;

            //翅膀状态0,1,2
            this.swing=0;
            //闪动频率,每几帧变幻一次
            this.swingRate=5;
            //下落速度
            this.dropFrame=game.frameUtil.currentFrame;
            this.dY=0;

            //下落旋转角度
            this.rotateAngle=0;

            //鸟的状态 0下 1上
            this.state=0;
            //调用点击事件
            this.bindClickListen();
            //模拟空气阻力
            this.deltaY=1;

            //鸟的存活状态
            this.die=false;

            //鸟死亡撒热血动画索引值
            this.dieAnimationIndex=0;
            
        },
        update:function () {
            //鸟死亡动画图片索引值改变
            if(this.die){
                this.dieAnimationIndex++;
                if(this.dieAnimationIndex == 30){
                    game.pause();//注意这里是game暂停，暂停帧，即清掉定时器
                }
                return;//终止
            }

            //按每this.swingRate帧来改变鸟的照片，形成翅膀扇动动画效果
            if(game.frameUtil.currentFrame%this.swingRate ==0){
                this.swing++;
                this.swing%=3;
            }
            //判断鸟的当前状态
            if(this.state==0){
                //模拟重力加速度
                this.dY=0.01*Math.pow(game.frameUtil.currentFrame-this.dropFrame,2);
                //角度变化
                this.rotateAngle++;
            }else if(this.state == 1){
                this.deltaY++;
                this.dY=-10+this.deltaY;
                //判断当空气阻力和上升的力达到平衡时，改变鸟的状态为0，并更新当前的下落帧数
                if(this.dY>0){
                    this.state=0;
                    this.dropFrame=game.frameUtil.currentFrame;
                }
            }

            this.y+=this.dY;

            //判断限定鸟的活动范围
            if(this.y < 0){//上空
                this.y=0;
            }
            if(this.y > game.canvas.height-this.height-48){//地板
                game.gameOver();//结束游戏
            }
        },
        render:function () {
            //鸟死亡状态动画
            if(this.die){
                var sWidth=325,sHeight=138;
                var cols=this.dieAnimationIndex%5;//获得5列
                var rows=parseInt(this.dieAnimationIndex/5);//获取6行
                game.ctx.drawImage(game.allImageObj['blood'],cols*sWidth,rows*sHeight,sWidth,sHeight,this.x-120,this.y,sWidth,sHeight);
                game.ctx.drawImage(game.allImageObj['gameover'],(game.canvas.width-626)*0.5,(game.canvas.height-144)*0.5);
                return;//终止
            }

            //鸟旋转动画
            game.ctx.save();
            //位移画布至小鸟中心点，然后旋转
            game.ctx.translate(this.x+this.width*0.5,this.y+this.height*0.5);
            game.ctx.rotate(this.rotateAngle*Math.PI/180);
            //待旋转完之后，再平移画布回去至原位置
            game.ctx.translate(-(this.x+this.width*0.5),-(this.y+this.height*0.5));
            game.ctx.drawImage(game.allImageObj['bird'],this.swing*this.width,0,this.width,this.height,this.x,this.y,this.width,this.height);
            game.ctx.restore();
        },
        bindClickListen:function () {
            var self=this;
            game.canvas.addEventListener('mousedown',function () {
                self.state=1;
                self.rotateAngle=-25;
                self.deltaY=1;
            });
        }
    });
})();