import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0px 25px;
`;

Form.Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  margin-left: 10px;
`;

Form.Input = styled.input`
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 5px 8px;
  border: solid 1px #CCCCCC;
  font-size: 20px;
`;

Form.Button = styled.button`
  background-color: #2d80c4;
  cursor: pointer;
  margin: 10px;
  padding: 5px;
  border: solid 1px #ccc;
  font-size: 20px;
  text-decoration: none;
  color: white;
`;

Form.Button.Warning = styled(Form.Button)`
  background-color: #ea3131;
`;

Form.Button.Ok = styled(Form.Button)`
  background-color: #1baa1b;
`;

Form.Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

Form.Alert = styled.div`
  display: flex;
  color: red;
  align-self: center;
`;