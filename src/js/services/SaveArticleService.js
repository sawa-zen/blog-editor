import EventDispatcher from '../core/EventDispatcher';
import ApiParam from '../enum/ApiParam';
import SaveArticleResponse from '../models/vo/SaveArticleResponse';

/**
 * 記事保存サービスクラスです。
 */
export default class SaveArticleService extends EventDispatcher {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(response) {
    super();

    this._path = ApiParam.getPath() + "article";
    this._onComplete = this._onComplete.bind(this);
  }

  /**
   * 送信します。
   */
  send(data) {
    $.ajax({
      type: 'POST',
      url: this._path,
      data: {
        id: data.id,
        title: data.title,
        content: data.content,
        eye_catching: "asdfas"
      },
      success: this._onComplete,
      dataType: 'json',
      crossDomain: true
    });
  }

  /**
   * リクエストが完了した際のハンドラーです。
   */
  _onComplete(response, result) {
    let data = new SaveArticleResponse(response);
    // 成功イベントを発火
    this.dispatchEvent('success', {data: data});
  }
}
