// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import pic1 from "./files/pic1.png";
import Card from "./components/Card";
import StoryViewer from "./components/StoryViewer";

// ----------------------
// Data computed from _chat.txt (17/02/2025 - 20/10/2025)
// ----------------------
const stats = {
  totalMessages: 32441,
  perPerson: {
    Lorena: 17741,
    João: 14700,
  },
  teAmo: { Lorena: 232, João: 243 },
  audios: { Lorena: 354, João: 375 },
  stickers: { Lorena: 584, João: 526 },
  images: { Lorena: 362, João: 336 },
  apologies: { Lorena: 70, João: 87 },
  firstDate: "17/02/2025",
  daysSinceFirst: 244,
  daysWithMessages: 238,
  longestConsecutiveDays: 89,
  currentConsecutiveDays: 1,
  startersPerDay: { Lorena: 96, João: 142 },
};

// small helpers for percentages
const pct = (a, b) => {
  const tot = a + b;
  return tot === 0 ? 0 : Math.round((a / tot) * 100);
};

// Card dataset matching your template (cards 1-14)
const cards = [
  {
    id: 1,
    title: "Vamos ver nossa retrospectiva ? 💞",
    description: "",
    personImage: pic1,
  },
  {
    id: 2,
    title: 'Quem mais mandou "Te amo" ?',
    description: "",
    leftLabel: "Lorena",
    leftValue: stats.teAmo.Lorena,
    leftPct: pct(stats.teAmo.Lorena, stats.teAmo.João),
    rightLabel: "João",
    rightValue: stats.teAmo.João,
    rightPct: pct(stats.teAmo.João, stats.teAmo.Lorena),
    winner: stats.perPerson.Lorena < stats.perPerson.João ? "Lorena" : "João",
  },
  {
    id: 3,
    title: "Nos trocamos muitas mensagens :0",
    description: "Vamos ver quantas...",
  },
  {
    id: 4,
    title: "Quantas mensagens nos trocamos?",
    description: `Total: ${stats.totalMessages}`,
    details: [
      { label: "Lorena", value: stats.perPerson.Lorena },
      { label: "João", value: stats.perPerson.João },
    ],
    winner: stats.perPerson.Lorena > stats.perPerson.João ? "Lorena" : "João",
  },
  {
    id: 5,
    title: "Vamos ver quantos dias seguidos nós conversamos 🤔",
    description: "",
  },
  {
    id: 6,
    title: `Nos conversamos ${stats.longestConsecutiveDays} dias seguidos 🔥`,
    description: `Atualmente: ${stats.currentConsecutiveDays} dias seguidos`,
  },
  {
    id: 7,
    title: "Quem mais pede desculpas?",
    description: "Vamos descobrir?",
  },
  {
    id: 8,
    title: "Desculpas",
    details: [
      { label: "Lorena", value: stats.apologies.Lorena },
      { label: "João", value: stats.apologies.João },
    ],
    winner: stats.apologies.João > stats.apologies.Lorena ? "João" : "Lorena",
  },
  {
    id: 9,
    title: "Quem mais manda áudio?",
    description: "Vamos descobrir?",
  },
  {
    id: 10,
    title: "Áudios",
    details: [
      { label: "Lorena", value: stats.audios.Lorena },
      { label: "João", value: stats.audios.João },
    ],
    winner: stats.audios.João > stats.audios.Lorena ? "João" : "Lorena",
  },
  {
    id: 11,
    title: "Quando tudo começou?",
    description: `${stats.firstDate} — data especial 💌`,
  },
  {
    id: 12,
    title: "Quem começa mais as conversas ?",
    description: "vamos ver?",
  },
  {
    id: 13,
    title: "Iniciou as conversas",
    details: [
      { label: "Lorena", value: stats.startersPerDay.Lorena, pct: Math.round((stats.startersPerDay.Lorena / stats.daysWithMessages) * 100) },
      { label: "João", value: stats.startersPerDay.João, pct: Math.round((stats.startersPerDay.João / stats.daysWithMessages) * 100) },
    ],
    winner: stats.startersPerDay.João > stats.startersPerDay.Lorena ? "João" : "Lorena",
  },
  {
    id: 14,
    title: "Mensagem especial de João para Lorena",
    extra: {
      part1: `“A pior coisa que poderia\nme acontecer, seria acordar\ne não estar com você.\n\nVocê é a melhor parte dos meus dias,o motivo do meu sorriso e a calma\nque eu nem sabia que podia ter.\n\nTe ter ao meu lado faz tudo valer a pena.\n`,
      boldPart: "\nEu te Amo!",
      part2: "”",
    },
  },
];

// ---------- Styled layout ----------
const Page = styled.div`
  min-height: 100vh;
  padding: 40px;
  background: radial-gradient(1200px 600px at 10% 10%, #fff5f8 0%, #f4f1ff 25%, #fffef6 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  width: 100%;
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Heading = styled.h1`
  color: #b45d73;
  margin-bottom: 8px;
  font-size: 36px;
`;

const Sub = styled.p`
  color: #7a6b7c;
  margin-bottom: 24px;
`;

export default function App() {
  const [storyViewer, setStoryViewer] = useState({ open: false, startIndex: 0, hasInteracted: false });

  const AppContent = () => (
    <Page>
      <Heading>Nossa Retrospectiva ✨</Heading>
      <Grid>
        <div onClick={() => setStoryViewer({ open: true, startIndex: 0, hasInteracted: true })}>
          <Card card={cards[0]} />
        </div>
      </Grid>

      {storyViewer.open && (
        <StoryViewer
          stories={cards}
          startIndex={storyViewer.startIndex}
          hasInteracted={storyViewer.hasInteracted}
          onClose={() => setStoryViewer({ open: false, startIndex: 0, hasInteracted: false })}
        />
      )}
      <Sub>v1.0.5</Sub>
    </Page>
  );

  return (
    <Router basename="/love-wrapped">
      <Routes>
        <Route path="/" element={<AppContent />} />
      </Routes>
    </Router>
  );
}
