import BaseService from './BaseService';
import ApiParam from '../enum/ApiParam';
import SaveArticleResponse from '../models/vo/SaveArticleResponse';

/**
 * 記事保存サービスクラスです。
 */
export default class SaveArticleService extends BaseService {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(id) {
    super();

    this._method = ApiParam.POST;
    this._path = ApiParam.getPath('entries/' + id);
  }

  /**
   * 通信用にデータを整形します。
   * @override
   */
  _formatData(data) {
    return {
      title: data.title,
      eye_catch_image_url: data.eyeCatchImageUrl,
      content: data.content,
      publish_date: "2012-07-26T01:00:00+09:00"
    };
  }

  /**
   * 正常なレスポンスを受け取った際のハンドラーです。
   */
  _onSuccess(res) {
    let data = new SaveArticleResponse(res);
    // 成功イベントを発火
    this.dispatchEvent('success', {data: data});
  }
}
