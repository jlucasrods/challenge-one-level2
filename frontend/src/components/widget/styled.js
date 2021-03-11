import styled from 'styled-components';
import background from '../../assets/background.png';

export const Container = styled.main`
  position: absolute;
  top: 75px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 30px;
  display: flex;
  overflow: auto;
  background-image: url(${background});
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  background-color: #FFFFFF;
  box-shadow: 0px 0px 5px #BBBBBB;
  padding: 20px 20px;
  display: flex;
`;

export const Title = styled.h1`
  height: 40px;
  margin: auto;
  color: #004C71; 
`;

export const Separator = styled.hr`
  margin: 5px 0px 15px 0px;
  border: solid 1px #CCCCCC;
`;