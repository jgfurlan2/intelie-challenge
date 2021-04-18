import styled from 'styled-components';

export const HomePageContainer = styled.div`
  width: 100%;

  position: relative;
  display: grid;

  grid-template-areas: 'HD' 'TA' 'CH' 'FT';
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr 1fr 64px;

  gap: 5px;
`;

export const HomeHeader = styled.div`
  grid-area: HD;

  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  font-weight: bold;
  font-size: 30px;

  background-color: ${({ theme }) => theme.secondary.main};
`;

export const HomeTextAreaContainer = styled.div`
  grid-area: TA;
  width: 100%;

  textarea {
    resize: vertical;
    width: 100%;
    height: 100%;
  }
`;

export const HomeChartContainer = styled.div`
  grid-area: CH;
  width: 100%;
`;

export const HomeFooter = styled.div`
  grid-area: FT;
  width: 100%;
  padding: 15px;
  background: ${({ theme }) => theme.primary.main};
`;
