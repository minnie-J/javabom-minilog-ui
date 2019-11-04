import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const JustifiedLayout = require("justified-layout");

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const BoardWrapper = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const BoardArea = styled.div`
  width: 980px;
  max-width: 980px;

  /* height: 2000px; */

  display: flex;
  flex-direction: column;
  justify-content: center;

  /* padding: 20px; */
`;

const TopArea = styled.div`
  width: 100%;
  height: 300px;

  display: flex;
  align-items: flex-end;
  padding: 0 10px 30px 10px;
`;

const ConfigArea = styled.div`
  width: 100%;
  /* width: 960px;
  max-width: 960px; */
  height: 30px;

  /* margin: 0 10px; */
  padding: 0 10px;

  /* border-bottom: 1px solid #f2f2f2; */
  box-sizing: border-box;
`;

const ContentListArea = styled.section`
  width: 100%;
  /* height: 2000px; */

  position: relative;
  margin: 0px auto;
  /* width: 980px; */
  /* box-sizing: content-box; */
`;

const MainBoard = () => {
  const Geometries = [
    1,
    1,
    0.75,
    0.75,
    1.4,
    1,
    0.75,
    1.4,
    1.4,
    1,
    0.75,
    1.4,
    0.75
  ];

  const [state, setState] = useState({
    containerWidth: 0,
    geometry: { boxes: [] }
  });

  const listRef = useRef(null);

  useEffect(() => {
    const { width } = listRef.current.getBoundingClientRect();

    setState({
      containerWidth: width,
      geometry: JustifiedLayout(Geometries, {
        containerWidth: width,
        targetRowHeight: 240,
        targetRowHeightTolerance: 0.28
      })
    });
  }, [Geometries]);

  useEffect(() => {
    // const width = window.innerWidth - 16; // padding

    // setState({
    //   containerWidth: width,
    //   geometry: JustifiedLayout(Geometries, { containerWidth: width })
    // });
    const onResize = () => {
      // const width = window.innerWidth - 16; // padding
      const { width } = listRef.current.getBoundingClientRect();

      setState({
        containerWidth: width,
        geometry: JustifiedLayout(Geometries, {
          containerWidth: width,
          targetRowHeight: 240,
          targetRowHeightTolerance: 0.28
        })
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [Geometries]);

  let boxes = state.geometry.boxes.map((box, i) => {
    let style = {
      left: box.left,
      top: box.top,
      width: box.width,
      height: box.height,
      // background: "#B16086",
      background: "#71bdb9",
      display: "inline-block",
      // padding: "10px",
      position: "absolute"
    };

    return (
      <div key={i} style={style}>
        {/* <div key={i} style={{ ...tempSize[i], display: "inline-block" }}> */}
        {i}
      </div>
    );
  });

  return (
    <Container>
      <BoardWrapper>
        <BoardArea>
          <TopArea>카테고리 description</TopArea>
          <ConfigArea>리스트 옵션</ConfigArea>
          {/* <ContentListArea>리스트 영역</ContentListArea> */}
          <ContentListArea ref={listRef}>{boxes}</ContentListArea>
        </BoardArea>
      </BoardWrapper>
    </Container>
  );
};

export default MainBoard;
