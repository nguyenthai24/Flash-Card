import Link from 'next/link';
import styled from 'styled-components';
import { ink, muted, accent, accentDark, focusRing } from '../../common/tokens';

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

export const Footer = styled.p`
  margin: 24px 0 0;
  color: ${muted};
  font-size: 14px;
  text-align: center;
`;
