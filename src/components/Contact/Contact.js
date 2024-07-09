import { Snackbar } from "@mui/material";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { contactData } from "../../data/constant";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 0px 0px 80px 0px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 100%;
  max-width: 550px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  background: linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -moz-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  background: -webkit-linear-gradient(
    225deg,
    hsla(271, 100%, 50%, 1) 0%,
    hsla(294, 100%, 50%, 1) 100%
  );
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
`;

const ContactFormContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SendMessage = styled.p`
  margin-top: 20px;
  color: ${({ theme }) => theme.primary};
`;

const ButtonSocial = styled.a`
  width: 215px;
  height: 166px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  color: white;
  background-color: #1c1e5c;
  margin: 10px 15px;
  text-decoration: none;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

  border-radius: 20px;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  -ms-border-radius: 20px;
  -o-border-radius: 20px;
  transition: all 0.5s ease-in-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 50px 4px rgba(0, 0, 0, 0.6);
    filter: brightness(1.1);
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.white};
  }
  &:hover ${SendMessage} {
    color: ${({ theme }) => theme.white};
    transition: all 0.5s ease-in-out;
  }
`;

const SocialContainer = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;
const DescTitle = styled.p`
  font-size: 14px;
`;

export default function Contact() {
  //hooks
  const [open, setOpen] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_12qr2wwxa",
        "template_8nnry5q",
        form.current,
        "F4a0j6CazduqKbYZE"
      )
      .then(
        (result) => {
          setOpen(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions or opportunities!
        </Desc>
        <ContactFormContainer>
          <SocialContainer className="social">
            {contactData.map((item, index) => {
              return (
                <ButtonSocial key={index} href={item.href} target="_blank">
                  {item.icon}
                  <h4 style={{ marginTop: "7px" }}>{item.title}</h4>
                  <DescTitle>{item.desc}</DescTitle>
                  <SendMessage>send a message</SendMessage>
                </ButtonSocial>
              );
            })}
          </SocialContainer>
          <ContactForm ref={form} onSubmit={handleSubmit}>
            <ContactTitle>Email Me 🚀</ContactTitle>
            <ContactInput
              type="email"
              placeholder="Your Email"
              name="from_email"
            />
            <ContactInput
              type="text"
              placeholder="Your Name"
              name="from_name"
            />
            <ContactInput type="text" placeholder="Subject" name="subject" />
            <ContactInputMessage
              placeholder="Message"
              rows="4"
              name="message"
            />
            <ContactButton type="submit" value="Send" />
          </ContactForm>
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message="Email sent successfully!"
            severity="success"
          />
        </ContactFormContainer>
      </Wrapper>
    </Container>
  );
}
