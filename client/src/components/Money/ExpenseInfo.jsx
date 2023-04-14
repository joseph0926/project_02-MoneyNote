import styled from "styled-components";

const ExpenseInfo = ({ icon, text, expenseAmount = null }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
      <span className="amount">{expenseAmount}</span>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
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

  .amount {
  }
`;

export default ExpenseInfo;
