import styled from "styled-components";
import { EditFilled, DeleteFilled, SaveFilled } from "@ant-design/icons";

const HEADER_HEIGHT = "2.4rem";

const BackDrop = styled.div`
  position: absolute;
  display: flex;

  top: ${props => `${props.scrollTop}px`};
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);

  z-index: 100;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const Wrapper = styled.div`
  width: 980px;
  max-width: 980px;
  height: 100%;

  background-color: #ffffff;

  box-shadow: 5px 5px 10px 0px rgba(95, 95, 95, 0.3);

  box-sizing: border-box;

  z-index: 500;
`;

const HeaderArea = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT};

  display: flex;
  align-items: center;

  user-select: none;

  padding: 0.8rem 0.8rem 0.4rem 0.8rem;
`;

const PopupTitle = styled.div`
  width: 0;
  flex-grow: 1;
  height: ${HEADER_HEIGHT};
  line-height: ${HEADER_HEIGHT};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 600;
`;

const ContentArea = styled.div`
  width: 100%;
  height: calc(100% - ${HEADER_HEIGHT});
`;

const EditorContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const ArticleMetaArea = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const EditorArea = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SaveIcon = styled(SaveFilled)`
  font-size: 1.2rem;
  margin-right: 0.8rem;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const EditIcon = styled(EditFilled)`
  font-size: 1.2rem;
  margin-right: 0.6rem;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const DeleteIcon = styled(DeleteFilled)`
  font-size: 1.2rem;
  margin-right: 0.8rem;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

export {
  BackDrop,
  Container,
  Wrapper,
  HeaderArea,
  PopupTitle,
  ContentArea,
  EditorContainer,
  ArticleMetaArea,
  EditorArea,
  MetaContainer,
  EditIcon,
  DeleteIcon,
  SaveIcon
};
