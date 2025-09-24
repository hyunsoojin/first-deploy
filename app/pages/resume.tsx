"use client";

import Image from "next/image";
import { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import axios from "axios";

// 타입 정의
interface Project {
  title: string;
  description: string;
  tags: string[];
}

interface Experience {
  company: string;
  title: string;
  duration: string;
  projects?: Project[];
  description?: string;
  tags?: string[];
}

interface Award {
  title: string;
  date: string;
}

interface Education {
  title: string;
  department: string;
  details: string;
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

function Resume() {
  
  const [name, setName] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [experienceData, setExperienceData] = useState<Experience[]>([]);
  const [skillsData, setSkillsData] = useState<string[]>([]);
  const [awardsData, setAwardsData] = useState<Award[]>([]);
  const [email, setEmail] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [educationData, setEducationData] = useState<Education[]>([]);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/hyunsoojin/first-deploy/refs/heads/0.3/general_info/service/resume_general_info_service.json"
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data; // JSON.parse() 제거 - axios가 이미 파싱함
        console.log(data);
        setName(data.name || "");
        setSubtitle(data.subtitle || "");
        setExperienceData(data.experienceData || []);
        setSkillsData(data.skillsData || []);
        setAwardsData(data.awardsData || []);
        setEmail(data.email || "");
        setGithub(data.github || "");
        setEducationData(data.educationData || []);
      })
      .catch((error) => {
        console.error("Error fetching resume data:", error);
      });
  }, []);

  

  return (
    <>
      <GlobalStyle />
      <BackgroundWrapper>
        <Container>
          {/* Header */}
          <Header>
            <MainTitle>{name}</MainTitle>
            <Subtitle>{subtitle}</Subtitle>
            <ContactLinks>
              <ContactLink href={`mailto:${email}`}>📧 Email</ContactLink>
              <ContactLink href={`${github}`} target="_blank">💻 GitHub</ContactLink>
            </ContactLinks>
          </Header>

          {/* Main Content */}
          <MainContent>
            {/* About Section */}
            <Section>
              <SectionTitle>About Me</SectionTitle>
              <IntroText>
                운영, 개발 모든 요소에 있어서 가리지 않고 최선을 다하는 개발자입니다.<br/>
                기술적으로 부족한 부분에 대해서 스터디와 교육과정 이수, 온라인 강의 등을 통해<br/>
                기술력을 높이는 데에도 힘쓰고 있습니다.
              </IntroText>
            </Section>

            {/* Experience Section */}
            <Section>
              <SectionTitle>Work Experience</SectionTitle>
              {experienceData.map((exp, index) => (
                <ExperienceItem key={index}>
                  <ExperienceHeader>
                    <JobInfo>
                      <JobTitle>{exp.title}</JobTitle>
                      <Company>{exp.company}</Company>
                    </JobInfo>
                    <Duration>{exp.duration}</Duration>
                  </ExperienceHeader>
                  
                  {exp.projects ? (
                    <ProjectList>
                      {exp.projects.map((project, pIndex) => (
                        <ProjectItem key={pIndex}>
                          <ProjectTitle>{project.title}</ProjectTitle>
                          <ProjectDescription>{project.description}</ProjectDescription>
                          <TechTags>
                            {project.tags.map((tag, tIndex) => (
                              <TechTag key={tIndex}>{tag}</TechTag>
                            ))}
                          </TechTags>
                        </ProjectItem>
                      ))}
                    </ProjectList>
                  ) : (
                    <>
                      <ProjectDescription>{exp.description}</ProjectDescription>
                      <TechTags>
                        {exp.tags?.map((tag, tIndex) => (
                          <TechTag key={tIndex}>{tag}</TechTag>
                        ))}
                      </TechTags>
                    </>
                  )}
                </ExperienceItem>
              ))}
            </Section>

            {/* Skills Section */}
            <Section>
              <SectionTitle>Technical Skills</SectionTitle>
              <SkillsGrid>
                {skillsData.map((skill, index) => (
                  <SkillItem key={index}>{skill}</SkillItem>
                ))}
              </SkillsGrid>
            </Section>

            {/* Education Section */}
            {educationData.map((edu, index) => (
                <Section key={index}>
                    <SectionTitle>Education</SectionTitle>
                    <EducationItem>
                        <EducationTitle>{edu.title}</EducationTitle>
                        <EducationDetails>{edu.department}</EducationDetails>
                        <EducationDetails>{edu.details}</EducationDetails>
                    </EducationItem>
                </Section>
            ))}

            {/* Awards & Certifications Section */}
            <Section>
              <SectionTitle>Awards & Certifications</SectionTitle>
              {awardsData.map((award, index) => (
                <AwardItem key={index}>
                  <AwardTitle>{award.title}</AwardTitle>
                  <AwardDate>{award.date}</AwardDate>
                </AwardItem>
              ))}
            </Section>
          </MainContent>
        </Container>
      </BackgroundWrapper>
    </>
    
  );
}

export default Resume;