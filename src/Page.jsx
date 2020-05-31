import React from "react";
import { connect } from "react-redux";
import { incrementAction, decreaseAction } from "./actions";
import { getFirstDayDay, getLastDay } from "./dateUtils";
import "./styles.css";

class Page extends React.Component {
  render() {
    const { year, month, incrementAction, decreaseAction } = this.props;
    return (
      <div>
        <header>
          <span className="year-month">{year}年</span>
          <span className="year-month">{month}月</span>
          <button className="incre-decre" onClick={decreaseAction}>
            ＜
          </button>
          <button className="incre-decre" onClick={incrementAction}>
            ＞
          </button>
        </header>
        <div className="board">{renderSquares(year, month)}</div>
      </div>
    );
  }
}

// 7*5の日付のマス目を作っている
function renderSquares(year, month) {
  let list = [];
  // 曜日のレンダリング
  list.push(
    <div className="board-row">
      <button className="day-of-week">日</button>
      <button className="day-of-week">月</button>
      <button className="day-of-week">火</button>
      <button className="day-of-week">水</button>
      <button className="day-of-week">木</button>
      <button className="day-of-week">金</button>
      <button className="day-of-week">土</button>
    </div>
  );
  // 日付のレンダリング
  let adjustNum = getFirstDayDay(year, month); // 1週目の日曜日が1日に対して何日ずれているか
  let num = adjustNum;
  let lastDayThisMonth = getLastDay(year, month);
  let lastDayLastMonth = getLastDay(year, month);
  while (true) {
    list.push(
      <div className="board-row">
        {renderWeek(num, lastDayThisMonth, lastDayLastMonth)}
      </div>
    ); // 1週間で改行させるため
    num = num + 7;
    if (num > 34 + adjustNum) {
      break; // 7*5を描画し終えたらブレイク
    }
  }
  return list;
}

function renderWeek(num, lastDayThisMonth, lastDayLastMonth) {
  let list = [];
  for (let index = 0; index < 7; index++) {
    if (num <= 0) {
      // 先月分の日付表示
      list.push(
        <button className="daynum-else">{lastDayLastMonth + num}</button>
      );
    } else if (num > lastDayThisMonth) {
      // 来月分の日付表示
      list.push(
        <button className="daynum-else">{num - lastDayThisMonth}</button>
      );
    } else {
      // 今月分の日付表示
      list.push(<button className="daynum">{num}</button>); // １週間分の箱を表示
    }
    num++;
  }
  return list;
}

// storeが管理するstateを props として受け取るための変換函数
const mapStateToProps = state => ({
  year: state.year,
  month: state.month
});

// 各コンポーネントのイベントハンドラを一括で作成するものと思えば良い
// これも props に割り当てられる
const mapDispatchToProps = dispatch => ({
  incrementAction: () => dispatch(incrementAction()),
  decreaseAction: () => dispatch(decreaseAction())
});

// connectで元のReactのコンポーネントをreduxに対応したものに変換する
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page);
