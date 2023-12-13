import React from 'react'
import "./how-we-help.css"
import SupportArticle from './components/SupportArticle'

const HowWeHelp = () => {
  return (
    <section className="support-section">
      <h2 className="support-title">How We Help</h2>
      <SupportArticle text={"Love"} />
      <SupportArticle text={"Love"} />
      <SupportArticle text={"Love"} />
      <SupportArticle text={"Love"} />
    </section>
  )
}

export default HowWeHelp
