/**
 * Created by Administrator on 2016/10/24.
 */
(function () {
    window.Pipe=Class.extend({
        init:function () {
            //首要方向选择
            this.dir=_.random(0,1);

            this.width=148;
            this.height=_.random(100,game.canvas.height*0.5);
            this.x=game.canvas.width;//在x为canvas宽度的点上绘制
            this.y= this.dir===0 ? 0 : game.canvas.height-this.height-48;

            this.speed=4;//需与地板移动速度一致

        },
        update:function () {
            this.x-=this.speed;
            //优化判断，在刚好完全走完一个canvas宽度的距离时，清掉对应的管道
            if(this.x<-this.width){
                game.pipeArr=_.without(game.pipeArr,this);
            }

            //碰撞检测
            if(game.bird.x>this.x-game.bird.width && game.bird.x < this.x+this.width){
                if(this.dir==0){//管道朝下
                    if(game.bird.y < this.height){
                        game.gameOver();
                    }
                }else if(this.dir==1){//管道朝上
                    if(game.bird.y > this.y-game.bird.height){
                        game.gameOver();
                    }
                }
            }
        },
        pause:function () {
            this.speed=0;
        },
        render:function () {
            if(this.dir == 0){//朝下
                game.ctx.drawImage(game.allImageObj['pipe1'],0, 1664 - this.height,this.width,this.height,this.x,this.y,this.width,this.height);
            }else if(this.dir == 1){//朝上
                game.ctx.drawImage(game.allImageObj['pipe0'],0, 0,this.width,this.height,this.x,this.y,this.width,this.height);
            }
        }
    });
})();