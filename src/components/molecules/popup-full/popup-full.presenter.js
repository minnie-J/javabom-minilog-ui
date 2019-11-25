import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Icon } from "antd";

/* ======= Constant ======= */

const HEADER_HEIGHT = "2.4rem";

/* ======= Component ======= */

/* === Styled === */

const Background = styled.div`
  display: flex;

  position: absolute;
  /* top: 0; */
  top: ${props => `${props.scrollTop}px`};
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
  /* background-color: #f2f2f2; */

  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const Wrapper = styled.div`
  /* position: absolute; */

  width: 980px;
  max-width: 980px;
  height: 100%;

  background-color: #ffffff;

  /* border: 1px solid #cccccc; */
  box-shadow: 5px 5px 10px 0px rgba(95, 95, 95, 0.3);

  box-sizing: border-box;

  z-index: 500;
`;

const Header = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};

  display: flex;
  align-items: center;

  user-select: none;
`;

const Title = styled.div`
  width: 0;
  flex-grow: 1;
  height: ${HEADER_HEIGHT};
  line-height: ${HEADER_HEIGHT};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 600;
`;

const Contents = styled.div`
  width: 100%;
  height: calc(100% - ${HEADER_HEIGHT});
`;

const PopupFull = ({ title, children, onClickClose }) => {
  const [currentScrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    // window.onbeforeunload = () => {
    //     document.documentElement.scrollTop = 0;
    //   };
    setScrollTop(document.documentElement.scrollTop);
    // console.log(document.documentElement.scrollTop);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Background scrollTop={currentScrollTop}>
      <Container>
        <Wrapper>
          <Header>
            <Title title={title}>{title}</Title>
            <Icon
              type="close"
              style={{ fontSize: "1rem", cursor: "pointer" }}
              onClick={onClickClose}
            />
          </Header>
          {/* {height ? <Contents>{children}</Contents> : children} */}
          {<Contents>{children}</Contents>}
          {/* {children} */}
        </Wrapper>
      </Container>
    </Background>
  );
};

PopupFull.defaultProps = {
  title: "",
  children: null,
  onClickClose: event => {}
};

PopupFull.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClickClose: PropTypes.func
};

export default PopupFull;
