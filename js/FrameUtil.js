/**
 * Created by Administrator on 2016/10/24.
 */
(function () {
    window.FrameUtil=Class.extend({
        init:function () {
            //当前总帧数
            this.currentFrame=0;
            //起始帧数
            this.sFrame=0;
            //真实的fps
            this.realFps=0;
            //起始的时间
            this.sTime=new Date();
        },
        render:function () {
            this.currentFrame++;

            var currentTime=new Date();

            if(currentTime-this.sTime >= 1000){
                this.realFps=this.currentFrame-this.sFrame;
                this.sFrame=this.currentFrame;
                this.sTime=currentTime;
            }
        }
    });
})();


