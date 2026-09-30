import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import codeImg from '../../assets/code.png';
import '../styles/EducationSection.css';

import ibmPdf from '../../assets/certificates/Full Stack Software Engineer IBM.pdf';
import promptPdf from '../../assets/certificates/Prompt Engineering.pdf';
import restApiPdf from '../../assets/certificates/CertificateOfCompletion_Learning REST APIs.pdf';
import cssPdf from '../../assets/certificates/Hackerrank CSS certificate.pdf';
import naitaImg from '../../assets/certificates/Naita Dip.jpeg';

import ibmImg from '../../assets/certificates/IBM Fullstack.png';
import promptImg from '../../assets/certificates/Prompt.png';
import restApiImg from '../../assets/certificates/RestAPI.png';
import cssImg from '../../assets/certificates/Hackerank .png';

const educationData = [
  {
    year: '2023 - 2025',
    title: 'Diploma in Software Engineering',
    institution: 'NAITA',
    description: 'Comprehensive training in software development lifecycles, full-stack technologies, and building scalable applications.',
  },
  {
    year: '2021 - 2022',
    title: 'Diploma in ICT',
    institution: 'ICBT Campus',
    description: 'Foundational knowledge in information and communication technology, networking, and core programming concepts.',
  },
  {
    year: '2021 - 2022',
    title: 'Diploma in English',
    institution: 'ICBT Campus',
    description: 'Advanced business communication and professional English proficiency for global work environments.',
  }
];

const certData = [
  {
    id: 1,
    title: 'IBM Full Stack Software Developer',
    issuer: 'Coursera / IBM',
    description: 'Mastery in Cloud, React, Node.js, and Python backend development.',
    file: ibmPdf,
    image: ibmImg,
    type: 'image',
    gradient: 'linear-gradient(135deg, #1E1E1E 0%, #0d0d0c 100%)'
  },
  {
    id: 2,
    title: 'Prompt Engineering for Developers',
    issuer: 'DeepLearning.AI',
    description: 'Advanced techniques in LLM prompting and AI-driven development.',
    file: promptPdf,
    image: promptImg,
    type: 'image',
    gradient: 'linear-gradient(135deg, #1F1C18 0%, #080705 100%)'
  },
  {
    id: 3,
    title: 'REST APIs with Node.js',
    issuer: 'LinkedIn Learning',
    description: 'Building secure and scalable RESTful APIs with Express and MongoDB.',
    file: restApiPdf,
    image: restApiImg,
    type: 'image',
    gradient: 'linear-gradient(135deg, #181A1F 0%, #050505 100%)'
  },
  {
    id: 4,
    title: 'CSS (Basic) Certificate',
    issuer: 'HackerRank',
    description: 'Verified proficiency in modern CSS layout, selectors, and responsive design.',
    file: cssPdf,
    image: cssImg,
    type: 'image',
    gradient: 'linear-gradient(135deg, #1A1F18 0%, #050605 100%)'
  },
  {
    id: 5,
    title: 'Diploma in Software Engineering',
    issuer: 'NAITA',
    description: 'Official certification of completion for the Software Engineering diploma.',
    file: naitaImg,
    image: naitaImg,
    type: 'image',
    gradient: 'linear-gradient(135deg, #2A2520 0%, #15100B 100%)'
  }
];

const StackCard = ({ card, index, cardsLength, setCards }) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const isFront = index === cardsLength - 1;

  const handleDragEnd = (e, info) => {
    if (info.offset.x > 100 || info.offset.x < -100) {
      setCards((prev) => {
        const newCards = [...prev];
        const topCard = newCards.pop();
        newCards.unshift(topCard);
        return newCards;
      });
    }
  };

  return (
    <motion.div
      className="stacked-card"
      style={{
        x,
        rotate,
        opacity: isFront ? opacity : 1,
        zIndex: index,
        scale: isFront ? 1 : 1 - (cardsLength - 1 - index) * 0.05,
        y: isFront ? 0 : (cardsLength - 1 - index) * -15,
        background: card.gradient,
      }}
      drag={isFront ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileHover={isFront ? { scale: 1.02, y: -5 } : {}}
      whileTap={isFront ? { cursor: 'grabbing' } : {}}
    >
      {/* Decorative corners */}
      <div className="card-corner top-left"></div>
      <div className="card-corner top-right"></div>
      <div className="card-corner bottom-left"></div>
      <div className="card-corner bottom-right"></div>

      {card.type === 'image' && (
        <div className="card-bg-img" style={{ backgroundImage: `url(${card.image})` }}></div>
      )}

      <div className="card-content">
        <h4 className="card-title">{card.title}</h4>
        <p className="card-issuer">{card.issuer}</p>

        <div className="card-description-hover">
          <p>{card.description}</p>
          <a href={card.file} target="_blank" rel="noopener noreferrer" className="card-btn">
            View Certificate
          </a>
        </div>
      </div>

      {isFront && (
        <div className="swipe-hint">Swipe to see next &rarr;</div>
      )}
    </motion.div>
  );
};

const CodeBanner = () => (
  <motion.section
    className="code-banner-section"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <div className="code-banner-img-wrap">
      <img src={codeImg} alt="Code" className="code-banner-img" />
      <div className="code-banner-overlay"></div>
    </div>
  </motion.section>
);

const EducationSection = () => {
  const [cards, setCards] = useState([...certData].reverse()); // Reverse so first item is on top

  return (
    <>
    <section className="edu-section" id="education">
      <div className="edu-container">

        {/* Education Column */}
        <div className="edu-column">
          <motion.div
            className="edu-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="edu-eyebrow-line"></span>
            <h3 className="edu-heading">Education</h3>
          </motion.div>

          <div className="timeline">
            {educationData.map((item, i) => (
              <motion.div
                key={i}
                className="timeline-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{item.year}</span>
                  <h4 className="timeline-title">{item.title}</h4>
                  <span className="timeline-inst">{item.institution}</span>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Column */}
        <div className="edu-column">
          <motion.div
            className="edu-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="edu-eyebrow-line"></span>
            <h3 className="edu-heading">Certifications</h3>
          </motion.div>

          <div className="cert-stack-container">
            {cards.map((card, index) => (
              <StackCard
                key={card.id}
                card={card}
                index={index}
                cardsLength={cards.length}
                setCards={setCards}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
    <CodeBanner />
  </>);
}

export default EducationSection;
