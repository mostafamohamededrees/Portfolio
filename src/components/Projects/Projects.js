import React, { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  CardContainer,
} from "./ProjectStyle";
import { projects } from "../../data/constant";
import ProjectCard from "../Cards/ProjectCard";
export default function Projects({ openModal, setOpenModal }) {
  const [toggle, setToggle] = useState("all");
  const optionToggle = ["all", "react", "js", "html & css"];
  const handleToggle = (option) => {
    setToggle(option);
  };
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
          I have worked on a wide range of projects. From web apps . Here are
          some of my projects.
        </Desc>
        <ToggleButtonGroup>
          {optionToggle.map((option, index) => {
            return (
              <React.Fragment key={index}>
                {toggle === option ? (
                  <ToggleButton
                    active
                    value={option}
                    onClick={() => handleToggle(option)}
                  >
                    {option.toUpperCase()}
                  </ToggleButton>
                ) : (
                  <ToggleButton
                    value={option}
                    onClick={() => handleToggle(option)}
                  >
                    {option.toUpperCase()}
                  </ToggleButton>
                )}

                {optionToggle.indexOf(option) !== optionToggle.length - 1 && (
                  <Divider />
                )}
              </React.Fragment>
            );
          })}
        </ToggleButtonGroup>

        <CardContainer>
          {(toggle === "all"
            ? projects
            : projects.filter((project) => project.category === toggle)
          ).map((project, index) => {
            return (
              <ProjectCard
                key={index}
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            );
          })}

          {/* {toggle === "all" &&
            projects.map((project) => (
              <ProjectCard
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ))}
          {projects
            .filter((item) => item.category == toggle)
            .map((project) => (
              <ProjectCard
                project={project}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            ))} */}
        </CardContainer>
      </Wrapper>
    </Container>
  );
}
