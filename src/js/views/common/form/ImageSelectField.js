import React from 'react';
import Field from './Field';
import ImageSelectModal from '../modal/ImageSelectModal';

/**
 * 画像選択フィールドクラス
 */
export default class ImageSelectField extends Field {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
    this._onLoadFile = this._onLoadFile.bind(this);
    this._onChangeFile = this._onChangeFile.bind(this);

    // 見えないファイル選択inputを作成
    this._inputFile = document.createElement('input');
    this._inputFile.type = 'file';
    this._inputFile.addEventListener('change', this._onChangeFile);

    // ファイルリーダー
    this._fileReader = new FileReader();
    this._fileReader.addEventListener('load', this._onLoadFile);

    this.state = {
      value: this.props.value,
      displayValue: this.props.displayValue
    };
  }

  /**
   * propが変更された際のハンドラー
   * @override
   */
  componentWillReceiveProps(nextProps) {
    if(!nextProps.displayValue) {
      return;
    }
    this.setState({
      displayValue: nextProps.displayValue
    });
  }

  /**
   * 入力フォームを生成します。
   * @override
   */
  _createInput() {
    return (
      <div className="field_input imageSelectField">
        <img className="valueIcon" src={this.state.displayValue} onClick={this._onClick} />
      </div>
    );
  }

  /**
   * ファイル選択ボタン押下時のハンドラーです。
   */
  _onClick() {
    // マウスクリックイベントを発火
    let evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click');
    this._inputFile.dispatchEvent(evt);
  }

  /**
   * 画像ファイル選択時のハンドラーです。
   */
  _onChangeFile(event) {
    // ファイルリストを取得
		let fileList = this._inputFile.files;
		// ファイルをデータURIとして読み込む
		this._fileReader.readAsDataURL(fileList[0]) ;
  }

  /**
   * ファイルのロード完了時のハンドラーです。
   */
  _onLoadFile(event) {
    var result = this._fileReader.result;
    this.setState({
      value: result,
      displayValue: result
    });
    // 値の変更イベントを発火
    this._dispatchChangeEvent(result);
  }
}
