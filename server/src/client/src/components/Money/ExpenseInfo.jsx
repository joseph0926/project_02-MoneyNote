import styled from "styled-components";

const ExpenseInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      font-size: 1.25rem;
    }
  }
  .text {
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
  }
`;

export default ExpenseInfo;
