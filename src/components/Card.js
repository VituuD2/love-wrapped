import React from "react";
import styled from "styled-components";

const CardWrap = styled.div`
  background: linear-gradient(180deg, rgba(255, 51, 51, 1), rgba(255, 56, 172, 1));
  border-radius: 10px 10px 20px 20px;
  padding: 20px;
  width: 90%;
  height: 90%;
  box-shadow: 0 6px 30px rgba(150, 80, 110, 0.12), inset 0 1px 0 rgba(255,255,255,0.6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  aspect-ratio: 9 / 16;
`;

const Header = styled.div`
  display:flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;
  gap:12px;
  padding: 50px 5px 0 5px;
`;

const Title = styled.h3`
  text-align: center;
  color: #ffffffff;
  margin: 0;
  font-size: 2.3rem;
  letter-spacing: 0.2px;

  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const CardImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const Heart = styled.span`
  font-size: 1.7rem;

  @media (max-width: 400px) {npm
    font-size: 1.2rem;
  }
`;

const Content = styled.div`
  color: #ffffffff;
  margin-top: 12px;
  font-size: 1.5rem;
  font-weight: 500;  
  text-align: center;
  padding: 20px 5px;
  white-space: pre-wrap;

  @media (max-width: 400px) {
    font-size: 0.9rem;
  }
`;

const ExtraCard = styled.p`
  font-family: "Georgia ", serif;"
  font-size: 1.2rem;
  line-height: 1.1;
  font-style: italic;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  white-space: pre-wrap;
  margin-top: 5px;
  padding: 0 15px;
`;

const DetailRow = styled.div`
  margin-top: 10px;
  display:flex;
  gap:10px;
  align-items:center;
  justify-content: space-between;
`;

const PersonBlock = styled.div`
  flex: 1;
  min-width: 0;
`;

const PersonLabel = styled.div`
  font-weight: 700;
  font-size: 1.7rem;
  color: #ffffffff;
  background-color: #ff69c0ff;
  border-radius: 5px;
`;

const PersonValue = styled.div`
  font-size: 1.5rem;
  color: #ffffffff;
  background-color: #d429ffff;
  border-radius: 5px;
  margin-top: 4px;

  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;

const ProgressOuter = styled.div`
  height: 10px;
  background: rgba(255,255,255);
  border-radius: 999px;
  overflow: hidden;
  border: solid 1px #d429ffff;
  margin-top: 8px;
  box-shadow: inset 0 -2px 6px rgba(0,0,0,0.06);
`;

const ProgressInner = styled.div`
  height: 100%;
  width: ${p=>p.width}%;
  transition: width 600ms ease;
  background: linear-gradient(90deg, #ffa0b9ff, #caa1ffff);
`;

const WinnerText = styled.div`
  margin-top:8px;
  font-weight: 700;
  color: #ffffffff;
`;

// small util to show two-column progress layout
const TwoCol = ({leftLabel, leftValue, leftPct, rightLabel, rightValue, rightPct}) => (
  <>
    <DetailRow>
      <PersonBlock>
        <PersonLabel>{leftLabel}</PersonLabel>
        <PersonValue>{leftValue} • {leftPct}%</PersonValue>
        <ProgressOuter><ProgressInner width={leftPct} /></ProgressOuter>
      </PersonBlock>
      <div style={{width:12}} />
      <PersonBlock>
        <PersonLabel style={{textAlign:'right'}}>{rightLabel}</PersonLabel>
        <PersonValue style={{textAlign:'right'}}>{rightValue} • {rightPct}%</PersonValue>
        <ProgressOuter style={{direction:'rtl'}}><ProgressInner width={rightPct} /></ProgressOuter>
      </PersonBlock>
    </DetailRow>
  </>
);

export default function Card({card}) {
  return (
    <CardWrap>
      <Header>
        <Heart>💖</Heart>
        <Title>{card.title}</Title>
      </Header>

      <Content>
        {card.personImage && <CardImage src={card.personImage} alt={card.title} />}
        {card.description && <div>{card.description}</div>}

        {card.details &&
          card.details.map((d, idx) => (
            <DetailRow key={idx}>
              <PersonBlock>
                <PersonLabel>{d.label}</PersonLabel>
                <PersonValue>{d.value}{d.pct ? ` • ${d.pct}%` : ""}</PersonValue>
              </PersonBlock>
              {d.pct !== undefined && (
                <div style={{flexBasis: "35%", display: "flex", alignItems: "center"}}>
                  <ProgressOuter style={{width: "100%"}}>
                    <ProgressInner width={d.pct} />
                  </ProgressOuter>
                </div>
              )}
            </DetailRow>
          ))}

        {card.leftLabel && card.rightLabel && (
          <TwoCol
            leftLabel={card.leftLabel}
            leftValue={card.leftValue}
            leftPct={card.leftPct}
            rightLabel={card.rightLabel}
            rightValue={card.rightValue}
            rightPct={card.rightPct}
          />
        )}

        {card.winner && <WinnerText>🏆 {card.winner} ganhou aqui!</WinnerText>}

        {card.extra && (
          <ExtraCard>
            {typeof card.extra === 'string' ? (
              card.extra
            ) : (
              <>{card.extra.part1}<strong>{card.extra.boldPart}</strong>{card.extra.part2}</>
            )}
          </ExtraCard>
        )}
      </Content>
    </CardWrap>
  );
}
