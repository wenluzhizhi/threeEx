class MyWeb {

    constructor() {
        this.myBtn = $("#mybtn");
        this.video = $("#video")[0];
        this.devices2 = [];
        this.deviceId;
        this.canvasElement;
        this.canvasContext;
        this.videoElement;
        this.videoSetting = {width: 320, height: 240};
        this.bindEvent();

    }

    bindEvent() {
        this.myBtn.onclick=this.checkCamera(this);
    }


    checkCamera(_this) {

        navigator.mediaDevices.enumerateDevices().then((devices) => {
            devices.find((device) => {
                if (device.kind == "videoinput") {
                    //alert(this);
                    //console.log(device);
                    var deviceInfo = {};
                    deviceInfo['name'] = device.label || "camera";
                    deviceInfo['deviceId'] = device.deviceId;
                    console.log("----"+deviceInfo);
                    _this.devices2.push(deviceInfo);


                }
            });
        });

         console.log("==sssss="+_this.devices2[0]);
         _this.deviceId=_this.devices2[_this.devices2.length-1]['deviceId'];
         _this.openCamera(_this,_this.video,_this.deviceId).then(() => {
             alert("dddfdfffdf");
         });
    }



    openCamera(_this,video, deviceId, setting,) {
        _this.canvasElement = document.createElement('canvas');
        _this.canvasContext = _this.canvasElement.getContext('2d');

        if (setting) {
            _this.videoSetting = setting;
        }

        const constraints = {
            audio: false,
            video: {deviceId: {exact: deviceId}}
        };
        _this.canvasElement.setAttribute('width', _this.videoSetting.width + 'px');
        _this.canvasElement.setAttribute('height', _this.videoSetting.height + 'px');

        return new Promise((resolve, reject) => {
            navigator.mediaDevices.getUserMedia(constraints)
                .then((stream) => {
                    _this.video.srcObject = stream;
                    _this.video.style.display = 'block';
                    _this.video.play();
                    resolve(true);
                })
                .catch((err) => {
                    reject(err);
                });
        });

    }
}
new MyWeb();











