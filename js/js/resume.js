function md5(context){
    // do something
    return "some md5 string"
}
function resume_upload(){
    let file = null;
    let slice = null;
    // 读取文件内容
    const input = document.querySelector('input');
    input.addEventListener('change', function() {
        file = this.files[0];
    });
    // md5生成唯一标识
    const md5code = md5(file);
    // 文件分片
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.addEventListener("load", function(e) {
        //每10M切割一段,这里只做一个切割演示，实际切割需要循环切割，
        slice = e.target.result.slice(0, 10 * 1024 * 1024);
    });

    // 分片发送
    const formData = new FormData();
    formData.append('0', slice);
    //这里是有一个坑的，部分设备无法获取文件名称，和文件类型，这个在最后给出解决方案
    formData.append('filename', file.filename);
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
        //xhr.responseText
    });
    xhr.open('POST', '');
    xhr.send(formData);
    xhr.addEventListener('progress', updateProgress);
    xhr.upload.addEventListener('progress', updateProgress);

    function updateProgress(event) {
        if (event.lengthComputable) {
            //进度条
        }
    }
}