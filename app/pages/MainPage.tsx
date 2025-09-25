"use client";

import Image from 'next/image';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

// 애니메이션 정의
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// 스타일 컴포넌트
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ProfileSection = styled.div`
  text-align: center;
  animation: ${fadeInUp} 1s ease-out;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 30px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${float} 3s ease-in-out infinite;
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const ProfileImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 15px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  animation: ${fadeInUp} 1s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  animation: ${fadeInUp} 1s ease-out 0.4s both;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const NavigationLinks = styled.div`
  display: flex;
  gap: 30px;
  animation: ${fadeInUp} 1s ease-out 0.6s both;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const NavLink = styled(Link)`
  padding: 15px 30px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const Icon = styled.span`
  font-size: 1.2rem;
`;

const MainPage = () => {
    return (
        <Container>
            <ProfileSection>
                <ProfileImageWrapper>
                    <ProfileImage
                        src="/hyunsoojin.jpg"
                        alt="Profile Picture"
                        fill
                        priority
                    />
                </ProfileImageWrapper>
                
                <Title>안녕하세요, Jinny입니다</Title>
                <Subtitle>안정적인 웹 서비스를 개발하는 백엔드 개발자</Subtitle>
                
                <NavigationLinks>
                    <NavLink href="/portfolio">
                        <Icon>💼</Icon>
                        Portfolio
                    </NavLink>
                    <NavLink href="/resume">
                        <Icon>📄</Icon>
                        Resume
                    </NavLink>
                </NavigationLinks>
            </ProfileSection>
        </Container>
    );
};

export default MainPage;