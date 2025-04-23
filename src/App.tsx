import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import PageTransition from './components/PageTransition'
import styles from './App.module.scss'

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <PageTransition>
          <Header />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </PageTransition>
      </div>
    </Router>
  )
}

export default App 