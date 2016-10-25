import React from 'react';
import classNames from 'classnames';
import Editor from './Editor';
import Preview from './Preview';
import ArticleModel from '../../models/ArticleModel';
import UpdateEntryService from '../../services/UpdateEntryService';
import PublishStatusData from '../../models/vo/PublishStatusData';

/**
 * 記事クラス
 */
export default class Entry extends React.Component {

  /**
   * コンストラクター
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      entryData: this.props.entryData || new ArticleModel()
    };

    // 記事保存サービス
    this._updateService = new UpdateEntryService(this.state.entryData.id);

    this._onChange = this._onChange.bind(this);
    this._onSuccessSave = this._onSuccessSave.bind(this);
    this._onChangePublic = this._onChangePublic.bind(this);
    this._onPressCommandS = this._onPressCommandS.bind(this);

    this._updateService.addEventListener('success', this._onSuccessSave);
    Mousetrap.bind(['ctrl+s', 'command+s'], this._onPressCommandS);
  }

  /**
   * 描画します。
   */
  render() {
    let options = PublishStatusData.LIST.map((data, index) => {
      return (
        <option value={data.type} key={index}>{data.text}</option>
      );
    });

    return (
      <div className="article panel">
        <div className="articleFooter">
          <lebel className="public">
            公開設定：
            <select className="mousetrap" onChange={this._onChangePublic}>
              {options}
            </select>
          </lebel>
        </div>
        <div className="main">
          <Editor ref="editor" entryData={this.state.entryData} onChange={this._onChange} />
          <Preview entryData={this.state.entryData}/>
        </div>
      </div>
    );
  }

  /**
   * 記事内容変更時のハンドラーです。
   */
  _onChange(entryData) {
    this.setState({ entryData: entryData });
  }

  /**
   * command+sを押した際のハンドラーです。
   */
  _onPressCommandS(e) {
    e.preventDefault();
    this._save();
  }

  /**
   * 記事を保存します。
   */
  _save() {
    let entryData = this.state.entryData;
    this._updateService.send(this.state.entryData);
  }

  /**
   * 記事作成成功時のハンドラーです。
   */
  _onSuccessSave(event) {
    let data = event.data;
    this.setState({
      entryData: data.entryData
    });
  }

  /**
   * 記事更新成功時のハンドラーです。
   */
  _onSuccessUpdate(event) {
    let data = event.data;
    console.info("------", data);
    this.setState({
      entryData: data.entryData
    });
  }

  /**
   * 公開設定を変更した際のハンドラーです。
   */
  _onChangePublic(event) {
    let publishStatus = event.target.value;
    let entryData = this.state.entryData;
    entryData.publishStatus = publishStatus;
    this.setState({
      entryData: entryData
    });
  }
 }