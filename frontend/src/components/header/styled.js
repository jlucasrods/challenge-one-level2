import styled from 'styled-components';
import logo from '../../assets/logo.png'

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
  padding: 0 20px 0 20px;
`;

export const Logo = styled.img.attrs({
  src: logo
})`
  width: 300px;
`;