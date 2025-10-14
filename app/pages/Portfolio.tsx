"use client";

import { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import axios from "axios";
import Link from 'next/link';

// 타입 정의
interface PortfolioItem {
  title: string;
  summary: string;
  url: string;
}

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

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  background: rgba(255,255,255,0.2);
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.3);
  transition: all 0.3s ease;
  font-weight: 500;
  animation: ${fadeInUp} 1s ease-out 0.6s both;

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

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioCard = styled.div`
  background: #f8f9ff;
  border-radius: 15px;
  padding: 30px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;
  animation: ${slideInLeft} 0.6s ease-out;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    background: #e8ecff;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    opacity: 0.1;
    border-radius: 0 15px 0 60px;
  }
`;

const PortfolioTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
`;

const PortfolioSummary = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const PortfolioLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 25px;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.2);
    border-color: #667eea;
    transform: translateX(5px);
  }

  &:active {
    transform: translateX(2px);
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #667eea;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/hyunsoojin/first-deploy/refs/heads/main/service/resume_portfolio_service.json"
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setPortfolioData(data.portfolio || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        setError("포트폴리오 데이터를 불러오는데 실패했습니다.");
        setLoading(false);
      });
  }, []);

  return (
    <>
      <GlobalStyle />
      <BackgroundWrapper>
        <Container>
          {/* Header */}
          <Header>
            <MainTitle>Portfolio</MainTitle>
            <Subtitle>제가 작업한 프로젝트들을 소개합니다</Subtitle>
            <BackButton href="/">
              ← 메인으로 돌아가기
            </BackButton>
          </Header>

          {/* Main Content */}
          <MainContent>
            <Section>
              <SectionTitle>프로젝트</SectionTitle>
              
              {loading ? (
                <LoadingSpinner>
                  포트폴리오 데이터를 불러오는 중...
                </LoadingSpinner>
              ) : error ? (
                <EmptyState>
                  <p>{error}</p>
                </EmptyState>
              ) : portfolioData.length === 0 ? (
                <EmptyState>
                  <p>아직 등록된 프로젝트가 없습니다.</p>
                </EmptyState>
              ) : (
                <PortfolioGrid>
                  {portfolioData.map((item, index) => (
                    <PortfolioCard key={index}>
                      <PortfolioTitle>{item.title}</PortfolioTitle>
                      <PortfolioSummary>{item.summary}</PortfolioSummary>
                      <PortfolioLink 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <span>🔗</span>
                        프로젝트 보기
                      </PortfolioLink>
                    </PortfolioCard>
                  ))}
                </PortfolioGrid>
              )}
            </Section>
          </MainContent>
        </Container>
      </BackgroundWrapper>
    </>
  );
};

export default Portfolio;