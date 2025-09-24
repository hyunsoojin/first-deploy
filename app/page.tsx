import Image from "next/image";
import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    overflow-x: hidden;
  }
`;

// Animations
const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const BackgroundWrapper = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
`;

const Header = styled.header`
  text-align: center;
  color: white;
  margin-bottom: 40px;
  padding: 60px 0;
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: ${fadeInDown} 1s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 30px;
  animation: ${fadeInUp} 1s ease-out 0.3s both;
`;

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  animation: ${fadeInUp} 1s ease-out 0.6s both;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  background: rgba(255,255,255,0.2);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const MainContent = styled.main`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-bottom: 40px;
  animation: ${fadeInUp} 1s ease-out 0.9s both;
`;

const Section = styled.section`
  padding: 40px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 30px;
  position: relative;
  padding-bottom: 10px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 2px;
  }
`;

const IntroText = styled.p`
  font-size: 1.1rem;
  text-align: center;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
`;

const ExperienceItem = styled.div`
  margin-bottom: 40px;
  padding: 30px;
  border-left: 4px solid #667eea;
  background: #f8f9ff;
  border-radius: 0 10px 10px 0;
  transition: all 0.3s ease;
  animation: ${slideInLeft} 0.6s ease-out;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const JobInfo = styled.div``;

const JobTitle = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
`;

const Company = styled.div`
  font-size: 1.1rem;
  color: #667eea;
  font-weight: 600;
`;

const Duration = styled.div`
  color: #888;
  font-size: 0.95rem;
  background: #e8ecff;
  padding: 5px 12px;
  border-radius: 15px;
`;

const ProjectList = styled.div`
  margin-top: 20px;
`;

const ProjectItem = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
`;

const ProjectTitle = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const ProjectDescription = styled.div`
  color: #666;
  margin-bottom: 10px;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const TechTag = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;

const SkillItem = styled.div`
  background: #f8f9ff;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  color: #333;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
    background: #e8ecff;
  }
`;

const EducationItem = styled.div`
  padding: 25px;
  background: #f8f9ff;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const EducationTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const EducationDetails = styled.div`
  color: #666;
`;

const AwardItem = styled.div`
  padding: 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 10px;
  margin-bottom: 15px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  }
`;

const AwardTitle = styled.div`
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`;

const AwardDate = styled.div`
  color: #888;
  font-size: 0.9rem;
`;

export default function Home() {
  
  useEffect(() => {
      
  }, []);

  

  return (
    <>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </main>
      </div>
    </>
    
  );
}
