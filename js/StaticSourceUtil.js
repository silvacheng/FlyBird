/**
 * Created by Administrator on 2016/10/24.
 */
(function () {
    window.StaticSourceUtil=Class.extend({
        init:function () {
            //装入转化后的dom对象
            this.allImageObj={};
        },
        loadImage:function (jsonUrl,callback) {
            var self=this;

            var xhr=new XMLHttpRequest();
            xhr.open('get',jsonUrl,true);
            xhr.send(null);
            xhr.onreadystatechange=function () {
                if(xhr.readyState==4){
                    if(xhr.status==200){
                        var loadImageCount=0;//当前加载照片个数
                        var responseText=xhr.responseText;
                        var responseJson=JSON.parse(responseText);
                        var imageArray=responseJson.images;
                        for(var i=0;i<imageArray.length;i++){
                            var image=new Image();
                            image.index=i;
                            image.src=imageArray[i].src;
                            image.onload=function () {
                                loadImageCount++;//已加载图片个数递加
                                self.allImageObj[imageArray[this.index].name]=this;
                                //访问并获取数据后，回调
                                callback(self.allImageObj,imageArray.length,loadImageCount);
                            }
                        }
                    }
                }
            }
        }
    });
})();

