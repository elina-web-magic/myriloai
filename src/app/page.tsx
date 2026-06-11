"use client";

import { useEffect, useState } from 'react';
import data from '../data/output.json';

// Type definition for the parsed data
type OutputData = {
  output: string;
  test_case: {
    scenario: string;
    prompt_inputs: Record<string, string>;
    solution_criteria: string[];
    task_description?: string;
  };
  total_score: number;
  scores: Record<string, number>;
  reasoning: string;
  strengths: string[];
  weaknesses: string[];
};

const reportData = data as OutputData[];

// Calculate Summary Stats
const totalTests = reportData.length;
const averageScore = totalTests > 0 
  ? (reportData.reduce((acc, curr) => acc + curr.total_score, 0) / totalTests).toFixed(1)
  : 0;
const passRate = totalTests > 0
  ? ((reportData.filter(d => d.total_score >= 30).length / totalTests) * 100).toFixed(1)
  : 0;

function CopyButton({ text }: { text: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    });
  };

  return (
    <button type="button" className="copy-btn" onClick={handleCopy}>
      <span className="icon">💾</span>
      <span className={`copy-popup ${showTooltip ? 'show' : ''}`}>Copied!</span>
    </button>
  );
}

export default function Home() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Initialize theme from localStorage on client-side
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.body.classList.add('dark-theme');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    if (newTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  const getScoreClass = (score: number) => {
    if (score >= 35) return 'score-high';
    if (score >= 25) return 'score-medium';
    return 'score-low';
  };

  return (
    <main>
      <div className="window-panel">
        <div className="title-bar">
          <div className="title-bar-text">
            <span>🖥️</span> MiryloAI_Report.exe
          </div>
          <button type="button" className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
            {isDarkTheme ? <span>☼</span> : <span>◐</span>} 
            {isDarkTheme ? ' Dark' : ' Light'}
          </button>
        </div>
        
        <div className="header-content">
          <h1>Prompt Evaluation Report</h1>
          <div className="summary-stats">
            <div className="stat-box">
              <div className="stat-label">Total Test Cases</div>
              <div className="stat-value">{totalTests}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Average Score</div>
              <div className="stat-value">{averageScore} / 40</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Pass Rate (&ge;30)</div>
              <div className="stat-value">{passRate}%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="window-panel">
        <div className="title-bar">
          <div className="title-bar-text">
            <span>📂</span> Results_Table.dat
          </div>
        </div>
        <div className="table-container">
          <div className="grid-table">
            <div className="grid-header-row">
              <div className="grid-header">Scenario</div>
              <div className="grid-header">Prompt Inputs</div>
              <div className="grid-header">Solution Criteria</div>
              <div className="grid-header">Output</div>
              <div className="grid-header">Score</div>
              <div className="grid-header">Reasoning</div>
            </div>

            <div className="grid-body">
              {reportData.map((row, index) => (
                <div className="grid-row" key={index}>
                  <div className="grid-cell">{row.test_case.scenario}</div>
                  
                  <div className="grid-cell prompt-inputs">
                    {Object.entries(row.test_case.prompt_inputs).map(([key, val]) => (
                      <div key={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {val}
                      </div>
                    ))}
                  </div>

                  <div className="grid-cell criteria">
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      {row.test_case.solution_criteria.map((criteria, i) => (
                        <li key={i} style={{ marginBottom: '8px' }}>{criteria}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid-cell output">
                    <div className="output-container">
                      <CopyButton text={row.output} />
                      <pre className="custom-scrollbar">{row.output}</pre>
                    </div>
                  </div>

                  <div className="grid-cell">
                    <div className={`score ${getScoreClass(row.total_score)}`}>
                      {row.total_score} / 40
                    </div>
                    <div className="score-breakdown">
                      {Object.entries(row.scores).map(([metric, score]) => (
                        <div className="metric" key={metric}>
                          <span className="metric-label">{metric.replace(/_/g, ' ')}</span>
                          <span className="metric-value">{score}/10</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid-cell reasoning custom-scrollbar">
                    {row.reasoning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
