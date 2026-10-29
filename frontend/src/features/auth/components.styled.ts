import Link from 'next/link';
import styled, { css } from 'styled-components';

const ink = '#24231f';
const muted = '#6b675e';
const accent = '#9fbd91';
const accentDark = '#5f7d53';
const danger = '#b94b3c';

const focusRing = css`
  outline: 3px solid ${accentDark};
  outline-offset: 2px;
`;

export const Page = styled.div`
  --heading: var(--font-auth-heading), 'Be Vietnam Pro', sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  color: ${ink};
  font-family: var(--font-auth-body), system-ui, sans-serif;
  background-color: #f5f2e7;
  background-image: linear-gradient(90deg, rgba(200, 192, 171, 0.3) 1px, transparent 1px),
    linear-gradient(rgba(200, 192, 171, 0.3) 1px, transparent 1px);
  background-size: 32px 32px;
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: 32px;
  }

  .mantine-Input-input {
    height: 48px;
    min-height: 48px;
    border: 1.5px solid #cfc8b5;
    border-radius: 10px;
    background: #fff;
    color: ${ink};
    font-family: inherit;
    font-size: 16px;
    transition: border-color 0.15s, box-shadow 0.15s;
  }

  .mantine-Input-input::placeholder {
    color: #9b968a;
  }

  .mantine-Input-input:hover {
    border-color: #a9a28d;
  }

  .mantine-Input-input:focus,
  .mantine-Input-input:focus-within {
    border-color: ${ink};
    box-shadow: 0 0 0 4px rgba(159, 189, 145, 0.55);
  }

  .mantine-Input-input[data-error] {
    border-color: ${danger};
  }

  .mantine-Input-input[data-error]:focus,
  .mantine-Input-input[data-error]:focus-within {
    box-shadow: 0 0 0 4px rgba(185, 75, 60, 0.2);
  }

  .mantine-PasswordInput-innerInput {
    height: 45px;
    border: 0;
    box-shadow: none;
    background: transparent;
  }

  .mantine-InputWrapper-label {
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 600;
  }

  .mantine-InputWrapper-error,
  .mantine-InputWrapper-description {
    margin-top: 6px;
    font-size: 13px;
  }

  .mantine-InputWrapper-error {
    color: ${danger};
    font-weight: 600;
  }

  .mantine-InputWrapper-description {
    color: ${muted};
  }

  .mantine-PasswordInput-visibilityToggle {
    width: auto;
    min-width: 56px;
    height: 36px;
    margin: 4px;
    padding: 0 10px;
    border-radius: 8px;
    color: ${accentDark};
    font-size: 14px;
    font-weight: 700;
  }

  .mantine-PasswordInput-visibilityToggle:hover {
    background: #e2ecdc;
  }

  .mantine-Checkbox-input:checked {
    border-color: ${accentDark};
    background: ${accentDark};
  }

  .mantine-Checkbox-input:focus-visible,
  .mantine-Button-root:focus-visible,
  .mantine-PasswordInput-visibilityToggle:focus-visible {
    ${focusRing}
  }

  .auth-primary:hover:not([data-disabled]) {
    background: #b2cba8 !important;
    transform: translate(-1px, -1px);
    box-shadow: 4px 5px 0 ${ink} !important;
  }

  .auth-primary[data-disabled] {
    border-color: #cfc8b5 !important;
    background: #ece8d8 !important;
    box-shadow: none !important;
    color: #8a8578 !important;
    cursor: not-allowed;
  }

  .auth-social:hover {
    border-color: ${ink} !important;
    background: #faf8ef !important;
  }

  .auth-social-label {
    @media (max-width: 420px) {
      display: none;
    }
  }
`;

export const Brand = styled(Link)`
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: var(--heading);
  font-size: 24px;
  font-weight: 800;
  color: ${ink};
  text-decoration: none;

  &:focus-visible {
    ${focusRing}
    border-radius: 8px;
  }
`;

export const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1.5px solid ${ink};
  border-radius: 8px;
  background: ${accent};
  box-shadow: 2px 3px 0 ${ink};
  transform: rotate(-4deg);
`;

export const Sheet = styled.main`
  position: relative;
  display: grid;
  width: 100%;
  max-width: 1080px;
  margin: auto;
  overflow: hidden;
  border: 1.5px solid #c8c0ab;
  border-radius: 18px 26px 20px 28px;
  background: #fffdf5;
  box-shadow: 5px 6px 0 #d9d3c3;

  @media (min-width: 900px) {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

export const Aside = styled.aside`
  display: none;
  padding: 48px 40px;
  background-color: #f8f2d8;
  background-image: linear-gradient(rgba(159, 189, 145, 0.3) 1px, transparent 1px);
  background-size: 100% 30px;
  border-right: 1.5px dashed #c8c0ab;

  @media (min-width: 900px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
  }
`;

export const Kicker = styled.span`
  align-self: flex-start;
  padding: 4px 12px;
  border: 1.5px solid ${ink};
  border-radius: 999px;
  background: #fffdf5;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transform: rotate(-1.5deg);
`;

export const AsideTitle = styled.p`
  margin: 0;
  font-family: var(--heading);
  font-size: 42px;
  font-weight: 800;
  line-height: 1.1;

  span {
    background: linear-gradient(transparent 62%, #f3dd7a 62%, ${accent} 92%, transparent 92%);
  }
`;

export const WordCard = styled.div`
  position: relative;
  max-width: 280px;
  padding: 20px;
  border: 1.5px solid ${ink};
  border-radius: 14px;
  background: #fffdf5;
  box-shadow: 4px 5px 0 ${ink};
  transform: rotate(-3deg);

  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    width: 72px;
    height: 22px;
    background: rgba(243, 221, 122, 0.8);
    transform: translateX(-50%) rotate(3deg);
  }

  strong {
    display: block;
    font-family: var(--heading);
    font-size: 28px;
  }

  small {
    display: block;
    margin-top: 2px;
    color: ${muted};
    font-size: 14px;
  }

  span {
    display: block;
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px dashed #c8c0ab;
    font-size: 15px;
  }
`;

export const AsideNote = styled.p`
  margin: 0;
  color: ${muted};
  font-size: 15px;
`;

export const Panel = styled.section`
  position: relative;
  padding: 32px 20px 28px 36px;
  background-image: linear-gradient(90deg, transparent 24px, rgba(217, 120, 104, 0.35) 24px 25px, transparent 25px);

  @media (min-width: 640px) {
    padding: 48px 56px 40px 64px;
    background-image: linear-gradient(90deg, transparent 40px, rgba(217, 120, 104, 0.35) 40px 41px, transparent 41px);
  }
`;

export const PanelInner = styled.div`
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
`;

export const Eyebrow = styled.p`
  margin: 0 0 4px;
  color: ${accentDark};
  font-size: 14px;
  font-weight: 700;
`;

export const Title = styled.h1`
  margin: 0;
  font-family: var(--heading);
  font-size: 34px;
  font-weight: 800;
  line-height: 1.15;
`;

export const Intro = styled.p`
  margin: 8px 0 24px;
  color: ${muted};
  font-size: 15px;
  line-height: 1.6;
`;

export const Form = styled.form`
  display: grid;
  gap: 18px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const TextLink = styled(Link)`
  color: ${accentDark};
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: ${ink};
  }

  &:focus-visible {
    ${focusRing}
    border-radius: 4px;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${muted};
  font-size: 13px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px dashed #c8c0ab;
  }
`;

export const SocialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const Footer = styled.p`
  margin: 24px 0 0;
  color: ${muted};
  font-size: 14px;
  text-align: center;
`;

export const Strength = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
`;

export const StrengthBar = styled.span<{ $on: boolean }>`
  height: 5px;
  border-radius: 3px;
  background: ${({ $on }) => ($on ? accent : '#e4dfcf')};
`;

export const Requirements = styled.ul`
  display: grid;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 13px;
`;

export const Requirement = styled.li<{ $met: boolean }>`
  color: ${({ $met }) => ($met ? accentDark : muted)};
  font-weight: ${({ $met }) => ($met ? 600 : 400)};
`;

export const Stack = styled.div`
  display: grid;
  gap: 16px;
`;
