import { Container, Content, Title, Separator } from './styled';

export default function Widget({ title, children }) {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Separator />
        {children}
      </Content>
    </Container>
  );
}