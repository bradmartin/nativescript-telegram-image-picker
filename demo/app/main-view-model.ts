import * as TNSFileSystem from 'file-system';
import * as ImageSource from 'image-source';
import * as app from 'application';
import { isAndroid } from 'platform';
import { Observable } from 'data/observable';
import { openTelegramImagePicker, TelegramPickerResponse } from 'nativescript-telegram-image-picker';

declare var android, java: any;

export class HelloWorldModel extends Observable {

  public message: string;
  public pictureLimit: number;

  constructor() {
    super();
    this.message = '';
    this.pictureLimit = 1;
  }


  public onTap() {
    try {

      if (!isAndroid) {
        console.log('This plugin doesn\'t work for iOS. It is using a native Android library. Sorry');
        return;
      }

      let picLimit = this.get('pictureLimit');

      // Open the Telegram Gallery Image Picker Activity      
      openTelegramImagePicker(picLimit).then((resp: TelegramPickerResponse) => {
        // reset the `message`
        this.set('message', '');
        // looping over the selected pictures in the response        
        for (var i = 0; i < resp.photos.length; i++) {
          let currentMsg = this.get('message');
          this.set('message', currentMsg + 'Pic: ' + resp.photos[i] + '\n');
        }

      })

    } catch (error) {
      console.log('ERROR: ' + error);
    }

  }


}




 // let pic1 = resp.photos[0];

        // var options = new android.graphics.BitmapFactory.Options();
        // var bitmap = android.graphics.BitmapFactory.decodeFile(pic1, options);
        // console.log('BITMAP: ' + bitmap);

        // var img = ImageSource.fromNativeSource(bitmap);
        // console.dump(img.android);