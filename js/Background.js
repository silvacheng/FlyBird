/**
 * Created by Administrator on 2016/10/24.
 */
(function () {
    window.Background=Class.extend({
        init:function (option) {
            option=option || {};
            this.img=option.img;
            this.x=0;
            this.y=option.y || 0;
            this.width=option.width || 0;
            this.height=option.height || 0;
            this.speed=option.speed || 1;
            this.count=parseInt(game.canvas.width/this.width)+1;
        },
        update:function () {
            this.x-=this.speed;
            if(this.x < -this.width*this.count){
                this.x=0;//判断当每运动到一个宽度距离时，恢复x为0
            }
            
        },
        pause:function () {
            this.speed=0;
        },
        render:function () {
            for(var i=0;i<this.count*2;i++){//给count乘以2，保证其无缝循环
                game.ctx.drawImage(this.img,this.x+i*this.width,this.y,this.width,this.height);
            }
        }
    });
})();
