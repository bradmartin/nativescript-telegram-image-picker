/**********************************************************************************
* (c) 2016, Brad Martin.
* Made for the {N} community by Brad Martin @BradWayneMartin
* https://twitter.com/BradWayneMartin
* https://github.com/bradmartin
* http://bradmartin.net
* Licensed under the MIT license.
* Open Source Lib : https://github.com/TangXiaoLv/TelegramGallery
* Version 1.0.0                                           bradwaynemartin@gmail.com
**********************************************************************************/

'use strict';
import * as app from 'application';

declare var com, android: any;

const GalleryActivity = com.tangxiaolv.telegramgallery.GalleryActivity;

export function openTelegramImagePicker(photoLimit: number = 1): Promise<TelegramPickerResponse> {
  return new Promise((resolve, reject) => {

    let activity = app.android.startActivity || app.android.foregroundActivity;
    let singlePhoto: boolean;

    if (photoLimit && photoLimit > 1) {
      singlePhoto = false;
    }

    singlePhoto = photoLimit > 1 ? false : true;

    try {

      GalleryActivity.openActivity(
        activity,
        singlePhoto,
        photoLimit,
        1224
      )

      app.android.on(app.AndroidApplication.activityResultEvent, ((args: app.AndroidActivityResultEventData) => {
        if (args.requestCode === 1224 && args.intent) {
          let data = args.intent
          // list of photos of seleced
          let photoList = data.getSerializableExtra(GalleryActivity.PHOTOS)
          // list of videos of seleced
          let videoList = data.getSerializableExtra(GalleryActivity.VIDEOS)

          let photos;
          let videos;

          if (photoList !== null) {
            photos = photoList.toArray()
          }

          if (videoList !== null) {
            videos = videoList.toArray()
          }

          let resp: TelegramPickerResponse = {
            photos: photos,
            videos: videos
          }

          resolve(resp)

        }

      }))

    } catch (error) {
      reject(error)
    }

  })

}

interface TelegramPickerResponse {
  photos: Array<string>,
  videos: Array<string>
}