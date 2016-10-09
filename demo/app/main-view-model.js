"use strict";
var platform_1 = require('platform');
var observable_1 = require('data/observable');
var nativescript_telegram_image_picker_1 = require('nativescript-telegram-image-picker');
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.message = '';
        this.pictureLimit = 1;
    }
    HelloWorldModel.prototype.onTap = function () {
        var _this = this;
        try {
            if (!platform_1.isAndroid) {
                console.log('This plugin doesn\'t work for iOS. It is using a native Android library. Sorry');
                return;
            }
            var picLimit = this.get('pictureLimit');
            // Open the Telegram Gallery Image Picker Activity      
            nativescript_telegram_image_picker_1.openTelegramImagePicker(picLimit).then(function (resp) {
                // reset the `message`
                _this.set('message', '');
                // looping over the selected pictures in the response        
                for (var i = 0; i < resp.photos.length; i++) {
                    var currentMsg = _this.get('message');
                    _this.set('message', currentMsg + 'Pic: ' + resp.photos[i] + '\n');
                }
            });
        }
        catch (error) {
            console.log('ERROR: ' + error);
        }
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
// let pic1 = resp.photos[0];
// var options = new android.graphics.BitmapFactory.Options();
// var bitmap = android.graphics.BitmapFactory.decodeFile(pic1, options);
// console.log('BITMAP: ' + bitmap);
// var img = ImageSource.fromNativeSource(bitmap);
// console.dump(img.android); 
//# sourceMappingURL=main-view-model.js.map