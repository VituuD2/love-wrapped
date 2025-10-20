import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Card from './Card';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import sound from '../files/dwas.mp3';

const StoryViewerContainer = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StoryWrapper = styled.div`
  position: relative;
  height: 95vh; /* Ocupa 95% da altura da tela */
  max-height: 95vh;
  aspect-ratio: 9 / 16;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  position: absolute;
  top: 27px; /* Distância do topo */
  width: 95%; /* Alinha com o conteúdo do card */
  display: flex;
  padding: 0 10px;
  gap: 5px;
  box-sizing: border-box;
  z-index: 10; /* Garante que fique sobre o card */
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 3px;
  background: rgba(255, 255, 255, 0.5);
`;

const fill = keyframes`
  from { width: 0% }
  to { width: 100% }
`;

const Progress = styled.div`
  height: 100%;
  background: white;
  animation: ${fill} 5s linear;
`;

const NavigationArea = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  cursor: pointer;
`;

const NextArea = styled(NavigationArea)`
  right: 0;
`;

const PrevArea = styled(NavigationArea)`
  left: 0;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 2px;
  right: 15px;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 1001;
`;

const PauseIcon = styled.div`
  position: absolute;
  top: 13px;
  right: 50px;
  font-size: 17px;
  color: white;
  cursor: pointer;
  z-index: 1001;
`;

const StoryViewer = ({ stories, startIndex, hasInteracted, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isPaused, setIsPaused] = useState(false);

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));

  // const [hasInteracted, setHasInteracted] = useState(false);

  const bind = useDrag(
    ({ down, movement: [mx, my], velocity: [vx, vy], direction: [xDir, yDir] }) => {
      if (Math.abs(mx) > 100 && !down) {
        if (xDir > 0) {
          handlePrev();
        } else {
          handleNext();
        }
      } else if (my > 200 && !down) {
        onClose();
      } else {
        api.start({ y: down ? my : 0, x: down ? mx : 0, immediate: down });
      }
    }
  );

  const audioRef = useRef(null);

  useEffect(() => {
    if (hasInteracted) {
      const audio = audioRef.current;
      if (audio) {
        audio.volume = 0;
        audio.play();
        let fadein = setInterval(() => {
          if (audio.volume < 0.5) {
            audio.volume += 0.05;
          } else {
            clearInterval(fadein);
          }
        }, 100);
      }

      return () => {
        if (audio) {
          let fadeout = setInterval(() => {
            if (audio.volume > 0.05) {
              audio.volume -= 0.05;
            } else {
              audio.pause();
              clearInterval(fadeout);
            }
          }, 100);
        }
      };
    }
  }, [hasInteracted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (isPaused) {
        audio.pause();
      } else {
        audio.play();
      }
    }
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      if (currentIndex < stories.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onClose();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, stories.length, onClose, isPaused]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const currentStory = stories[currentIndex];

  return (
    <StoryViewerContainer
      style={{ background: y.to([0, 500], ['rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 0)']) }}
      onMouseDown={() => setIsPaused(true)}
      onMouseUp={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <audio ref={audioRef} src={sound} />
      <CloseIcon onClick={onClose}>&times;</CloseIcon>
      <PauseIcon onClick={() => setIsPaused(!isPaused)}>{isPaused ? "▶" : "❚❚"}</PauseIcon>
      <animated.div {...bind()} style={{ x, y }}>
        <StoryWrapper>
          <ProgressBarContainer>
            {stories.map((_, index) => (
              <ProgressBar key={index}>
                {index === currentIndex && <Progress style={{ animationPlayState: isPaused ? 'paused' : 'running' }} />}
                {index < currentIndex && <div style={{ width: '100%', height: '100%', background: 'white' }} />}              </ProgressBar>
            ))}
          </ProgressBarContainer>
          <Card card={currentStory} />
          <PrevArea onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
          <NextArea onClick={(e) => { e.stopPropagation(); handleNext(); }} />
        </StoryWrapper>
      </animated.div>
    </StoryViewerContainer>
  );
};

export default StoryViewer;
