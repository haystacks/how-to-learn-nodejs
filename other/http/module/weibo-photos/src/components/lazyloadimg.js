var lazy = function () {
    var images = document.images;
    for (obj of images) {
        if(obj.getBoundingClientRect().top < document.documentElement.clientHeight && !obj.isLoad) {
            obj.isLoad = true;
            // 先调用 HTML5 方法
            if (obj.dataset)
                imageLoaded(obj, obj.dataset.original);
            else
                imageLoaded(obj, obj.getAttribute('data-original'));
        } else {
            break;
        }
    }
};
var img = new Image();
var imageLoaded = function(obj, original) {
    img.src = original;
    img.onload = function() {
        obj.src = original;
    }
};
export default lazy;
