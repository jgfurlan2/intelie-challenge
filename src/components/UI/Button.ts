import { shade } from 'polished';
import styled, { css } from 'styled-components';

export const Button = styled.button`
  min-height: 34px;
  min-width: 34px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 250ms ease;

  ${({ theme }) => css`
    background: ${theme.info.main};
    color: ${theme.info.contrastText};
    box-shadow: ${theme.shadow};

    :hover {
      background: ${shade(0.2, theme.info.main)};
    }
  `}
`;
