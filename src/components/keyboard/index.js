import React from "react";
import Immutable from "immutable";
import propTypes from "prop-types";

import * as style from "./index.less";
import Button from "./button";
import store from "../../store";
import todo from "../../control/todo";
import { i18n, lan } from "../../unit/const";
import { connect } from "react-redux";

import KeyboardBackground from "../../resource/image/Worldcoin_transparent_background.png";

class Keyboard extends React.Component {
  componentDidMount() {
    const touchEventCatch = {}; // 对于手机操作, 触发了touchstart, 将作出记录, 不再触发后面的mouse事件

    // 在鼠标触发mousedown时, 移除元素时可以不触发mouseup, 这里做一个兼容, 以mouseout模拟mouseup
    const mouseDownEventCatch = {};
    document.addEventListener(
      "touchstart",
      (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      },
      true
    );

    // 解决issue: https://github.com/chvin/react-tetris/issues/24
    document.addEventListener(
      "touchend",
      (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      },
      true
    );

    // 阻止双指放大
    document.addEventListener("gesturestart", (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
    });

    document.addEventListener(
      "mousedown",
      (e) => {
        if (e.preventDefault) {
          e.preventDefault();
        }
      },
      true
    );

    Object.keys(todo).forEach((key) => {
      this[`dom_${key}`].dom.addEventListener(
        "mousedown",
        () => {
          if (touchEventCatch[key] === true) {
            return;
          }
          todo[key].down(store);
          mouseDownEventCatch[key] = true;
        },
        true
      );
      this[`dom_${key}`].dom.addEventListener(
        "mouseup",
        () => {
          if (touchEventCatch[key] === true) {
            touchEventCatch[key] = false;
            return;
          }
          todo[key].up(store);
          mouseDownEventCatch[key] = false;
        },
        true
      );
      this[`dom_${key}`].dom.addEventListener(
        "mouseout",
        () => {
          if (mouseDownEventCatch[key] === true) {
            todo[key].up(store);
          }
        },
        true
      );
      this[`dom_${key}`].dom.addEventListener(
        "touchstart",
        () => {
          touchEventCatch[key] = true;
          todo[key].down(store);
        },
        true
      );
      this[`dom_${key}`].dom.addEventListener(
        "touchend",
        () => {
          todo[key].up(store);
        },
        true
      );
    });
  }

  shouldComponentUpdate({ keyboard, filling, theme }) {
    return (
      !Immutable.is(keyboard, this.props.keyboard) ||
      filling !== this.props.filling ||
      !Immutable.is(theme, this.props.theme) // Check for theme changes
    );
  }

  render() {
    const { keyboard, theme } = this.props;

    const leftPositions = {
      rotate: { top: 100, left: 52 },
      down: { top: 180, left: 374 },
      left: { top: 90, left: 284 },
      right: { top: 90, left: 464 },
      drop: { top: 0, left: 374 },
      reset: { top: 0, left: 106 },
      pause: { top: 0, left: 16 },
      theme: { top: 0, left: 196 },
    };

    const rightPositions = {
      rotate: { top: 100, left: 362 },
      down: { top: 180, left: 110 },
      left: { top: 90, left: 20 },
      right: { top: 90, left: 200 },
      drop: { top: 0, left: 110 },
      reset: { top: 0, left: 410 },
      pause: { top: 0, left: 320 },
      theme: { top: 0, left: 500 },
    };

    const positions =
      theme.arrowPosition === "left" ? leftPositions : rightPositions;

    return (
      <div
        className={style.keyboard}
        style={{
          marginTop: 20 + this.props.filling,
          backgroundImage: `url(${KeyboardBackground})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Button
          backgroundColor={theme.buttonColor}
          color="grey"
          size="s0"
          top={positions.rotate.top}
          left={positions.rotate.left}
          label={`${i18n.rotation[lan]} (SPACE)`}
          active={keyboard.get("rotate")}
          ref={(c) => {
            this.dom_rotate = c;
          }}
        />
        <Button
          backgroundColor={theme.buttonColor}
          color="grey"
          size="s1"
          arrow="translate(0, 63px)"
          top={positions.drop.top}
          left={positions.drop.left}
          label={i18n.drop[lan]}
          position={theme.arrowPosition === "left"}
          positionRight={theme.arrowPosition === "right"}
          active={keyboard.get("drop")}
          ref={(c) => {
            this.dom_up = c;
          }}
        />
        <Button
          backgroundColor={theme.buttonColor}
          color="grey"
          size="s1"
          top={positions.down.top}
          left={positions.down.left}
          label={i18n.down[lan]}
          arrow="translate(0,-71px) rotate(180deg)"
          active={keyboard.get("down")}
          ref={(c) => {
            this.dom_down = c;
          }}
        />
        <Button
          backgroundColor={theme.buttonColor}
          color="grey"
          size="s1"
          top={positions.left.top}
          left={positions.left.left}
          label={i18n.left[lan]}
          arrow="translate(60px, -12px) rotate(270deg)"
          active={keyboard.get("left")}
          ref={(c) => {
            this.dom_left = c;
          }}
        />
        <Button
          backgroundColor={theme.buttonColor}
          color="grey"
          size="s1"
          top={positions.right.top}
          left={positions.right.left}
          label={i18n.right[lan]}
          arrow="translate(-60px, -12px) rotate(90deg)"
          active={keyboard.get("right")}
          ref={(c) => {
            this.dom_right = c;
          }}
        />
        <Button
          backgroundColor={theme.buttonColor}
          color="red"
          size="s2"
          top={positions.reset.top}
          left={positions.reset.left}
          label={`${i18n.reset[lan]}(R)`}
          active={keyboard.get("reset")}
          ref={(c) => {
            this.dom_r = c;
          }}
        />

        <Button
          backgroundColor={theme.buttonColor}
          color="lightgrey"
          size="s2"
          top={positions.pause.top}
          left={positions.pause.left}
          label={`${i18n.pause[lan]}(P)`}
          active={keyboard.get("pause")}
          ref={(c) => {
            this.dom_p = c;
          }}
        />
        <Button
          backgroundColor={theme.buttonColor}
          color="lightgrey"
          size="s2"
          top={positions.theme.top}
          left={positions.theme.left}
          label={`Theme(T)`}
          active={keyboard.get("theme")}
          ref={(c) => {
            this.dom_t = c;
          }}
        />
      </div>
    );
  }
}

Keyboard.propTypes = {
  filling: propTypes.number.isRequired,
  keyboard: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.get("theme"),
});

export default connect(mapStateToProps)(Keyboard);
